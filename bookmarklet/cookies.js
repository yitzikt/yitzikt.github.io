

// function setCookie(name, value, days) {
//     let expires = "";
//     if (days) {
//         let date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function getCookie(name) {
//     let nameEQ = name + cookie_version_control + "=";
//     let ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') {
//             c = c.substring(1, c.length);
//             if (c.indexOf(nameEQ) === 0) {
//                 return c.substring(nameEQ.length, c.length);
//             }
//         }
//     }
//     return null;
// }

// function removeCookie(name) {
//     document.cookie = name + '=; Max-Age=-99999999;';
// }

function deleteCookies() {
    let allCookies = document.cookie.split(';');
    
    // The "expire" attribute of every cookie is 
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (let i = 0; i < allCookies.length; i++){
        document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    }
}





// let cookie_version_control = '---2018/5/11';

// function setCookie(name,value,days) {
//     let expires = "";
//     if (days) {
//         let date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name+cookie_version_control + "=" + (value || "")  + expires + "; path=/";
// }

// function getCookie(name) {
//     let nameEQ = name+cookie_version_control + "=";
//     let ca = document.cookie.split(';');
//     for(let i=0;i < ca.length;i++) {
//         let c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

// function removeCookie(name) {
//     document.cookie = name+cookie_version_control+'=; Max-Age=-99999999;';
// }


