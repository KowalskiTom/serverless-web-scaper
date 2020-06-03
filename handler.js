'use strict';

const {refreshQuoteStats, getTags, getAuthors} = require('./src/quotes');

module.exports.refreshQuoteStats = async event => {
  try {
    await refreshQuoteStats();
    return stringifyResponse(200,{message: "All good!"});
  }
  catch(err) {
    console.error(err);
    return stringifyResponse(500,{message: err.message});
  }
};

module.exports.getTags = async event => {
  try {
    const tags = await getTags();
    return stringifyResponse(200,{tags: tags});
  }
  catch(err) {
    console.error(err);
    return stringifyResponse(500,{message: err.message});
  }
};

module.exports.getAuthors = async event => {
  try {
    const authors = await getAuthors();
    return stringifyResponse(200,{authors: authors});
  }
  catch(err) {
    console.error(err);
    return stringifyResponse(500,{message: err.message});
  }
};

  
function stringifyResponse(status,body){
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify( body, null, 2),
  };
}