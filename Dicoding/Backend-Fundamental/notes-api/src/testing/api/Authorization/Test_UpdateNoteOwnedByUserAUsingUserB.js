
pm.test('response status code should have 403 value', ()=> {
    pm.response.to.have.status(403);
});

pm.test('response Content-Type header should have application/json; charset=utf-8 ', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json');
}) 

pm.test('response body should contains correct value', ()=> {
    const responseJson  = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('fail');

    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(resposneJson).to.equals('Anda tidak berhak mengakses resource ini');
});