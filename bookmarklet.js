function extractSkills() {
    let dataJson = {};

    /* These are the JSON keys we are interested in */
    const KEYS = ['skillLevel', 'skillXP', 'username']

    /* Loop over the save file JSON keys */
    for (let i = 0; i < allVars.length; i++) {
        /* Reached a key we are interested in */
        if (KEYS.includes(allVars[i])) {
            /* Add to our JSON */
            dataJson[allVars[i]] = getItem(key + allVars[i]);
        }
    }

    /* gzip and B64 encode */
    const pakoSave = pako.gzip(JSON.stringify(dataJson), { to: 'string' });
    return [ dataJson['username'], btoa(pakoSave) ];
}

function sendToHiscoresAPI(username, b64JsonString) {
    $.ajax({
        url: 'https://l9ahyalvt7.execute-api.us-east-1.amazonaws.com/prod/users/' + username,
        type: 'POST',
        async: true,
        data: JSON.stringify({
            "data" : b64JsonString
        }),
        success: function(data) {
            console.log('Updated hiscores for user: jadedtdt');
        }
    });
}

function main() {
    let [ username, data ] = extractSkills();
    sendToHiscoresAPI(username, data);
}
main();
