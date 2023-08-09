/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('songs_playlists', 'unique_song_id_and_playlist_id', 'UNIQUE(song_id, playlist_id)');

  pgm.addConstraint('songs_playlists', 'fk_songs_playlists.song_id_from_songs.id', 'FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE');

  pgm.addConstraint('songs_playlists', 'fk_songs_playlists.playlist_id_from_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(playlist_id) ON DELETE Cascade');
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs_playlists', 'unique_song_id_and_playlist_id');

  pgm.dropConstraint('songs_playlists', 'fk_songs_playlists.song_id_from_songs.id');

  pgm.dropConstraint('songs_playlists', 'fk_songs_playlists.playlist_id_from_playlists.id');
};
