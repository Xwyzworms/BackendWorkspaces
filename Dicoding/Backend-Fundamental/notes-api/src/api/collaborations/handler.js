const ClientError = require("../../exceptions/ClientError");

class CollaborationHandler {

	constructor(collaborationService, notesService, validator) {
		this._collaborationService = collaborationService;
		this._notesService = notesService;
		this._validator = validator;

		this.postCollaborationHandler = this.postCollaborationHandler.bind(this);

		this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
	}

	async postCollaborationHandler(request, h) 
	{
		try {
			this._validator.validateCollaborationPayload(request.payload);

			const {id :  credentialId   } = request.auth.credentials;
			const {noteId, userId } = request.payload;

			await this._notesService.verifyNoteOwner(noteId, credentialId);
			const collaborationId = await this._collaborationService.addCollaboration(noteId, userId);
			console.log(collaborationId);

			const response = h.response({
				status: 'success',
				message: 'Kolaborasi berhasil ditambahkan',
				data: {
					collaborationId,
				},
			});

			response.code(201);
			return response;

		} catch(e) {
			if ( e instanceof ClientError) {

				const response = h.response({
					status:'fail',
					message: e.message,
				});

				response.code(e.statusCode);
				return response;

			}

			// Server Error!
			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagaln pada server kami'
			}); 
			response.code(500);
			return response;
		}



	}

	async deleteCollaborationHandler(request, h) 
	{
		try {
			this._validator.validateCollaborationPayload(request.payload);

			const { id : credentialId }  = request.auth.credentials;

			const { noteId, userId } = request.payload;

			await this._notesService.verifyNoteOwner(noteId, credentialId);

			await this._collaborationService.deleteCollaboration(noteId, userId );

			const response = h.response({
				status:'success',
				message: 'Kolaborasi berhasil dihapus',
			});

			response.code(200);
			return response;

		}catch(e) {

			if ( e instanceof ClientError) {

				const response = h.response({
					status:'fail',
					message: e.message,
				});

				response.code(e.statusCode);
				return response;

			}

			// Server Error!
			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagaln pada server kami'
			}); 
			response.code(500);
			return response;
		}

	}

}

module.exports = CollaborationHandler;
