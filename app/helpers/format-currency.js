import Em from 'ember';
var $ = Em.$;
export default Em.Handlebars.makeBoundHelper(function(number, decimals) {
    return $.number(number, decimals);
});

