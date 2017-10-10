/**
 * Created by theroich on 18/5/17.
 */


const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');

const Q  = require('q');

exports.searchTorrentz2 = function(searchStr){
    const deferred = Q.defer();
    const option = {url: `https://torrentz2.eu/search?f=${searchStr}`,
                    headers:{
                      'Access-Control-Allow-Origin':'*'
                    }
                  };
    request(option, function (err, resp, html) {


        var $ = cheerio.load(html);
        const values = _($('dl')).filter(tag => $($(tag).find('a[href]')).attr('href') && $($(tag).find('a[href]')).attr('href').indexOf('?') == -1)
            .map(extractHtmlData).filter(magnetObj => magnetObj.peers && magnetObj.seeds).sortBy(magnetObj => parseInt(magnetObj.seeds)).reverse()
            .value();


        deferred.resolve(values);

        function extractHtmlData(obj){
            const hash = $($(obj).find('a[href]')).attr('href').substring(1);

            const name =  $($(obj).find('a[href]')).text();
            const size = $($(obj).find('dd span')[2]).text();
            const peers = $($(obj).find('dd span')[3]).text();
            const seeds = $($(obj).find('dd span')[4]).text();
            const magnet = `magnet:?xt=urn:btih:${hash}&dn=${encodeURI(name)}${getTrackerStr()}`;
            return {magnet,name,size,peers,seeds};

        }

    });
    return deferred.promise;
};



function getTrackerStr(){

    const trackers = [
        'udp://tracker.coppersurfer.tk:6969/announce',
        'udp://tracker.leechers-paradise.org:6969/announce',
        'udp://tracker.zer0day.to:1337/announce',
        'udp://explodie.org:6969/announce',
        'udp://tracker1.wasabii.com.tw:6969/announce',
        'http://173.254.204.71:1096/announce'
    ];
    return '&tr='+_.join(_(trackers).map(encodeURIComponent).value(),'&tr=');
}
