(async function () {
    "use strict";
    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    const myCookies = (function parseCookies() {
        const cookies = document.cookie.split(';');
        const result = {};
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim().split('=');
            result[cookie[0]] = cookie[1];
        }
        return result;
    }());

    const myHeaders = new Headers({
        "x-csrf-token": myCookies['csrf-token'],
        "content-type": "application/json; charset=UTF-8"
    });

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

    async function fetchServiceCodeList() {
        let page = 1;
        const pages = [];
        while (true) {
            const items = await (async function () {
                "use strict";
                const postData = {
                    "excludeFromSearch": "<data><item>contactlabel</item></data>",
                    "codeLabelIdCollection": [],
                    "advancedSearchMessageBus": {
                        "subscriptions": [
                            {
                                "source": "*",
                                "messageName": "search-values-updated-out-of-hash-cycle",
                                "active": true
                            },
                            {
                                "source": "*",
                                "messageName": "search-values-updated",
                                "active": true
                            },
                            {
                                "source": "*",
                                "messageName": "search-value-displays-updated",
                                "active": true
                            }
                        ],
                        "trackedSubscriptions": []
                    },
                    "_advancedSearchPluginInitialized": true,
                    "filterCount": 0,
                    "effectiveDisplay": "",
                    "dateTypeDisplay": "",
                    "dirtyProperties": [],
                    "isDirty": 0,
                    "queryDirty": false,
                    "_syncingWithHash": false,
                    "_collectionArr": [
                        "codeLabelId"
                    ],
                    "_staticSearchItems": [],
                    "_syncingPageSize": false,
                    "resetting": false,
                    "codeLabelIds": "",
                    "codeLabelIdIncluded": "",
                    "codeLabelIdExcluded": "",
                    "startDate": "2020-01-15",
                    "endDate": "2099-02-15",
                    "page": page,
                    "pageSize": 10000,
                    "_track": {
                        "channel": "billingmanager",
                        "action": "servicecodes/loadservicecodeslist",
                        "source": "Desktop",
                        "latitude": 0,
                        "longitude": 0,
                        "metric": 0
                    },
                    "_utcOffsetMinutes": 300
                }
                const requestOptionsPost = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(postData),
                    redirect: 'follow'
                };
                const res = await fetch("https://members.centralreach.com/api/?billingmanager.loadservicecodeslist", requestOptionsPost);
                return await res.json();
            }());
            page++;
            if (!items.items.length) {
                break;
            }
            pages.push(...items.items);
        }
        return pages;
    }
    try {
        const resJson = await fetchServiceCodeList();
        const noteTemplates = await Promise.all(resJson.map(async code => {
            const template = await serviceNote(code.Id);
            const { noteTemplates } = template.results;
            return {
                Id: code.Id,
                Code: code.Code,
                Description: code.Description,
                'Templates Required': noteTemplates.filter(note => note.dependency === 2).map(note => note.name).join('; '),
                'Templates Optional': noteTemplates.filter(note => note.dependency === 1).map(note => note.name).join('; ')
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
