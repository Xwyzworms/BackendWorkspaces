const createUserARequest = {
    url: 'http://localhost:5000/users',
    method: 'POST',
    header: {
        'Content-Type': 'application/json',
    },
    body: {
        mode:'raw',
        raw: JSON.stringify({
            username: 'user_a',
            password: 'secret',
            fullname: 'User A',
        })
    }
};

pm.sendRequest(createUserARequest, (error, response) => {

    console.log(error ? error : response);
    
    // Setelah terdaftar, login dengan user A

    const loginUserRequest = {
        url: 'http://localhost:5000/authentication',
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
               username: 'user_a',
               password: 'secret',
            }),
        }
    };

    pm.sendRequest(loginUserRequest, (error, response) => {
        if (!error) {

            const { data : { accessToken } } =  response.json();
            pm.environment.set('accessTokenUserA', accessToken);
        }
    });

});


// Membuat user B
const createUserBRequest = {
    url: 'http://localhost:5000/users',
    method: 'POST',
    header: {
        'Content-Type' : 'application/json',
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            username: 'user_b',
            password: 'secret',
            fullname: 'User B',
        }),
    }
}

pm.sendRequest(createUserBRequest, (error, response) => {
    console.log(error ? error : response);

    const loginUserRequest = {
        url: 'http://localhost:5000/authentications',
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                username : 'user_b',
                password : 'secret',
            }),
        }
    }

    pm.sendRequest(loginUserRequest, (error, response ) => {
        if(!error) {
            const {data : {accessToken} } = response.json();
            pm.environment.set('accessTokenUserB', accessToken);
        }
    });
});