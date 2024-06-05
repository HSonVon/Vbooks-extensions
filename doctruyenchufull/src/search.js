load("config.js");

function execute(key, page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + "/searchbook/" + page + "/?key=" + key);

    if (response.ok) {
        let doc = response.html();
        let stories = [];
        doc.select(".container .item").forEach(e => {
            let storyLink = e.select("a").first().attr("href");
            let storyTitle = e.select(".col strong a").first().text();
            let cover = e.select(".col-4 a img").attr("src");
            let description = e.select(".intro").text();

            stories.push({
                name: storyTitle,
                link: storyLink,
                cover: cover,
                description: description,
                host: BASE_URL
            });
        });

        let next = (parseInt(page) + 1).toString();
        return Response.success(stories, next);
    }

    return null;
}