const cheerio = require('cheerio');
const request = require('axios');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

async function getTags () {
  const response = await dynamo.scan({
        TableName: 'serverless-web-scaper-dev-tags'
      }).promise();
      
  response.Items.sort(function (a, b) {
    return b.count - a.count;
  });

  return response.Items;
}  

async function getAuthors () {
  const response = await dynamo.scan({
        TableName: 'serverless-web-scaper-dev-authors'
      }).promise();
  
  response.Items.sort(function (a, b) {
    return b.quoteCount - a.quoteCount;
  });
  
  return response.Items;
}  

async function refreshQuoteStats () {
  var quotes = [];
  const response = await getPageHTML('http://quotes.toscrape.com');
  await extractQuotesFromHTML(response.data, quotes);
  
  for (const quote of quotes) {
    const authorHTML = await getPageHTML(quote.author.url);
    const authorPage = cheerio.load(authorHTML.data);
    quote.author.dateBorn = authorPage('.author-born-date').text();
  }

  let authors = {};
  let tags = {}; 

  for (const quote of quotes) {
    if(typeof authors[quote.author.name] === "undefined") {
      authors[quote.author.name] = {};
      authors[quote.author.name].name = quote.author.name;
      authors[quote.author.name].quoteCount = 1;
      authors[quote.author.name].dateBorn = quote.author.dateBorn;
      authors[quote.author.name].tags = [];
    }else{
      authors[quote.author.name].quoteCount = authors[quote.author.name].quoteCount + 1;
    }
    for (const tag of quote.tags) {
      if(authors[quote.author.name].tags.indexOf(tag) === -1) {
        authors[quote.author.name].tags.push(tag);
      }
      if(typeof tags[tag] === "undefined") {
        tags[tag] = {};
        tags[tag].name = tag;
        tags[tag].count = 1;
      }else{
        tags[tag].count = tags[tag].count + 1;
      }
    }
  }
  
  //console.log(tags);
  //console.log(authors);
  
  for (var name in authors) {
    if (Object.prototype.hasOwnProperty.call(authors, name)) {
      await dynamo.put({
        TableName: 'serverless-web-scaper-dev-authors',
        Item: {
          name: name,
          dateBorn: authors[name].dateBorn,
          quoteCount: authors[name].quoteCount,
          tags: authors[name].tags
        }
      }).promise();
    }
  }  
  
  for (var name in tags) {
    if (Object.prototype.hasOwnProperty.call(tags, name)) {
      await dynamo.put({
        TableName: 'serverless-web-scaper-dev-tags',
        Item: {
          name: name,
          count: tags[name].count
        }
      }).promise();
    }
  }
}
  
  
async function extractQuotesFromHTML (html, quotes) {
//const extractQuotesFromHTML = async (html) => 
  const page = cheerio.load(html);
  //console.log(html);
  let quoteRows = page('.quote');
  
  quoteRows.each(function(index, element) {
            let quote = {}
            //quote.text = cheerio(element).children('.text').text()
            let tagCheerio = cheerio.load(cheerio(element).children('.tags').html());
            let tagRows = tagCheerio('.tag');
            let tags = [];
            tagRows.each(function(index2, element2) {
                const tag = cheerio(element2).text();
                tags.push(tag.toString());
            });    
            quote.tags = tags;
            quote.author = {};
            quote.author.name = cheerio(element).children('span').children('.author').text();
            let authorURL = cheerio(element).children('span').children('a').attr('href');
            quote.author.url = 'http://quotes.toscrape.com' + authorURL;
            //quote.author.dateBorn = 'September 20, 1948';
            quotes.push(quote);
         });

  let nextUrl = page('.next').children('a').attr('href');
  //console.log(nextUrl);
  if(typeof nextUrl !== "undefined") {
    //console.log('quote count: ' + quotes.length);
    const nextHTML = await getPageHTML('http://quotes.toscrape.com' + nextUrl);
    await extractQuotesFromHTML(nextHTML.data, quotes);

  }
  //console.log('final quote count: ' + quotes.length);

  //console.log(quotes);

  //return quotes;
}

const getPageHTML = async (url) => {
  try {
    return await request(url)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  refreshQuoteStats,
  getAuthors,
  getTags
};