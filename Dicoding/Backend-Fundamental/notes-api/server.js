const Hapi = require("@hapi/hapi");
const notes = require("./src/api/notes/index");
const NotesService = require("./src/services/postgres/NotesService");
const NotesValidator =require("./src/validator/notes");

require("dotenv").config();

const initServer = async() => {
    const notesService = new NotesService();

    const server = Hapi.server({
        port: process.env.PORT,
        host : process.env.HOST,
        routes : {
            cors : {
                origin : ["*"]
            }
        }
    })
    
    await server.register({
        plugin : notes,
        options : {
            service : notesService,
            validator : NotesValidator,
        }
    });
    await server.start();
    console.log("server is running");
}

initServer();