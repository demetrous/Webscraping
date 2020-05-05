const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("posts.csv");

//Write headers
writeStream.write(`Title,Link,Date \n`);

request("https://west-wind.com/articles.aspx", (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);

    $("div#Links .entry").each((i, el) => {
      const title = $(el)
        .find("a")
        .text()
        .replace(/,|\s\s+/g, "");

      const link = $(el).find("a").attr("href");

      const date = $(el)
        .find(".dateline")
        .text()
        .replace(/,|\s\s+/g, "");

      //Write row to csv file
      writeStream.write(`${title},${link},${date} \n`);
    });
    console.log("Scraping Done...");
  }
});
