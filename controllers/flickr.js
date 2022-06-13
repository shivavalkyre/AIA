const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const { response } = require('../server');

const index = (req, res, next) => {
  
    let tag =  req.params.tag;
    let error;
    var resp={};
    var datas = [];

    if (!tag)
    {

        makeRequest('https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1').then(function(data) {
       

            
            resp.datas = datas;
            data.items.forEach(function (element) {
               var image = { "image" : element.media.m } 
               resp.datas.push(image);
               //console.log(resp);
            });
    
            res.status(200).json(resp);
    
    
        }).catch(function(err) {
            error= err;
            console.log(err);
            res.status(404).json(err);
        });
    
    }else{


        makeRequest('https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags='+tag+'&nojsoncallback=1').then(function(data) {
       


            resp.datas = datas;
            data.items.forEach(function (element) {
               var image = { "image" : element.media.m } 
               resp.datas.push(image);
               //console.log(resp);
            });
    
            res.status(200).json(resp);
    
    
        }).catch(function(err) {
            error= err;
            console.log(err);
            res.status(404).json(err);
        });


    }


}

function makeRequest(uri){
   
    return new Promise(function(resolve, reject){
        request(uri, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            if (error) return reject(error);
            try {
                // JSON.parse() can throw an exception if not valid JSON
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
    });
}

module.exports = {index};