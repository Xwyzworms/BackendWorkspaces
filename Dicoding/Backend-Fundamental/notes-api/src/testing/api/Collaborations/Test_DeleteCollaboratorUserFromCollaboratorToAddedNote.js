pm.test('response status code should have 200 value', () => {
   pm.response.to.have.status(200);
}); 
 
pm.test('response Content-Type header should have application/json value', () => {
  pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});
 
pm.test('response body data should contains correct value', () => {
    const responseJson = pm.response.json();
 
    pm.expect(responseJson).to.be.an('object');
    pm.expect(responseJson).to.have.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');
    pm.expect(responseJson).to.have.ownProperty('message');
    pm.expect(responseJson.message).to.equals('Kolaborasi berhasil dihapus');
});
