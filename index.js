var fs = require('fs');
var request = require('request');

request('https://origin-web-scraping.herokuapp.com/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
    var sectionPattern = /<div class="panel-heading">.*?<\/div><div class="panel-body"><img class="img-responsive" src=".*?" alt=""><p>.*?<\/p><small class="green">.*?<\/small>/g;
    var linePattern = /[\n\r\t]+\s*/g;
    var noLines = response.body.replace(linePattern, '');
    var patterns = noLines.match(sectionPattern);

    var pattern = {
        name: /(^.*?>)|(<.*$)/g,
        imageUrl: /(^.*?src="|" alt.*$)/g,
        author: /(^.*?<p>|<\/p>.*$)/g,
        price: /(^.*?(class\="green">)|<\/small.*$)/g
    };

    var jsonBooks = patterns.map(function(line){
        return {
            name: line.replace(pattern.name, ''),
            imageUrl: line.replace(pattern.imageUrl, ''),
            author: line.replace(pattern.author, ''),
            price: line.replace(pattern.price, '')
        };
    });

    console.log(jsonBooks);
  }
});
