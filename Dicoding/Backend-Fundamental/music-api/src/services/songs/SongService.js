const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class SongsService {
  constructor() {
    this.pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    let query;
    const insertQuery = 'INSERT INTO songs VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING song_id';
    const id = nanoid(16);
    if (duration === undefined && albumId === undefined) {
      query = {
        text: insertQuery,
        values: [id, title, year, genre, performer, null, null],
      };
    } else if (duration === undefined) {
      query = {
        text: insertQuery,
        values: [id, title, year, genre, performer, null, albumId],
      };
    } else if (albumId === undefined) {
      query = {
        text: insertQuery,
        values: [title, year, genre, performer, duration, null],
      };
    } else {
      query = {
        text: insertQuery,
        values: [title, year, genre, performer, duration, albumId],
      };
    }
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].song_id;
  }

  async getSongs() {
    const query = 'SELECT * FROM songs';
    const result = await this.pool.query(query);
    return result; // TODO LATER-> Convert To model
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE song_id=$1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal mendapatkan lagu, Id tidak ditemukan');
    }
    return result; // TODO LATER -> convert to model
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    let query;
    if (duration === undefined && albumId === undefined) {
      query = {
        text: 'UPDATE songs SET title = $2, year = $3, genre = $4, performer = $5 WHERE song_id = $1 RETURNING song_id',
        values: [id, title, year, genre, performer],
      };
    } else if (albumId === undefined) {
      query = {
        text: 'UPDATE songs SET title = $2, year = $3, genre = $4, performer = $5, duration = $6 WHERE song_id = $1 RETURNING song_id',
        values: [id, title, year, genre, performer, duration],
      };
    } else if (duration === undefined) {
      query = {
        text: 'UPDATE songs SET title = $2, year = $3, genre = $4, performer = $5, albumId = $6 WHERE song_id = $1 RETURNING song_id',
        values: [id, title, year, genre, performer, albumId],
      };
    } else {
      query = {
        text: 'UPDATE songs SET title = $2, year = $3, genre = $4, performer = $5, duration = $6, albumId = $7 WHERE song_id = $1 RETURNING song_id',
        values: [id, title, year, genre, performer, duration, albumId],
      };
    }
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal mempebarui lagu, id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE * FROM songs where song_id=$1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus lagu, id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
