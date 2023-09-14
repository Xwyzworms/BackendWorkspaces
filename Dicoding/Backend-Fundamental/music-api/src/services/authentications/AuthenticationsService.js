const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this.pool = new Pool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1) returning token',
      values: [token],
    };

    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token=$1',
      values: [token],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length > 0) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token=$1 RETURNING token',
      values: [token],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length > 0) {
      throw new InvariantError('Gagal menghapus token');
    }
  }
}

module.exports = AuthenticationsService;
