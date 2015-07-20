/*
 This will convert the `number` param from mh to gh (divide it by 1000), and
 then return it fixed to `decimals` decimal places.
 */
 import Em from 'ember';
export default Em.Handlebars.makeBoundHelper(function(number, speed) {
    if(!speed || speed === 'MH'){
        return number.toFixed(2);
    }else if(speed === 'GH'){
        number = number / 1000;
        return number.toFixed(2);
    }
});

