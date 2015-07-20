import Em from 'ember';
var $ = Em.$;
export default Em.View.extend({
    templateName: 'elements/spinner',
    classNames: ['spinner-element'],
    width: null,
    defaultValue: 1,
    min: 0,
    max: 100,
    didInsertElement: function(){
        var self = this;
        self.set('$spinner', $('#'+self.get('elementId')+' .spinner'));
        self.set('$input', $('#'+self.get('elementId')+' .spinner input'));
        self.set('$upBtn', $('#'+this.get('elementId')+' .spinner .btn:first-of-type'));
        self.set('$downBtn', $('#'+this.get('elementId')+' .spinner .btn:last-of-type'));

        if(this.get('value') === null || typeof this.get('value') === 'undefined'){
            this.set('value', this.get('defaultValue'));
        }

        if(this.get('width') !== null){
            this.get('$spinner').css('width', this.get('width')+'px');
        }
        this.get('$upBtn').on('click', function(){
            var max = self.get('max'),
                nextVal = parseInt(self.get('$input').val(), 10) + 1;
            if(max >= nextVal){
                self.get('$input').val(nextVal);
                self.set('value', nextVal);
            }
        });
        this.get('$downBtn').on('click', function(){
            var min = self.get('min'),
                nextVal = parseInt(self.get('$input').val(), 10) - 1;
            if(min <= nextVal){
                self.get('$input').val(nextVal);
                self.set('value', nextVal);
            }
        });
    }
});
