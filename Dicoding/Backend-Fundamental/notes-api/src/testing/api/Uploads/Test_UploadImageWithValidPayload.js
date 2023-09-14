pm.test(
    'response status code should have 201', ()=> {
        pm.response.to.have.status(201);
    }
);

pm.test(
'response Content-Type header should have application/json charset=utf-8', ()=>{
        pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8' );
    });

pm.test(
    'response should contains fileLocation in body data response', ()=> {
        
        const responseJson = pm.response.json();
        pm.expect(responseJson).to.have.ownProperty('status');
        pm.expect(responseJson.status).to.equals('success');

        pm.expect(responseJson).to.have.ownProperty('data');
        pm.expect(responseJson.data).to.be.an('object');

        const { data } = responseJson;
        pm.expect(data).to.have.ownProperty('fileLocation');
        pm.expect(data.fileLocation).to.be.a('string');
        pm.expect(data.fileLocation).to.not.equals('');
    
        pm.environment.set('fileLocation', data.fileLocation);

    });

pm.test('when requesting the fileLocation', ()=> {

    const fileLocation = pm.environment.get('fileLocation');

    pm.sendRequest(fileLocation, (_, response) => {
        pm.test('response code should be 200', ()=> {
            console.log(response);
            pm.expect(response.code).to.equals(200);
        });
    });

});
