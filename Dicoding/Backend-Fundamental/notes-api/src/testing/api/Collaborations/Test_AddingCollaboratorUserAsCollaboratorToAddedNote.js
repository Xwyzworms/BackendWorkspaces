pm.test('response status code should have 201 value', ()=>{
	pm.response.to.have.status(201);
})


pm.test('response Content-Type header should have application/json value', () => {
	pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should contain collaborationId', ()=>{
	
	const responseJson = pm.response.json();

	pm.expect(responseJson).to.be.an('object');
	
	pm.expect(responseJson).to.ownProperty('data');

	pm.expect(responseJson.data).to.be.an('object');

	pm.expect(responseJson.data).to.ownProperty('collaborationId');
	
	pm.expect(responseJson.data.collaborationId).to.be.a('string');
	
});
