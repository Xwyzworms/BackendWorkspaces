const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToAlbumModel } = require('../../utils');

class AlbumsService {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING album_id',
      values: [id, name, year],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('TODO Later');
    }
    return result.rows[0].album_id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE album_id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal mendapatkan Album, id tidak ditemukan');
    }
    return result.rows.map(mapDBToAlbumModel)[0];
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE album_id = $3 RETURNING album_id',
      values: [name, year, id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album, album_id tidak ditemukan');
    }
  }

  async editAlbumCoverUrlById(id, coverUrlPath) {
    const query = {
      text: `UPDATE albums SET cover_url=$1
        WHERE album_id=$2 RETURNING album_id`,
      values: [coverUrlPath, id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal update cover_url, album tidak ditemukan');
    }
  }

  async isAlbumLikedByUser(albumId, username) {
    const query = {
      text: `SELECT users.user_id FROM users LEFT JOIN 
          users_album_likes ON users.username=users_album_likes.username
          where users_album_likes.album_id=$1 AND users.username =$2`,
      values: [albumId, username],
    };

    const result = await this.pool.query(query);
    if (result.rows.length) {
      throw new InvariantError('Already liked by user, cannot do more');
    }
  }

  async insertLikesByAlbumId(albumId, userId) {
    const id = `users_album_likes-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO users_album_likes VALUES ($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album Id Not Found');
    }
  }

  async deleteLikesByAlbumId(albumId, userId) {
    const query = {
      text: `DELETE FROM users_album_likes
        WHERE username=$1 AND album_id=$2 RETURNING id`,
      values: [userId, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album Id Not Found');
    }
  }

  async getLikesByAlbumId(albumId) {
    const query = {
      text: `SELECT COUNT(users.username) FROM users LEFT JOIN 
          users_album_likes ON users.username=users_album_likes.username
          where album_id=$1`,
      values: [albumId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album id not found');
    }

    return result.rows[0].count;
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums where album_id = $1 RETURNING album_id',
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal menghapus album, album_id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
