pm.test("response status code should have 200 value", ()=> {
	pm.response.to.have.status(200);
});


pm.test("response Content-Type headers should have application/json value", ()=>{
	pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');	

});

pm.test("response body data should contains notes array with 1 item", () => {

	const responseJson = pm.response.json();

	pm.expect(responseJson).to.be.an('object');
	pm.expect(responseJson).to.ownProperty('data');

	pm.expect(responseJson.data).to.be.an('object');
	pm.expect(responseJson.data).to.ownProperty('notes');
	
	pm.expect(responseJson.data.notes).to.be.an('array');
	
	pm.expect(responseJson.data.notes).to.have.lengthOf(1);

}); 
