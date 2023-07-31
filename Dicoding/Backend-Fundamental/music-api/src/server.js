const Hapi = require('@hapi/hapi');
const albums = require('./api/albums/index');
const AlbumsService = require('./services/albums/AlbumService');
const AlbumsValidator = require('./validator/albums/index');

const songs = require('./api/songs/index');
const SongsService = require('./services/songs/SongService');
const SongsValidator = require('./validator/songs/index');

require('dotenv').config();

const initServer = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.log('Server is running');
};

initServer();
