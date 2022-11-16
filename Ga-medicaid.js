(function () {
    "use strict";
    function filter_rows() {
        setTimeout(() => {
            document.querySelector("#content > div > table > tbody").querySelectorAll("tr").forEach(row => {
                const code = row.querySelector("td:nth-child(5) > div > div > a");
                if (code.innerText !== '97151') {
                    row.remove();
                }
            });
        }, 1000);
    }
    const href_list = [
        {
            hash: 'billingmanager/authorizations/?validDays=90&contactLabelIdIncluded=226070&contactLabelIdExcluded=377538&pageSize=500&sort=enddate_desc',
            title: `Step 1/3: Kids with 'GA Medicaid primary' but not a 'GA Medicaid secondary' label`
        },
        {
            hash: 'billingmanager/authorizations/?validDays=90&contactLabelIdExcluded=226070&contactLabelIdIncluded=377538&pageSize=500&sort=enddate_desc',
            title: `Step 2/3: Kids with 'GA Medicaid secondary' but not a 'GA Medicaid primary' label`
        },
        {
            hash: 'billingmanager/authorizations/?validDays=90&contactLabelIdIncluded=226070-377538&pageSize=500&sort=enddate_desc',
            title: `Step 3/3: Kids with both 'GA Medicaid secondary' and 'GA Medicaid primary' labels`
        },
    ];
    window.location.hash = 'billingmanager/authorizations';
    setTimeout(() => {
        document.querySelector("#authorizations-list-sub-module > header.main-content-header.fixed-xs.no-padding > div.sub-nav > ul > li.flex.align-items-center.justify-content-center.border-right.border-bottom.border-right.notify > a").click();
    }, 750);
    if (!document.querySelector('#GaMedicaidBttn')) {
        let button_count = 0;
        const next_button = document.createElement('button');
        next_button.style = `
            background-color: #ff7171;
            border-radius: 20px;
            width: 200px;
            margin-left: 12px;
            border: none
        `;
        next_button.innerText = 'Click Here: GA-Medicaid';
        next_button.id = 'GaMedicaidBttn';
        next_button.addEventListener('click', () => {
            next_button.style = `
                border-radius: 20px;
                margin: auto;
                border: none;
                width: 85%;
                background-color: #e6e6e6;
                display: block;
                padding: 8px;
                `;
            window.location.hash = href_list[button_count].hash;
            next_button.innerText = href_list[button_count].title;
            button_count = (button_count + 1) % href_list.length;
            filter_rows();
        });
        document.querySelector("#authorizations-list-sub-module > nav > div.sidebar2").append(next_button);
    }
    document.querySelector("#auth-report > div:nth-child(1) > div > div.pull-right > div.inline-block.btn-group.margin-xs-left").addEventListener('click', filter_rows);
})();