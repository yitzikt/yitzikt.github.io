// (function () {
//     "use strict";
//     const data = [
//         {
//             name: "cliff",
//             age: "34"
//         },
//         {
//             name: "ted",
//             age: "42"
//         },
//         {
//             name: "bob",
//             age: "12"
//         }
//     ];

//     const jsonData = JSON.stringify(data);



//     function download(content, fileName, contentType) {
//         console.log(arguments);

//         const a = document.createElement("a");
//         const file = new Blob([content], { type: contentType });
//         a.href = URL.createObjectURL(file);
//         a.download = fileName;
//         a.click();
//     }
//     // download(jsonData, 'json.txt', 'text/plain');
// })();



// // javascript:
// (function () {
//     const js = document.body.appendChild(document.createElement('script'));
//     js.onerror = () => alert('Sorry, the script could not be loaded.');
//     js.src = 'http://127.0.0.1:54744/bookmarklet/saveJson.js';
// })();



// (function () {
//     "use strict";
//     NodeList.prototype.forEach = Array.prototype.forEach;
//     document.querySelector('.p-element.p-datatable-tbody').querySelectorAll('tr').forEach(console.log);
// })();



(async function () {
    "use strict";
    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function hPeopleSearchPayload(companyID, page) {
        return {
            "rpp": 25,
            "sortBy": "Relevance,company_id",
            "sortOrder": "desc,desc",
            "companyPastOrPresent": "1",
            "excludeNoCompany": "true",
            "returnOnlyBoardMembers": false,
            "excludeBoardMembers": true,
            "companyIds": companyID,
            // "companyIds": "348610101",
            "contactRequirements": "",
            "confidenceScoreMin": 85,
            "confidenceScoreMax": 99,
            "isCertified": "include",
            "inputCurrencyCode": "USD",
            "outputCurrencyCode": "USD",
            "page": page,
            "buyingCommittee": "{\"personas\":[],\"applyToSearchCriteria\":false}",
            "feature": "People Search - UI"
        };
    }

    function viewContactsPayload(personId) {
        return {
            "contacts": [
                {
                    "personId": personId
                }
            ],
            "creditSource": "GROW"
        };
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
        }
        return null;
    }


    async function zoomFetch(url, body) {
        try {
            const response = await fetch(
                url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-ziid': getCookie('ziid'),
                        'x-zisession': getCookie('zisession'),
                        'user': getCookie('userId'),
                    },
                    method: 'POST',
                    body: JSON.stringify(body),
                }
            );
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.error(e);
        }
    }

    async function fetchCompanyData() {
        const companyListTemp = [];

        const companyID = document.querySelector('.company-name.search-name-link-container.ng-star-inserted[data-zoominfo-id]').getAttribute('data-zoominfo-id');
        // eslint-disable-next-line for-direction
        for (let i = 1; i > 0; i++) {
            let peopleData = await zoomFetch('https://app.zoominfo.com/anura/zoominfo/hPeopleSearch', hPeopleSearchPayload(companyID, i));
            if (!peopleData.data.length) {
                break;
            }
            peopleData.data.forEach(async e => {
                let person = await zoomFetch('https://app.zoominfo.com/anura/userData/viewContacts', viewContactsPayload(e.personID));
                companyListTemp.push(person);
            });
            return companyListTemp;
        }
    }

    const companyList = await fetchCompanyData();
    const companyName = companyList[0].data[0].companyName;
    download(JSON.stringify(companyList), `${companyName}.json`, 'text/plain');
    return companyList;
});
// })();

