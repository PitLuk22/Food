function parser() {

    let body = document.querySelector('body');
    let textNodes = [];

    function recursy(element) {

        element.childNodes.forEach(node => {
            if (node.nodeName.match(/^H\d/)) {
                let obj = {
                    header: node.nodeName,
                    content: node.textContent.trim()
                };
                textNodes.push(obj);
            } else {
                recursy(node);
            }
        });
    }
    recursy(body);
    // console.log(textNodes);

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: "POST",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(textNodes)
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data));
}


export default parser;