import Em from 'ember';
export default Em.ObjectController.extend({
    save: function(){
        return this.get('model').save();
    }
});
