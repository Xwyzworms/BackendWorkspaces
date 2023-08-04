pm.test('response status code should have 200 value', ()=>{
    pm.response.to.have.status(200);
})

pm.test('response Content-Type headers should have application/json; charset=utf-8', ()=>{
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application.json');
})