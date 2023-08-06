
function routes(handler) {
	return [
		{
			method: 'POST',
			path: '/collaborations',
			handler: handler.postCollaborationHandler,
			options: {
				auth: 'notesapp_jwt',
			}
		},
		{
			method: 'DELETE',
			path: '/collaborations',
			handler: handler.deleteCollaborationHandler,
			options: {
				auth: 'notesapp_jwt',
			}

		},
	];
}

module.exports = routes;
