import Em from 'ember';
export default Em.Controller.extend({
    needs: ['application'],
    deviceName: function(){
        return this.get('controllers.application.deviceName');
    }.property('controllers.application.deviceName'),
    isLoggedIn: function(){
        return this.get('controllers.application.user') !== null;
    }.property('controllers.application.user')
});
