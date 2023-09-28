const path = require('path');

function routes(handler) {
  return [
    {
      method: 'POST',
      path: '/albums/{id}/covers',
      handler: handler.postUploadImageHandler,
      options: {
        payload: {
          maxBytes: 1000 * 512,
          allow: 'multipart/form-data',
          multipart: true,
          output: 'stream',
        },
      },
    },
    {
      method: 'GET',
      path: '/albums/{param*}',
      handler: {
        directory: {
          path: path.resolve(__dirname, 'file'),
          listing: true,
        },
      },
    },

  ];
}

module.exports = routes;
