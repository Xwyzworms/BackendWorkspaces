const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylist(name, owner) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING playlist_id',
      values: [id, name, owner],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length > 0) {
      throw new InvariantError('Gagal membuat playlist');
    }
    return result.rows[0].playlist_id;
  }

  async getPlaylists(owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner=$1',
      values: [owner],
    };
    const playlists = await this.pool.query(query);

    if (!playlists.rows.length > 0) {
      throw new InvariantError('Belum ada Playlist yang dibentuk');
    }

    return playlists.rows;
  }

  async getSpecificPlaylist(owner, playlistId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner=$1 AND playlist_id=$2',
      values: [owner, playlistId],
    };
    const playlists = await this.pool.query(query);

    if (!playlists.rows.length > 0) {
      throw new NotFoundError('Belum ada Playlist yang dibentuk gan');
    }

    return playlists.rows;
  }

  async deletePlaylistById(playlistId, owner) {
    const query = {
      text: 'DELETE From playlists WHERE playlist_id = $1 AND owner=$2 RETURNING playlist_id',
      values: [playlistId, owner],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length > 0) {
      throw new InvariantError('Gagal menghapus playlist');
    }
  }

  async postSongByPlaylistId(playlistId, songId) {
    // use the songs_playlists table and playlists table

    const songsPlaylistsId = `songs-playlists${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs_playlists VALUES($1,$2,$3) RETURNING songs_playlists_id',
      values: [songsPlaylistsId, songId, playlistId],
    };
    const result = await this.pool.query(query);
    return result;
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.song_id, songs.title, songs.performer FROM songs LEFT JOIN songs_playlists ON songs.song_id = songs_playlists.song_id WHERE songs_playlists.playlist_id=$1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async deleteSongByPlaylistId(songId, playlistId) {
    const query = {
      text: 'DELETE FROM songs_playlists where song_id = $1 AND playlist_id = $2',
      values: [songId, playlistId],
    };

    const result = await this.pool.query(query);

    return result;
  }

  async verifyPlaylistOwner(ownerId, playlistId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE playlist_id=$1',
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    if (result.rows.length === 0) throw new NotFoundError('Playlist tidak ditemukan');
    if (result.rows[0].owner !== ownerId) {
      throw new AuthorizationError('Anda tidak memiliki akses');
    }
  }
}

module.exports = PlaylistsService;
