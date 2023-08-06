
const createOwnerUserRequest = {
	url: 'http://localhost:5000/users',
	method: 'POST',
	header: {
		'Content-Type' : 'application/json',
	},
	body: {
		mode :'raw',
		raw: JSON.stringify({
			username: 'owner_user',
			password: 'secret',
			fullname: 'Owner',
		}),
	},
}

pm.sendRequest(createOwnerUserRequest, ( error, response ) => {
	console.log(error ? error : response );

	const loginOwnerUserRequest = {

		url: 'http://localhost:5000/authentications',
		method: 'POST',
		header: {
			'Content-Type': 'application/json',
		},
		body: {
			mode: 'raw',
			raw: JSON.stringify({
				username: 'owner_user',
				password: 'secret'
			}),
		},
	}

	pm.sendRequest(loginOwnerUserRequest, ( error, response )=> {
		if(!error) {
			const { data : { accessToken }} = response.json();
			pm.environment.set('ownerAccessToken', accessToken);
		
		}

	});

});


const createCollaboratorUserRequest = {
	
	url: 'http://localhost:5000/users',
	method: 'POST',
	header: {
		'Content-Type' : 'application/json'
	},
	body : {
		mode: 'raw',
		raw: JSON.stringify({
			username: 'collaborator_user',
			password: 'secret',
			fullname: 'Collaborator',
		})
	}
};

pm.sendRequest(createCollaboratorUserRequest, (error, response)=> {
	console.log(error ? error : response);

	if(!error) {
		if (response.code === 201) 
		{
			const {data : {userId}} = response.json();
			pm.environment.set('collaboratorUserId', userId);

		}

	}

	const loginCollaboratorUserRequest = {

		url: 'http://localhostL5000/authentications',
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		body: {
			mode: 'raw',
			raw: JSON.stringify({
				username: 'collaborator_user',
				password: 'secret',

			}),

		}

	}

	pm.sendRequest(loginCollaboratorUserRequest, (error, response )=> {
		if(!error) {

			const { data : {accessToken } } = response.json();
			pm.environment.set('collaboratorAccessToken', accessToken);
		}

	});

});
