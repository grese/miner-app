import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    didInsertElement: function(){
        var duration = this.controller.get('duration'),
            self = this;
        var $clockElm = $('#'+this.get('elementId')+' .please-wait-timer');
        var i = duration;
        $clockElm.flipcountdown({
            size: 'lg',
            showHour: false,
            showMinute: false,
            tick: function(){
                if(i > 0){
                    if(i <= 9){
                        return "0"+i--;
                    }else{
                        return i--;
                    }
                }else{
                    self.controller.send('timerComplete');
                    return "00";
                }
            }
        });
    }
});
