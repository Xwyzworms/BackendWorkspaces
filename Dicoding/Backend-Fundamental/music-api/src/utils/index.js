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
}) => ({
  id: album_id,
  name,
  year,
});

module.exports = { mapDBToSongModel, mapDBToAlbumModel };
