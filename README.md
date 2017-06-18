## TORRENTZ2 API
Html scraper of [Torrentz2](http://torrentz2.eu). Let find a list of magnets links by query string. Return ArrayJson as result.
### Install

```
npm install torrentz2
```

### Search magnet links 
```javascript
const torrentz = require('torrentz2');
torrentz.searchTorrentz2('Ubuntu 15.04').then(console.log);
/*
{ magnet: 'magnet:?xt=urn:btih:7eb63698c76f30c03a74462af56163963c07b902
            &dn=ubuntu-pack-14.04.2-mate&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A696
            9%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannoun
            ce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Fexp
            lodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker1.wasabii.com.tw%3A6969
            %2Fannounce&tr=http%3A%2F%2F173.254.204.71%3A1096%2Fannounce',
    name: 'ubuntu-pack-14.04.2-mate',
    size: '2729 MB',
    peers: '1',
    seeds: '2' },
  { magnet: 'magnet:?xt=urn:btih:18ac50d74c61883b3ab4c40f5dd3e35f157de1a2
            &dn=ubuntu-14.04-desktop-amd64.iso&tr=udp%3A%2F%2Ftracker.coppersurfer.tk
            %3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2F
            announce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F
            %2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker1.wasabii.com.tw%
            3A6969%2Fannounce&tr=http%3A%2F%2F173.254.204.71%3A1096%2Fannounce',
                name: 'ubuntu-14.04-desktop-amd64.iso',
    size: '964 MB',
    peers: '1',
    seeds: '2' },...
*/
```