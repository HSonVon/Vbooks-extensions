load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select(".intro p").html();
        let novelTitle = doc.select('meta[property="og:title"]').attr("content");
        let newChap = doc.select(".list-group").first().select("li").get(0).text();
        let author = "Không Xác Định";
        let novelCategory = doc.select(".intro a").text();
        let status = doc.select(".intro u").text();

        return Response.success({
            name: novelTitle,
            cover: coverImg,
            author: author,
            description: descriptionMeta,
            detail: "Tác giả: " + author + '<br>' + "Thể loại: " + novelCategory + '<br>' + "Tình trạng: " + status + '<br>' + "Mới nhất: " + newChap,
            host: BASE_URL
        });
    }
    return null;
}