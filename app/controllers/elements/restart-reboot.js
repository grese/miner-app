import Em from 'ember';
import DeviceMixin from 'miner-app/mixins/device-mixin';
export default Em.Controller.extend(DeviceMixin, {
    restartModalVisible: false,
    rebootModalVisible: false,
    actions: {
        restartClicked: function(){
            this.set('restartModalVisible', true);
        },
        rebootClicked: function(){
            this.set('rebootModalVisible', true);
        },
        doRestart: function(){
            Em.Logger.debug('Restarting miner...');
            this.store.adapterFor('application').restartCGMiner().then(function(result){
                Em.Logger.debug('got result: ', result);
            });
            this.send('showWaitScreen', Em.Object.create({
                method: 'RESTART',
                duration: 30
            }));
        },
        doReboot: function(){
            Em.Logger.debug('Rebooting machine...');
            this.store.adapterFor('application').rebootMachine().then(function(result){
                Em.Logger.debug('got result: ', result);
            });
            this.send('showWaitScreen', Em.Object.create({
                method: 'REBOOT',
                duration: 60
            }));
        },
        cancelRestart: function(){
            Em.Logger.debug('Cancelling restart...');
        },
        cancelReboot: function(){
            Em.Logger.debug('Cancelling reboot...');
        }
    },
    showSuccess: function(title, message){
        this.send('showHero', {
            type: 'success',
            title: title,
            message: message
        });
    },
    showWarning: function(title, message){
        this.send('showHero', {
            type: 'warning',
            title: title,
            message: message
        });
    },
    showFailure: function(title, message){
        this.send('showHero', {
            type: 'danger',
            title: title,
            message: message
        });
    }
});
