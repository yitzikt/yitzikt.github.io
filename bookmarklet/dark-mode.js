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
