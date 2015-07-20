import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    didInsertElement: function(){

        var heroID = this.get('elementId'),
            self = this;
        $('#'+heroID+' .close').on('click', function(){
            $('#'+heroID).fadeOut(function(){
                self.destroy();
            });
        });
        setTimeout(function(){
            var $hero = $('#'+heroID);
            if($hero){
                $hero.fadeOut(function(){
                    self.destroy();
                });
            }
        }, 6000);
    }
});
