import Em from 'ember';
var $ = Em.$;
export default Em.Handlebars.makeBoundHelper(function(number, decimals, commas) {
    var dec = ((decimals != null) && (typeof decimals !== 'undefined')) ? decimals : 2,
        output = '';

    if((number != null) && (typeof number !== 'undefined')){
        if(commas){
            output = $.number(number, dec);
        }else{
            output = number.toFixed(dec);
        }
    }
    return output;
});

