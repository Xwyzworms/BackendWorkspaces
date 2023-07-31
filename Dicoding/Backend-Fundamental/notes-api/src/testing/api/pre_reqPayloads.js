let badNotePayloads = pm.environment.get("badNotePayloads");

const isiBody = "Isi dari catatan A";
const isiTags = ["Android", "Web"];
const isiTitle = "Catatan A";

if (!badNotePayloads || !badNotePayloads.length === 0) {

    badNotePayloads = [
        { tags : isiTags, body : isiBody },
        { title : 1, tags : isiTags, body : isiBody},
        { title : isiTitle, body : isiBody },
        { title : isiTitle, tags : [1, "2"] ,body : isiBody },
        { title : isiTitle, tags : isiTags},
        { title : isiTitle, tags : isiTags, body : true},
    ];
}

const currentBadNotePayload = badNotePayloads.shift();  // hapus index 0, geser sisanya

pm.environment.set("currentBadNotePayload", JSON.stringify(currentBadNotePayload));
pm.environment.set("badNotePayloads", badNotePayloads);