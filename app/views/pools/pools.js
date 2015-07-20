import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    toggleDisabledPriorityButtons: function(){
        var self = this;
        Em.run.later(function(){
            self.get('$element').find('.pool-priority-container .priority-up').first().attr('disabled', 'disabled');
            self.get('$element').find('.pool-priority-container .priority-down').last().attr('disabled', 'disabled');
        });
    },
    didInsertElement: function(){
        this.get('controller').on('poolPriorityChanged', this, this.toggleDisabledPriorityButtons);
        this.set('$element', $('#'+this.get('elementId')));
        this.toggleDisabledPriorityButtons();
    }
});
