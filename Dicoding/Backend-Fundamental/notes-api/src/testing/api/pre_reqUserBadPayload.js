let badUserPayloads = pm.environment.get('badUserPayloads');

const correctUsername = 'johndoe';
const correctPassword = 'secret';
const correctFullName = 'John Doe';

if(!badUserPayloads || badUserPayloads.length === 0) {
    badUserPayloads = [
        { password : correctUsername, fullname: correctPassword },
        { username: 1, password: correctPassword, fullname: correctUsername },
        { username: correctUsername, fullname: correctFullName },
        { username: correctUsername, password: true, fullname: correctFullName },
        { username: correctUsername, password: correctPassword },
        { username: correctUsername, password: correctPassword },
        { username: correctUsername, password: correctPassword, fullname: 0 }
    ]
}

const currentBadUserPayload = badUserPayloads.shift();
pm.environment.set('currentBadUserPayload', JSON.stringify(currentBadUserPayload));
pm.environment.set('badUserPayloads', badUserPayloads);