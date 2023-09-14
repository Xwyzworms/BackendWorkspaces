const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const albums = require('./api/albums/index');
const AlbumsService = require('./services/albums/AlbumService');
const AlbumsValidator = require('./validator/albums/index');

const songs = require('./api/songs/index');
const SongsService = require('./services/songs/SongService');
const SongsValidator = require('./validator/songs/index');
const ClientError = require('./exceptions/ClientError');

const users = require('./api/users/index');
const UsersService = require('./services/users/UsersService');
const UsersValidator = require('./validator/users/index');

const authentications = require('./api/authentications/index');
const AuthenticationsService = require('./services/authentications/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications/index');
const TokenManager = require('./tokenize/TokenManager');

const playlists = require('./api/playlists/index');
const PlaylistsService = require('./services/playlists/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists/index');

// Exports
const exportsPlaylist = require('./api/exports/index');
const PlaylistProducerService = require('./services/rabbitmq/exports/PlaylistProducerService');
const ExportValidator = require('./validator/exports/index');

require('dotenv').config();

const initServer = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistsService = new PlaylistsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        username: artifacts.decoded.payload.username,
      },
    }),

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
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: exportsPlaylist,
      options: {
        playlistProducerService: PlaylistProducerService,
        validator: ExportValidator,
        playlistsService,
      },
    },
  ]);

  // Event handler
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.status_code);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log('Server is running');
};

initServer();
