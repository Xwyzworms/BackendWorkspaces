pm.test('response status code should have 201 value', ()=> {
    pm.response.to.have.status(201);
});

pm.test('response Content-type header should have application/json; charset=utf-8', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json');
});

pm.test('response body data should contains note id', ()=> {
    
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
    pm.expect(responseJson).to.ownProperty('data');
    pm.expect(responseJson.data).to.be.an('object');

    pm.expect(responseJson.data).to.ownProperty('noteId');
    pm.expect(responseJson.data.noteId).to.be.a('string');

    pm.environment.set('noteIdUserA', responseJson.data.noteId);
});