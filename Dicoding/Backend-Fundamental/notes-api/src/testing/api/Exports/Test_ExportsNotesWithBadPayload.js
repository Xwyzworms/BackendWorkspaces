pm.test('response status code should have 400 value', () => {

    pm.response.to.have.status(400);

});

pm.test('response Content-Tyep header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get("Content-Type")).to.equals("application/json; charset=utf-8");
}); 


pm.test('response body shuold be an object', () => {

    const responseObj = pm.response.json();
    pm.expect(responseObj).to.be.an('object');
});

pm.test('response body should have correct property and value', () => {
    
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.have.ownProperty('status');
    pm.expect(responseJson.status).to.equals('fail');

    pm.expect(responseJson).to.have.ownProperty('message');

});

