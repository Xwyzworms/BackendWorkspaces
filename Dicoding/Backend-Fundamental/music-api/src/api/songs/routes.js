function routes(handler) {
  return [
    {
      method: 'POST',
      path: '/songs',
      handler: handler.postSongsHandler,
    },
    {
      method: 'GET',
      path: '/songs',
      handler: handler.getSongsHandler,
    },
    {
      method: 'GET',
      path: '/songs/{id}',
      handler: handler.getSongByid,
    },
    {
      method: 'PUT',
      path: '/songs/{id}',
      handler: handler.putSongById,
    },
    {
      method: 'DELETE',
      path: '/songs/{id}',
      handler: handler.deleteSongById,
    },
  ];
}

module.exports = routes;
