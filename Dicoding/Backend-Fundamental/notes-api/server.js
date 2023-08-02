const Hapi = require("@hapi/hapi");
const users = require("./src/api/users/index");
const UsersValidator = require("./src/validator/users/index");
const UsersService = require('./src/services/postgres/UsersService');

const notes = require("./src/api/notes/index");
const NotesService = require("./src/services/postgres/NotesService");
const NotesValidator = require("./src/validator/notes");

require("dotenv").config();

const initServer = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
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
  ]);
  await server.start();
  console.log("server is running");
};

initServer();
