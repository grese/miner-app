import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    didInsertElement: function(){
        $(".navbar-link").click(function() {
            $(".navbar-collapse").collapse('hide');
        });
    }
});
