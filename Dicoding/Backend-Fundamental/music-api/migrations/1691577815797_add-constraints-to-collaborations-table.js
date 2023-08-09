/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('collaborations', 'unique_user_id_and_playlist_id', 'UNIQUE(user_id, playlist_id)');

  pgm.addConstraint('collaborations', 'fk_collaborations.user_id_from_users.id', 'FOREIGN KEY(user_id) REFERENCES users(user_id) on DELETE CASCADE');

  pgm.addConstraint('collaborations', 'fk_collaborations.playlist_id_from_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(playlist_id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('collaborations', 'unique_song_id_and_playlist_id');

  pgm.dropConstraint('collaborations', 'fk_collaborations.user_id_from_users.id');

  pgm.dropConstraint('collaborations', 'fk_collaborations.playlist_id_from_playlists.id');
};
