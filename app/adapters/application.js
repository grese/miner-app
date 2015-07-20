import Em from 'ember';
import DS from 'ember-data';

var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    headers: {
        apitoken: null
    }
});

ApplicationAdapter.reopen({
    getJSON: function(path){
        return this.ajax('/'+this.get('namespace')+'/'+path);
    },
    loginUser: function(username, password){
        var self = this;
        return Em.$.post('/api/login', {username: username, password: password}).then(function(resp){
            var data = JSON.parse(resp);
            if(data.result === 'SUCCESS'){
                self.set('headers.apitoken', data.token);
                sessionStorage.setItem('piminer_user', JSON.stringify({user: data.user, token: data.token}));
            }
            return data;
        });
    },
    logoutUser: function(){
        sessionStorage.removeItem('piminer_user');
        this.set('headers.apitoken', null);
        return this.ajax('/api/logout');
    },
    restartCGMiner: function(){
        return this.ajax('/api/cgminer/restart');
    },
    rebootMachine: function(){
        return this.ajax('/api/reboot');
    }
});


export default ApplicationAdapter;
