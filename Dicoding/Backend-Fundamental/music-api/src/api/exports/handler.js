const AuthorizationError = require('../../exceptions/AuthorizationError');
const ClientError = require('../../exceptions/ClientError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ExportsHandler {
  constructor(playlistProducerService, validator, playlistsService) {
    this.playlistProducerService = playlistProducerService;
    this.validator = validator;
    this.playlistsService = playlistsService;

    this.postExportPlaylistByPlaylistId = this.postExportPlaylistByPlaylistId.bind(this);
  }

  async postExportPlaylistByPlaylistId(request, h) {
    try {
      const { payload } = request;
      this.validator.validatePostPlaylistExportPayload(payload);

      const owner = request.auth.credentials.username;
      const { playlistId } = request.params;
      await this.playlistsService.verifyPlaylistOwner(owner, playlistId);

      await this.playlistsService.getSpecificPlaylist(owner, playlistId);

      const message = {
        owner,
        playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this.playlistProducerService.sendMessage('export:playlist:by_id', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan anda dalam antrean',
      });

      response.code(201);

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(error.message);
        } else if (error instanceof AuthorizationError) {
          throw new AuthorizationError(error.message);
        } else if (error instanceof InvariantError) { throw new InvariantError(error.message); }
      }
      throw new Error('Unknown Error');
    }
  }
}

module.exports = ExportsHandler;
