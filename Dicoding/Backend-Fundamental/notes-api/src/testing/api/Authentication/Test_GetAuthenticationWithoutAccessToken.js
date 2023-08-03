pm.test('response status code should have 401 value',()=> {
    pm.response.to.have.status(401);
});

pm.test('response Content-Type header should have application/json value', ()=> {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
    });
