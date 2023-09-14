const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this.pool = new Pool();
  }

  async getSpecificPlaylist(owner, playlistId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner=$1 AND playlist_id=$2',
      values: [owner, playlistId],
    };

    const playlists = await this.pool.query(query);

    if (!playlists.rows.length > 0) {
      throw new Error('Belum ada Playlist yang dibentuk');
    }
  }
}
module.exports = PlaylistService;
