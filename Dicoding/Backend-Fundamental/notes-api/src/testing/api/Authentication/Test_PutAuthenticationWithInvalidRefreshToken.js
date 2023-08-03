pm.test('response status code should have 400 value', ()=>{
    pm.response.to.have.status(400);
});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response should an object', ()=> {
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');

});

pm.test('response should have correct property and value', ()=> {

    const responseJson = pm.response.json();

    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('fail');

    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(responseJson.message).to.equals('Refresh token tidak valid');
});

