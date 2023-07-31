pm.test("response status code should have 400 value", ()=> {
    pm.response.to.have.status(400);
});

pm.test("response Content-Type header should have application/json; charset=utf-8 value", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.equals("application/json; charset=utf-8")
});

pm.test("response body should be an object", ()=> {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an("object");
});

pm.test("response body object should have correct propert and value", () => {
    const responseJson = pm.response.json();
    console.log(responseJson);
    pm.expect(responseJson).to.haveOwnProperty("status");
    pm.expect(responseJson.status).to.equals("fail");
    pm.expect(responseJson).to.haveOwnProperty("message");
    pm.expect(responseJson.message).to.be.ok;
});

const repeatRequestUntilDatasetEmpty = () => {
    const badNotePayloads = pm.environment.get("badNotePayloads");

    if(badNotePayloads && badNotePayloads.length > 0) {
        postman.setNextRequest("Adding Notes with Bad Note Payload");
    }
}

repeatRequestUntilDatasetEmpty();