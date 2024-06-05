load('config.js');
function execute(url,page) {
    if(!page) page = '1';
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url + "/" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".container .item").forEach(e => {
            data.push({
                name: e.select(".col strong a").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".col-4 a img").attr("src"),
                description: e.select(".intro").text(),
                host: BASE_URL
            });
        });
        let next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}