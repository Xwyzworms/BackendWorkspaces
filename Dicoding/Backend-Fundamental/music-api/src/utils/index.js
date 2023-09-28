/* eslint-disable camelcase */
const mapDBToSongModel = ({
  song_id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id: song_id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

const mapDBToAlbumModel = ({
  album_id,
  name,
  year,
  cover_url,
}) => ({
  id: album_id,
  name,
  year,
  coverUrl: cover_url,
});

const mapDBToPlaylistModel = ({
  playlist_id,
  name,
  owner,
}) => ({
  id: playlist_id,
  name,
  username: owner,
});
module.exports = { mapDBToSongModel, mapDBToAlbumModel, mapDBToPlaylistModel };
