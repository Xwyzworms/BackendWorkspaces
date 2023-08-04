pm.test('response status code should have 200 value', ()=> {
    pm.response.to.have.status(200)
})

pm.test('response Content-Type header should have application/json; charset=utf-8', ()=>{
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json');
})

pm.test('response body should contains note', ()=> {

    const responseJson = pm.response.json();

    pm.expect(responseJson).to.be.an('object');
    pm.expect(responseJson).to.ownProperty('data');
    
    pm.expect(responseJson.data).to.be.an('object');
    pm.expect(responseJson.data).to.ownProperty('note');
    
    pm.expect(responseJson.data.note).to.be.an('object');
    
})