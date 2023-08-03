pm.test('response status code should have 200 value', ()=>{
    pm.response.to.have.status(200);
});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should an object', ()=> {
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
});

pm.test('response body should have correct property and value', ()=>{

    const responseJson = pm.response.json();

    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');

    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(responseJson.message).to.equals('Access Token berhasil diperbarui');
    
    pm.expect(responseJson).to.ownProperty('data');
    pm.expect(responseJson.data).to.be.an('object');

});

pm.test('response body data should have property accessToken with correct value', ()=> {

    const responseJson = pm.response.json();

    const { data } = responseJson;

    pm.expect(data).to.ownProperty('accessToken');
    pm.expect(data.accessToken).to.not.equals('');
    pm.expect(data.accessToken).to.not.equals(null);
});