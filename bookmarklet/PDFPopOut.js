(function (){
    "use strict";
    const scripts = document.querySelectorAll('script');
    scripts.forEach(e => {
        if(e.innerHTML.includes('PDFObject.embed')){
            console.log(e.innerHTML)
        }
    });









}());