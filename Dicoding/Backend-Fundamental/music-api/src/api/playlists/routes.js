// add JWT For each routes
function routes(handler) {
  return [
    {
      method: 'POST',
      path: '/playlists',
      handler: handler.postPlaylistHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'GET',
      path: '/playlists',
      handler: handler.getPlaylistsHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/playlists/{id}',
      handler: handler.deletePlaylistByIdHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'POST',
      path: '/playlists/{id}/songs',
      handler: handler.postSongByPlaylistIdHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'GET',
      path: '/playlists/{id}/songs',
      handler: handler.getSongsByPlaylistIdHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/playlists/{id}/songs',
      handler: handler.deleteSongByPlaylistIdHandler,
      options: {
        auth: 'musicapp_jwt',
      },
    },

  ];
}

module.exports = routes;
