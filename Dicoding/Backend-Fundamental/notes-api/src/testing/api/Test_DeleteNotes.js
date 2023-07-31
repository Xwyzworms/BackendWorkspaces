pm.test('response status code should have 200 value', () => {
   pm.response.to.have.status(200);
});

pm.test('response Content-Type header should have application/json value', () => {
   pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8')
}); 

pm.test('response body should be an object', () => {
   const responseJson = pm.response.json();
   pm.expect(responseJson).to.be.an('object');
});

pm.test('response body should have correct property and value', () => {
   const responseJson = pm.response.json();
 
   pm.expect(responseJson).to.have.ownProperty('status');
   pm.expect(responseJson.status).to.equals('success');
   pm.expect(responseJson).to.have.ownProperty('message');
   pm.expect(responseJson.message).to.equals('Catatan berhasil dihapus');
}); 

pm.test('when request the updated note', () => {
    const noteId = pm.environment.get('noteId');
    pm.sendRequest(`http://localhost:5000/notes/${noteId}`, (error, response) => {
        if(!error) {
            pm.test('the deleted note should be not found', () => {
                pm.expect(response.code).to.equals(404);
                const responseJson = response.json();
                pm.expect(responseJson.status).to.equals('fail');
                pm.expect(responseJson.message).to.equals('Catatan tidak ditemukan');
            });
        }
    });
});