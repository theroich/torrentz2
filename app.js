/**
 * Created by theroich on 18/5/17.
 */

const Parser = require('rss-parser');
const _ = require('lodash');
const parser = new Parser();
const cloudscraper = require('cloudscraper');
const puppeteer = require('puppeteer');


exports.searchTorrentz2 = async function(searchStr,options){
    let feed;
    const feedUrl = `https://torrentz2.eu/feed?f=${searchStr}`;
    if(options && options.skipDDOS){
        const feedStr = await cloudscraper.get(feedUrl);
        feed =  await parser.parseString(feedStr);
        
    }else{
        feed = await parser.parseURL(feedUrl);
    }
   
    const items = feed.items.map(item => {
        //content: 'Size: 5109 MB Seeds: 2 Peers: 0 Hash: e22b06e6a75cb1d3d2e74713420a51cc3bb579f1',
        const contents = item.content.split(" ");
        const size = contents[1]+" "+contents[2];
        const peers = contents[6];
        const seeds = contents[4];
        const hash = item.link.replace("https://torrentz2.eu/","")
        const magnet = toMagnet(hash,item.title);
        const name = item.title
        
        return {
          magnet,name,size, seeds,peers
        }
    });
    return items;
};




function toMagnet(hash, name){

    const trackers = [
        'udp://tracker.leechers-paradise.org:6969/announce',
        'udp://explodie.org:6969/announce',
        'udp://open.demonii.si:1337/announce',
        'udp://denis.stalker.upeer.me:6969/announce',
        'udp://tracker.coppersurfer.tk:6969/announce',
        'udp://torrentclub.tech:6969/announce',
        'udp://retracker.lanta-net.ru:2710/announce',
        'udp://retracker.akado-ural.ru:80/announce',
    ];
    return `magnet:?xt=urn:btih:${hash}&dn=${encodeURI(name)}&tr=+${_.join(_(trackers).map(encodeURIComponent).value(),'&tr=')}`;
}



async function puppetterQuery(searchStr) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://torrentz2.eu/feed?f=${searchStr}`);
    setTimeout(() => page.screenshot({path: 'example.png'}),10000);

  
}

exports.searchPuppetter = puppetterQuery;