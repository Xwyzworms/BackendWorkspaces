const Hapi = require("@hapi/hapi");
const Jwt = require('@hapi/jwt');

const users = require("./src/api/users/index");
const UsersValidator = require("./src/validator/users/index");
const UsersService = require('./src/services/postgres/UsersService');

const notes = require("./src/api/notes/index");
const NotesService = require("./src/services/postgres/NotesService");
const NotesValidator = require("./src/validator/notes");


const authentications = require('./src/api/authentications/index');
const AuthenticationService = require('./src/services/postgres/AuthenticationService');
const AuthenticationsValidator = require('./src/validator/auth/index');
const TokenManager = require('./src/tokenize/TokenManager');

const collaborations = require('./src/api/collaborations');
const CollaborationService = require('./src/services/postgres/CollaborationService');
const CollaborationValidator = require('./src/validator/collaborations/index');

require("dotenv").config();

const initServer = async () => {

  const collaborationService = new CollaborationService();
  const notesService = new NotesService(collaborationService);
  const usersService = new UsersService();
  const authenticationService = new AuthenticationService();

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
      plugin: Jwt,
    }
  ]);

  server.auth.strategy('notesapp_jwt','jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      }
    })
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      }
    },
    {
      plugin: authentications,
      options: {
        authenticationService,
        userService: usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator, 
      }
    },
    {
      plugin: collaborations,
      options: {
        collaborationService,
        notesService,
        validator: CollaborationValidator,
      }

    }
  ]);



  await server.start();
  console.log("server is running");
};

initServer();
