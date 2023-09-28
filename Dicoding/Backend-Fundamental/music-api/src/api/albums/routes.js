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
      handler: handler.getAlbumByIdHandler,
    },
    {
      method: 'PUT',
      path: '/albums/{id}',
      handler: handler.putAlbumByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/albums/{id}',
      handler: handler.deleteAlbumByIdHandler,
    },
    {
      method: 'POST',
      path: '/albums/{id}/likes',
      handler: handler.postAlbumByIdLikes,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/albums/{id}/likes',
      handler: handler.deleteAlbumByIdLikes,
      options: {
        auth: 'musicapp_jwt',
      },
    },
    {
      method: 'GET',
      path: '/albums/{id}/likes',
      handler: handler.getAlbumByIdLikes,
    },
  ];
}

module.exports = routes;
