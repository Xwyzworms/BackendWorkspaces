const createUserARequest = {
    
    url: 'http://localhost:5000/users',
    method: 'POST',
    header: {
        'Content-Type': 'application/json'
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify(
            {
                username: 'user_a',
                password: 'secret',
                fullname: 'User A',
            }),

    }
}

pm.sendRequest(createUserARequest, (error, response) => {

    console.log(error ? error : response);

    // Login using the credentials
    //
    const loginUserRequest = {
        url: 'http://localhost:5000/authentications',
        method: 'POST',
        header: {
            'Content-Type' : 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                username: 'user_a',
                password: 'secret'
            }),
        }
    };

    pm.sendRequest(loginUserRequest, (error, response) => {
        if(!error) {
            const { data: {accessToken} } = response.json();
            pm.environment.set('accessTokenUserA', accessToken);
        }
    });

})
