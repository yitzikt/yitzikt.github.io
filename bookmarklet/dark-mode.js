(function () {
    "use strict";
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            color-scheme: light dark;
        }
    `;
    document.head.append(style);
}());




// function filterObjectByNonEmptyStrings(obj) {
//     return Object.entries(obj).reduce((acc, [key, value]) => {
//         if (Array.isArray(value) ) {
//             acc[key] = value;
//         } else if (typeof value === 'string' && value.trim() !== '') {
//             acc[key] = value;
//         } else if (typeof value === 'object') {
//             const filteredNestedObject = filterObjectByNonEmptyStrings(value);
//             if (Object.keys(filteredNestedObject).length > 0) {
//                 acc[key] = filteredNestedObject;
//             }
//         }
//         return acc;
//     }, {});
// }



// const myObject = {
//     key1: 'value1',
//     key2: '',
//     key3: {
//         subKey1: 'subValue1',
//         subKey2: '',
//         subKey3: {
//             subSubKey1: 'subSubValue1',
//             subSubKey2: ''
//         },
//         subKey4: '   ',
//         subKey5: 'subValue5'
//     },
//     key4: '   ',
//     keylist1: [1,2,3,],
//     keylist2: [],
//     key5: 'value5'
// };

// const filteredObject = filterObjectByNonEmptyStrings(myObject);
// console.log(filteredObject);



