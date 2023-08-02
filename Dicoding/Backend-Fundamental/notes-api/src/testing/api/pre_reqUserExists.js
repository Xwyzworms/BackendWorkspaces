const postRequest = {
    url: 'http://localhost:5000/users',
    method: 'POST',
    header: {
        'Content-Type': 'application/json',
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            username: 'testing',
            password: pm.environment.get('newPassword'),
            fullname: pm.environment.get('newFullname'),
        })
    }

}

pm.sendRequest(postRequest, (error, response)=> {
    console.log(error ? error : response.json());
});