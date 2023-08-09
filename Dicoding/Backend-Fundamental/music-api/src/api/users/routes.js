function routes(handler) {
  return [
    {
      method: 'POST',
      path: '/users',
      handler: handler.postUsersHandler,
    },
  ];
}

module.exports = routes;
