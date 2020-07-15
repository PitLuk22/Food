const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        // headers нужени при отправке json, а при отправке обычного формата - комментируем headers
        headers: {
            'Content-type': 'application/json'
        },
        body: data //здесь уже сторка json
    });
    return await res.json(); // возвращает промис 
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch: ${url}, status: ${res.status}`);
    }

    return res.json();
}

export {
    postData,
    getResource
};