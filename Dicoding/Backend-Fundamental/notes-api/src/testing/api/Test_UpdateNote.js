pm.test('when request the updated note', () => {
    const noteId = pm.environment.get('noteId');
    const getRequest = {
        url: `http://localhost:5000/notes/${noteId}`,
        method: 'GET',
        header: {
            'Authorization': `Bearer ${pm.environment.get('accessToken')}`,
        },
    };
    pm.sendRequest(getRequest, (error, response) => {
        if(!error) {
            pm.test('then the updated note should contain the latest data', () => {
                const responseJson = response.json();
                const { data: { note } } = responseJson;
 
                const expectedTitle = 'Catatan A Revised';
                const expectedTags = ['Android', 'Web'];
                const expectedBody = 'Isi dari Catatan A Revised';
 
                pm.expect(note.title).to.equals(expectedTitle);
                pm.expect(note.tags).to.eql(expectedTags);
                pm.expect(note.body).to.equals(expectedBody);
            });
        }
    });
});