/**
 * Created by theroich on 7/8/17.
 */
var torrentz = require('../app.js');

torrentz.searchTorrentz2('MicroHD',{skipDDOS:true}).then(datos => {

    console.log(datos);
    
});