const ClientError = require("../../exceptions/ClientError");

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
     
        this._validator = validator;
        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    }

    async postUserHandler(request, h) {
        try {

            const { username, password, fullname } = request.payload;
            this._validator.validateUserPayload(request.payload);
            const userId = await this._service.addUser({ username, password, fullname });
            
            const response = h.response({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                    userId,
                }
            });
            
            response.code(201);

            return response;
        } catch(e) {
            if( e instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: e.message,
                });
                response.code(e.statusCode);

                return response;

            } else {
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kesalahan pada server kami',
                });

                response.code(500);
                console.log(e);
                return response;
            }

        }
    }
    
    async getUserByIdHandler(request, h) {
        try  {

            const { id } = request.params;
            console.log(id);
            const user = await this._service.getUserById(id)
            console.log(user);
            
            const response = h.response({
                status: 'success',
                data: {
                    user
                }

            });
            response.code(200);
            return response;

        }catch(e) {
            if (e instanceof ClientError ) {
                const response = h.response({
                    status: 'fail',
                    message: e.message
                });

                response.code(e.statusCode);
                return response;
            }
            else {

                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kesalahan pada server kami',
                });

                response.code(500);
                console.log(e);
                return response;
            }
        }
        
    } 
}

module.exports = UsersHandler;