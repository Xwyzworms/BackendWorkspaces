pm.test('response status code should have 404 value', ()=> {
    pm.response.to.have.status(404);
}); 

pm.test('response Content-Type headers should have value application/json; charset=utf-8', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should be an object', ()=> {
    
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
});

pm.test('response body should have correct property and value', ()=>{

    const responseJson = pm.response.json();

    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('fail');

    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(responseJson.message).to.equals('User tidak ditemukan');

    
});