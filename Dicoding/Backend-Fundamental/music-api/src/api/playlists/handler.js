const { Pool } = require('pg');
const PlaylistsValidator = require('../../validator/playlists');
// TODO:
// 1. Add Primitif Add, GET, Delete By ID, GetBy Id
// 2. Add Validator for each POST and Delete
// 3. Add dummyResponse handler
// 4. Add VerifyAutherizations 
class PlaylistsHandler {
  constructor(playlistsService, validator) {
    this.playlistsService = playlistsService;
    this.validator = validator;
  }

  async postPlaylistHandler(request, h) {
    this.validator.validatePostPlaylistsAddPayload(request.payload);
    const { name } = request.payload;
    const playlistId = await this.playlistsService.addPlaylist(name);
    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });

    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    // Add the userOwner implementation for getting the playlist only
    const playlists = await this.playlistsService.getPlaylists();
    const response = h.response({
      status: 'success',
      data: {
        playlists,
      },
    });

    return response;
  }

  async deletePlaylistByIdHandler(request, h) {
    await this.playlistsService.deletePlaylistById();

    const response = h.response({
      status: 'success',
      message: 'ANY MESSAGES',
    });

    return response;
  }

  async postSongByPlaylistIdHandler(request, h) {
    this.validator.validatePostSongPlaylistsByIdPayload(request.payload);
    // use the songs_playlists table and playlists table

    const result = await this.playlistsService.postSongByPlaylistId();

    const response = h.response({
      status: 'success',
      message: 'ANY message TODO',
    });

    response.code(201);
    return response;
  }

  async getSongsByPlaylistIdHandler(request, h) {
    const playlist = await this.playlistsService.getSongsByPlaylist();

    const response = h.response({
      status: 'success',
      data: {
        playlist,
      },
    });

    return response;
  }

  async deleteSongByPlaylistIdHandler(request, h) {
    this.validator.validateDeleteSongPlaylistsByIdPayload(request.payload);
    // use the songs_playlists table and playlists table
    const query = {
      text: 'SELECT * FROM playlists',
    };

    await this.playlistsService.deleteSongByPlaylistId();

    const response = h.response({
      status: 'success',
      message: 'ANY MESSAGES',
    });

    return response;
  }
}
