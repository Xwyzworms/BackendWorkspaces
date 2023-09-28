const routes = require('./routes');
const ExportsHandler = require('./handler');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { playlistProducerService, validator, playlistsService }) => {
    const playlistProducerHandler = new ExportsHandler(
      playlistProducerService,
      validator,
      playlistsService,
    );
    server.route(routes(playlistProducerHandler));
  },

};
