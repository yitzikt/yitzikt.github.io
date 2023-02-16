
(async function () {
    "use strict";
    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }


    async function serviceNote(code) {
        const requestOptionsGet = {
            method: 'GET',
            headers: myHeaders,
            credentials: "include",
            redirect: 'follow'
        };
        try {
            const res = await fetch(`https://members.centralreach.com/crxapi/billing/service-codes/${code}`, requestOptionsGet);
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    }

    function parseCookies() {
        const cookies = document.cookie.split(';');
        const result = {};
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim().split('=');
            result[cookie[0]] = cookie[1];
        }
        return result;
    }
    const myCookies = parseCookies()

    const myHeaders = new Headers();
    myHeaders.append("x-csrf-token", myCookies['csrf-token']);
    myHeaders.append("content-type", "application/json; charset=UTF-8");

    const rawPost = "{\r\n    \"excludeFromSearch\": \"<data><item>contactlabel</item></data>\",\r\n    \"codeLabelIdCollection\": [],\r\n    \"advancedSearchMessageBus\": {\r\n        \"subscriptions\": [\r\n            {\r\n                \"source\": \"*\",\r\n                \"messageName\": \"search-values-updated-out-of-hash-cycle\",\r\n                \"active\": true\r\n            },\r\n            {\r\n                \"source\": \"*\",\r\n                \"messageName\": \"search-values-updated\",\r\n                \"active\": true\r\n            },\r\n            {\r\n                \"source\": \"*\",\r\n                \"messageName\": \"search-value-displays-updated\",\r\n                \"active\": true\r\n            }\r\n        ],\r\n        \"trackedSubscriptions\": []\r\n    },\r\n    \"_advancedSearchPluginInitialized\": true,\r\n    \"filterCount\": 0,\r\n    \"effectiveDisplay\": \"\",\r\n    \"dateTypeDisplay\": \"\",\r\n    \"dirtyProperties\": [],\r\n    \"isDirty\": 0,\r\n    \"queryDirty\": false,\r\n    \"_syncingWithHash\": false,\r\n    \"_collectionArr\": [\r\n        \"codeLabelId\"\r\n    ],\r\n    \"_staticSearchItems\": [],\r\n    \"_syncingPageSize\": false,\r\n    \"resetting\": false,\r\n    \"codeLabelIds\": \"\",\r\n    \"codeLabelIdIncluded\": \"\",\r\n    \"codeLabelIdExcluded\": \"\",\r\n    \"startDate\": \"2023-02-15\",\r\n    \"endDate\": \"2023-02-15\",\r\n    \"page\": 1,\r\n    \"pageSize\": 1000,\r\n    \"_track\": {\r\n        \"channel\": \"billingmanager\",\r\n        \"action\": \"servicecodes/loadservicecodeslist\",\r\n        \"source\": \"Desktop\",\r\n        \"latitude\": 0,\r\n        \"longitude\": 0,\r\n        \"metric\": 0\r\n    },\r\n    \"_utcOffsetMinutes\": 300\r\n}";

    const requestOptionsPost = {
        method: 'POST',
        headers: myHeaders,
        body: rawPost,
        redirect: 'follow'
    };
    try {
        const res = await fetch("https://members.centralreach.com/api/?billingmanager.loadservicecodeslist", requestOptionsPost);
        const resJson = await res.json();
        const noteTemplates = await Promise.all(resJson.items.map(async code => {
            const template = await serviceNote(code.Id);
            const { noteTemplates } = template.results;
            // console.log(template);
            return {
                Id: code.Id,
                Code: code.Code,
                Description: code.Description,
                'templates Required': noteTemplates.filter(note => note.dependency === 2).map(note => note.name).join('; '),
                'templates Optional': noteTemplates.filter(note => note.dependency === 1).map(note => note.name).join('; ')
            }
        }));

        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(noteTemplates[0])
        const csv = [
            header.join(','), // header row first
            ...noteTemplates.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n')

        download(csv, 'servicecodes.csv', 'text/plain');
        // download(JSON.stringify(noteTemplates), 'servicecodes.json', 'text/plain');
    } catch (e) {
        console.error(e);
    }


}());
