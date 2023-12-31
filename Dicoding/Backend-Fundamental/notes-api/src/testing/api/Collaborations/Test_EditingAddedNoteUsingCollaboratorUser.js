pm.test('response status code should have 200 value', () => {
   pm.response.to.have.status(200);
}); 
 
pm.test('response Content-Type header should have application/json value', () => {
  pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});
 
