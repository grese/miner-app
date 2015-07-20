import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    templateName: 'elements/alert',
    didInsertElement: function(){
        var self = this;
        var elm = $('#'+self.get('elementId .alert'));
        elm.on('closed.bs.alert', function(){
            self.destroy();
        });
        if(this.get('controller.autoDismiss')){
            setTimeout(function(){
                elm.alert('close');
                self.destroy();
            }, this.get('controller.autoDismissTimeout'));
        }
    }
});
