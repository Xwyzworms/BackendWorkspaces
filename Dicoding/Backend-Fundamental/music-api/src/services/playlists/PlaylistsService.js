const { Pool } = require('pg');
const nanoid = require('nanoid');
const InvariantError =require('../../exceptions/InvariantError');
class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

	async addPlaylist({name}) {

		const id = `playlist-${nanoid(16)}`;
		const query = {
			text: 'INSERT INTO playlists VALUES ($1, $2) RETURNING playlist_id',
			values: [id, name],
		};
	
		const result = await this.pool.query(query);

		if(!result.rows.length > 0 ) {
			throw new InvariantError('Gagal membuat playlist');
		}
		return result.rows[0].playlistId;
	}

  async getPlaylists() {
    const query = {
      text: 'SELECT * FROM playlists',
    };
    const playlists = await this.pool.query(query);

		if(!playlists.rows.length > 0 ) {
			throw new InvariantError('Bla bla bla');
		}

		return playlists;
  }

  async deletePlaylistById() {
    const query = {
      text: 'DELETE From playlists RETURNING playlist_id',
    };
    const result = await this.pool.query(query);

		if(!result.rows.length > 0) {
			throw new InvariantError('ANY MESSAGE');
		}
  }
		
  async postSongByPlaylistId() {
    // use the songs_playlists table and playlists table
    const query = {
      text: 'SELECT * from playlists',
    };
    const result = await this.pool.query(query);
		
		return result;
  }

  async getSongsByPlaylistId() {
    const query = {
      text: 'SELECT * FROM playlists',
    };

    const result = await this.pool.query(query);
	
		return result.rows;
		
  }

  async deleteSongByPlaylistId(request, h) {
   const query = {
      text: 'SELECT * FROM playlists',
    };

    const result = await this.pool.query(query);

		return result;
  }

	async getPlaylists(){
		const query = {}
	}

	async deletePlaylistById();

	async addSongtoPlaylist();

	async getPlaylistSongs();

	async deleteSongFromPlaylist();
}
