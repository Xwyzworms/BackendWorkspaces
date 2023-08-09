/* eslint-disable camelcase */
/* eslint-disable linebreak-style */

exports.up = (pgm) => {
  pgm.createTable('playlists', {

    playlist_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    name: {
      type: 'TEXT',
      notNull: true,
    },

    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },

  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
};
