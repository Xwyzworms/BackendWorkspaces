pm.test('response status code should have 200 value', () => { 
    pm.response.to.have.status(200);
 });

 pm.test('response Content-Type header should have application/json value', () => {
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
 });

 pm.test('response body should be an object', () => {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an('object');
 });

 pm.test('response body should have correct property and value', ()=>{
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');

    pm.expect(responseJson).to.ownProperty('data');
    pm.expect(responseJson.data).to.be.an('object');

 });

 pm.test('user object should contain only id, username, and fullname with correct value',()=> {
    const {data : { user }} = pm.response.json();

    pm.expect(user).to.ownProperty('id');
    pm.expect(user.id).to.equals(pm.environment.get('currentUserId'));

    pm.expect(user).to.ownProperty('username');
    pm.expect(user.username).to.equals(pm.environment.get('newUsername'));

    pm.expect(user).to.ownProperty('fullname');
    pm.expect(user.fullname).to.equals(pm.environment.get('newFullname'));

 });

