import Em from 'ember';
export default Em.Controller.extend({
    isPerfExpEnabled: function(){
        if(!this.get('perfExpSetting.value.enabled')){
            return 'disabled';
        }else{
            return false;
        }
    }.property('perfExpSetting.value.enabled'),
    save: function(){
        var promises = Em.A([this.get('perfExpSetting').save()]);
        return Em.RSVP.all(promises);
    },
    perfExpSetting: null
});
