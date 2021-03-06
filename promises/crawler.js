var request = require('request');
var cheerio = require('cheerio');

var getLinks = (data) => {
  var $ = cheerio.load(data);
  var links = [];
  $('a').each((i, elem) => {
    var relativeUrl = $(elem).attr('href');
    if (!relativeUrl.startsWith('http')) {
      relativeUrl = baseUrl + relativeUrl;
    }
    links.push(relativeUrl);
  });
  return links;
};

var getLinksOld = (data) => { // needs refactoring
  var neededlinks = [];
  var i = 9;
  var j = 0;
  var link = "";
  var baseUrl = 'http://marijnhaverbeke.nl/';
  var exp1 = /<a href=\".*\">/g;
  while((result = exp1.exec(data))!==null){
    if(result[0][i]!='h')
      link=link+baseUrl;
    while(result[0][i]!='"')
    {

      link+=result[0][i];
      i++;
    }
    i=9;
    neededlinks.push(link);
    // console.log(link);
    j++;
    //console.log("link "+link);
    link="";
  };
  return neededlinks;
};

var BluebirdPromise = require('bluebird');

var requestP = (url) => new BluebirdPromise((resolve, reject) => {
  request(url, (err, res, body) => {
    resolve(body);
  });
});

var topPageLinks = (body) => {
  var links = getLinks(body);
  console.log(links);
  return links;
};

var crawlPages = (links) => {
  return BluebirdPromise.all(links.map((link) => {
    return requestP(link);
  }));
};

var word = 'Piranha';
var findForWordAndIterate = (pagesData) => {
  pagesData.forEach((pageData, i) => {
    if (pageData.indexOf(word) >= 0) {
      console.log('word found at page: ' + i);
    }
  });
  // var linksData = pagesData.map((pageData) => {
  //   return getLinks(pageData);
  // }).reduce((acc, arr) => {
  //   return acc.concat(arr);
  // }, []);
  // console.log(linksData);
  // return linksData;
};

var baseUrl = 'http://marijnhaverbeke.nl/';
requestP(baseUrl)
  .then(topPageLinks)
  .then(crawlPages)
  .then(findForWordAndIterate)
  .catch((err) => {
    // do something with the error
  });

// requestP(baseUrl).then(getLinksWithCheerio);