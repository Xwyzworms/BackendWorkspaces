const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, {
    service, userService, memCacheService, validator,
  }) => {
    const albumsHandler = new AlbumsHandler(
      service,
      userService,
      memCacheService,
      validator,
    );
    server.route(routes(albumsHandler));
  },
};
