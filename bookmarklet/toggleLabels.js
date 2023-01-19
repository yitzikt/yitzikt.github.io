(function (){
    "use strict";
    const closedLabels = () => document.querySelectorAll('.active i.fa.fa-caret-right ');
    const openLabels = () => document.querySelectorAll('.active i.fa.fa-caret-down ');

    function toggleLabels(){
        if(closedLabels().length){
            while(closedLabels().length){
                closedLabels().forEach(elem => {
                    elem.click();
                });
            }
        }else{
            while(openLabels().length){
                openLabels().forEach(elem => {
                    elem.click();
                });
            }
        }
    }
toggleLabels();

})();