// (async function () {

//     function download(content, fileName, contentType) {
//         const a = document.createElement("a");
//         const file = new Blob([content], { type: contentType });
//         a.href = URL.createObjectURL(file);
//         a.download = fileName;
//         a.click();
//     }

//     "use strict";
//     const myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
//     myHeaders.append("Accept-Language", "en-US,en;q=0.9");
//     myHeaders.append("Connection", "keep-alive");
//     myHeaders.append("Cookie", `ASP.NET_SessionId=${getCookie('ASP.NET_SessionId')}; .ASPXAUTH=${getCookie('.ASPXAUTH')}`);
//     myHeaders.append("Referer", "https://philasprout-serviceportal.elwyn.org/MSP/AdministratorHome");
//     myHeaders.append("Sec-Fetch-Dest", "empty");
//     myHeaders.append("Sec-Fetch-Mode", "cors");
//     myHeaders.append("Sec-Fetch-Site", "same-origin");
//     myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36");
//     myHeaders.append("X-Requested-With", "XMLHttpRequest");
//     myHeaders.append("sec-ch-ua", "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"");
//     myHeaders.append("sec-ch-ua-mobile", "?0");
//     myHeaders.append("sec-ch-ua-platform", "\"Windows\"");

//     const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };

//     try {
//         const theData = [];
//         const zipArray = [];
//         document.querySelectorAll('#ZipCodes > option').forEach(e => zipArray.push(e.value));
//         const zips = zipArray.join('%3B');

//         for (let i = 1; true; i++) {
//             const request = await fetch(`https://philasprout-serviceportal.elwyn.org/MSP/GetReferralsInPublicPool?searchById=&clientName=&type=&projectedStart=&referralDate=&svcItemId=&svcLocationName=&displayPreferredZipCodes=false&${zips}&frequencyInterval=&svcCoordinatorId=&pageIndex=${i}&pageSize=1000&sortColumn=&sortDirection=1&t=1673904711200`, requestOptions);
//             const data = await request.json();
//             if (!data.Data?.length) {
//                 break;
//             }
//             theData.push(...data.Data)
//         }


//         const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
//         const header = Object.keys(theData[0])
//         const csv = [
//             header.join(','), // header row first
//             ...theData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
//         ].join('\r\n')

//         download(csv, 'sprout.csv', 'text/plain');


//     } catch (e) {
//         console.error('error', e)
//     }

// }());



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
                templates: noteTemplates.map(note => note.name).join('; ')
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
