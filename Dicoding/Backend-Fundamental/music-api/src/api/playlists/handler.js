const { Pool } = require('pg');
const PlaylistsValidator = require('../../validator/playlists');
const { mapDBToPlaylistModel, mapDBToSongModel } = require('../../utils');
// TODO:
// 1. Add Primitif Add, GET, Delete By ID, GetBy Id
// 2. Add Validator for each POST and Delete
// 3. Add dummyResponse handler
// 4. Add VerifyAutherizations
class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this.playlistsService = playlistsService;
    this.songsService = songsService;
    this.validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postSongByPlaylistIdHandler = this.postSongByPlaylistIdHandler.bind(this);
    this.getSongsByPlaylistIdHandler = this.getSongsByPlaylistIdHandler.bind(this);
    this.deleteSongByPlaylistIdHandler = this.deleteSongByPlaylistIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this.validator.validatePostPlaylistsAddPayload(request.payload);
    const { name } = request.payload;
    const owner = request.auth.credentials.username;
    const playlistId = await this.playlistsService.addPlaylist(name, owner);
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
    const owner = request.auth.credentials.username;
    const playlists = await this.playlistsService.getPlaylists(owner);
    const response = h.response({
      status: 'success',
      data: {
        playlists: playlists.map(mapDBToPlaylistModel),
      },
    });

    return response;
  }

  async deletePlaylistByIdHandler(request, h) {
    const owner = request.auth.credentials.username;
    const playlistId = request.params.id;

    await this.playlistsService.verifyPlaylistOwner(owner, playlistId);
    await this.playlistsService.getSpecificPlaylist(owner, playlistId);
    await this.playlistsService.deletePlaylistById(playlistId, owner);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus playlist',
    });

    return response;
  }

  async postSongByPlaylistIdHandler(request, h) {
    this.validator.validatePostSongPlaylistsByIdPayload(request.payload);
    // use the songs_playlists table and playlists table
    const { songId } = request.payload;
    const playlistId = request.params.id;
    const owner = request.auth.credentials.username;
    // Check if the song exists && Check the owner
    await this.songsService.getSongById(songId);
    await this.playlistsService.verifyPlaylistOwner(owner, playlistId);
    await this.playlistsService.postSongByPlaylistId(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan lagu',
    });

    response.code(201);
    return response;
  }

  async getSongsByPlaylistIdHandler(request, h) {
    const playlistId = request.params.id;
    const owner = request.auth.credentials.username;
    // verify the getter
    await this.playlistsService.verifyPlaylistOwner(owner, playlistId);
    const songs = await this.playlistsService.getSongsByPlaylistId(playlistId);
    const playlistInfo = await this.playlistsService.getSpecificPlaylist(owner, playlistId);
    const output = playlistInfo.map(mapDBToPlaylistModel)[0];
    output.songs = songs.map(mapDBToSongModel);
    const response = h.response({
      status: 'success',
      data: {
        playlist: output,
      },
    });

    return response;
  }

  async deleteSongByPlaylistIdHandler(request, h) {
    this.validator.validateDeleteSongPlaylistsByIdPayload(request.payload);
    const owner = request.auth.credentials.username;
    const playlistId = request.params.id;
    const { songId } = request.payload;
    // use the songs_playlists table and playlists table
    await this.playlistsService.verifyPlaylistOwner(owner, playlistId);
    await this.playlistsService.deleteSongByPlaylistId(songId, playlistId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus lagu',
    });

    return response;
  }
}

module.exports = PlaylistsHandler;
