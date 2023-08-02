pm.test('response status code should have 400 value', ()=> {

});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response should be an object', ()=> {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an('object');
});

pm.test('response body should have correct property and value', ()=> {
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('fail');

    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(responseJson.message).to.not.equals(' ');
    pm.expect(responseJson.nessage).to.not.equals(null);
});

const repeatRequestUntilDatasetEmpty = () => {
    const badUserPayloads = pm.environment.get('badUserPayloads');

    if(badUserPayloads && badUserPayloads.length>0) {
        postman.setNextRequest('Adding User With Bad User Payload');
    }
}

repeatRequestUntilDatasetEmpty();