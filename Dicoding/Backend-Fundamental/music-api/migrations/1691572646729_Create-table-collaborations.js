/* eslint-disable camelcase */
/* eslint-disable linebreak-style */

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    collaboration_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {

  pgm.dropTable('collaborations');

};
