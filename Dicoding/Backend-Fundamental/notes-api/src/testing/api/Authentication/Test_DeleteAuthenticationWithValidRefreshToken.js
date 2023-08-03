pm.test('response status code should have 200', ()=>{
    pm.response.to.have.status(200);
});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should an object', ()=> {
    const responseBody = pm.response.json();
    pm.expect(responseBody).to.be.an('object');
});

pm.test('property body should have correct property and value', ()=>{
    const responseBody = pm.response.json();

    pm.expect(responseBody).to.ownProperty('status');
    pm.expect(responseBody.status).to.equals('success');
    
    pm.expect(responseBody).to.ownProperty('message');
    pm.expect(responseBody.message).to.equals('Refresh token berhasil dihapus');
});

