import Em from 'ember';
var $ = Em.$;
export default Em.Checkbox.extend({
    classNames: ['switch-element'],
    size: 'mini',
    onColor: 'success',
    offColor: 'danger',
    didInsertElement: function(){
        var self = this;
        $("#"+this.get('elementId')).bootstrapSwitch({
            width: 30,
            size: self.get('size'),
            onColor: self.get('onColor'),
            offColor: self.get('offColor')
        }).on('switchChange.bootstrapSwitch', function (event, state) {
            self.set('checked', state);
        });
    }
});
