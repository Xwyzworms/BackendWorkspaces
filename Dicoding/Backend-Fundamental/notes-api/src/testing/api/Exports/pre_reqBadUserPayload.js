
let badExportPayloads = pm.environment.get('badExportPayloads');

if(!badExportPayloads || badExportPayloads.length == 0 ) {
    badExportPayloads = [
        {},
        { targetEmail: true},
        { targetEmail: 0 },
        { targetEmail: ''},
        { targetEmail: 'John'},
        { targetEmail: 'qwert123'},
    ];
}

const currentBadExportPayload = badExportPayloads.shift(); // Remove the first one

// Set environment
//
pm.environment.set('currentBadExportPayload', JSON.stringify(currentBadExportPayload));
pm.environment.set('badExportPayloads', badExportPayloads);

