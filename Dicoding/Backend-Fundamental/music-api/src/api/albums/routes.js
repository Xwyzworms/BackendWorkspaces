function routes(handler) {
  return [
    {
      method: 'POST',
      path: '/albums',
      handler: handler.postAlbumsHandler,
    },
    {
      method: 'GET',
      path: '/albums/{id}',
      handler: handler.getAlbumsById,
    },
    {
      method: 'PUT',
      path: '/albums/{id}',
      handler: handler.putAlbumsById,
    },
    {
      method: 'DELETE',
      path: '/albums/{id}',
      handler: handler.deleteAlbumsById,
    },
  ];
}

module.exports = routes;
