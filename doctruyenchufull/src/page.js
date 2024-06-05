function execute(url) {
    let data = [];
    let response = fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' } });
    if (response.ok) {
        let doc = response.html();
        let lastPageElement = doc.select(".pagination li.page-item:not(.disabled) a.page-link").last();
        let lastPageUrl = lastPageElement.attr("href");
        let lastPageNumber = parseInt(lastPageUrl.substring(lastPageUrl.lastIndexOf("/") + 1));

        for (let i = 1; i <= lastPageNumber; i++) {
            let pageUrl = url + "/" + i;
            data.push(pageUrl);
        }
    }

    return Response.success(data);
}