(function () {
    const style = document.createElement('style');
    style.innerText = `
        body{
            max-width: 900px;
            text-align: center;
        }

        *{
            font-family: 'Courier New', Courier, monospace;
        }
    `;
    document.head.append(style);
}());