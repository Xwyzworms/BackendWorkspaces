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
