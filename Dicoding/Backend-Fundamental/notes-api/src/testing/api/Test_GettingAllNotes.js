pm.test('response status code should have 200 value', () => {
   pm.response.to.have.status(200);
});

pm.test('response Content-Type header should have application/json value', () => {
   pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

pm.test('response body should an object', () => {
   const responseJson = pm.response.json();
   pm.expect(responseJson).to.be.an('object');
}); 

pm.test('response body should have the correct property and value', () => {
  const responseJson = pm.response.json();
   pm.expect(responseJson).to.have.ownProperty('status');
   pm.expect(responseJson.status).to.equals('success');
   pm.expect(responseJson).to.have.ownProperty('data');
   pm.expect(responseJson.data).to.be.an('object');
});

pm.test('response body data should have a notes array and contain at least 1 item', () => {
   const responseJson = pm.response.json();
   const { data } = responseJson;
 
   pm.expect(data).to.have.ownProperty('notes');
   pm.expect(data.notes).to.be.an('array');
   pm.expect(data.notes).lengthOf.at.least(1);
}); 