/* eslint-disable camelcase */

/* eslint-disable linebreak-style */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
    'users_album_likes',
    'fk_users_album_likes.username_from_users.username',
    'FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'users_album_likes',
    'fk_users_album_likes.album_id_from_albums.album_id',
    'FOREIGN KEY(album_id) REFERENCES albums(album_id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint(
    'users_album_likes',
    'fk_users_album_likes.username_from_users.username',
  );
  pgm.dropConstraint(
    'users_album_likes',
    'fk_users_album_likes.album_id_from_albums.album_id',
  );
};
