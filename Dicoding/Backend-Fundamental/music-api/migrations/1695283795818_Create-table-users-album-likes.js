/* eslint-disable camelcase */
/* eslint-disable linebreak-style */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,

    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users_album_likes');
};
