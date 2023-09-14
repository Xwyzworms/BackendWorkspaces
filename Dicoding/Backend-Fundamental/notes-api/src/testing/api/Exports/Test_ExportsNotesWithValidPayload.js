pm.test('response code should have 201 value', () => {
    pm.response.to.have.status(201);
});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should be an object', () => {
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
});

pm.test('response body shuld have the correct property and value', () => {

    const responseJson = pm.response.json();

    pm.expect(responseJson).to.have.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');
    pm.expect(responseJson).to.have.ownProperty('message');
    pm.expect(responseJson.message).to.equals('Permintaan Anda dalam antrean');

});


const repeatRequestUntilDatasetEmpty = () => {
    const badExportPayloads = pm.environment.get('badExportPayloads');

    if(badExportPayloads && badExportPayloads.length > 0) {
        postman.setNextRequest('Exports Notes with Bad Payload');
    }
}   

repeatRequestUntilDatasetEmpty();

