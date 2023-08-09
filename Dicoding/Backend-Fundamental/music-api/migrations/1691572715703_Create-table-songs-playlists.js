/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs_playlists', {
    songs_playlists_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    song_id: {
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
  pgm.dropTable('songs_playlists');
};
