const request = require('request');
const fs = require('fs');

const baseUrl = 'https://search.paytm.com/suggest?s=';
const keywords = ['macbook', 'shoe', 'shirt', 'desktop'];

const output = {};

function crawl(i) {
  request(baseUrl + keywords[i], (err, res, data) => {
    if (err) {
      console.log(err);
    }
    console.log('headers...');
    console.log(res.headers);
    console.log(data);
    output[keywords[i]] = data;
    if (i === keywords.length - 1) {
      fs.writeFileSync('./output-data.json', JSON.stringify(output));
    } else {
      crawl(i + 1);
    }
  });
}

crawl(0);
