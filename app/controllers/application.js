import Em from 'ember';
import DeviceMixin from 'miner-app/mixins/device-mixin';
export default Em.Controller.extend(DeviceMixin, {
    appTitle: 'Miner App',
    deviceNameUpdateToggle: false,
    isDeviceIPhone: function(){

    }.property(),
    updateDeviceName: function(name){
        localStorage.setItem('deviceName', name);
        this.set('_deviceNameUpdateToggle', !this.get('_deviceNameUpdateToggle'));
    },
    deviceName: function(){
        if(localStorage.getItem('deviceName')){
            return localStorage.getItem('deviceName');
        }else{
            var self = this;
            this.store.query('setting', {type: 'DEVICE_INFO'}).then(function(results){
                var info = results.objectAt(0);
                if(info){
                    self.updateDeviceName(info.get('value.name'));
                }
            });
        }
    }.property('deviceNameUpdateToggle'),
    user: function(){
        var user = sessionStorage.getItem('piminer_user');
        if(user){
            return JSON.parse(user);
        }else{
            return null;
        }
    }.property(),
    isLoggedIn: function(){
        return this.get('user') !== null;
    }.property('user')
});
