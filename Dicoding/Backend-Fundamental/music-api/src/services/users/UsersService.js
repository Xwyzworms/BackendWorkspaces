const { Pool } = require('pg');
const bcyrpt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this.pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyUsername(username);
    const userId = `user-${nanoid(16)}`;
    const hashedPassword = bcyrpt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1,$2,$3,$4) RETURNING user_id',
      values: [userId, username, hashedPassword, fullname],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].length > 0) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].userId;
  }

  async verifyUserName(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (result.rows[0].length > 1) {
      throw InvariantError('Gagal menambahkan user. Username sudah digunakan');
    }
  }

  async verifyUserCredentials({ username, password }) {
    const query = {
      text: 'SELECT user_id, password FROM users WHERE username=$1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length > 0) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }
    const { userId, password: hashedPassword } = result.rows[0];

    const isMatched = await bcyrpt.compare(password, hashedPassword);

    if (!isMatched) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    return userId;
  }
}

module.exports = UsersService;
