import AuthenticatedRoute from 'miner-app/routes/authenticated';
import Em from 'ember';
export default AuthenticatedRoute.extend({
    model: function(){
        var user = this.controllerFor('application').get('user'),
            userid = user.user.id;

        return Em.RSVP.hash({
            info: this.store.query('setting', {type: 'DEVICE_INFO'})
                .then(function(result){ return result.objectAt(0); }),
            strategy: this.store.query('setting', {type: 'POOL_STRATEGY'})
                .then(function(result){ return result.objectAt(0); }),
            pools: this.store.find('pool'),
            perfExp: this.store.query('setting', {type: 'PERFORMANCE_ALERT'})
                .then(function(result){ return result.objectAt(0); }),
            user: this.store.find('user', userid),
            notification: this.store.query('setting', {type: 'EMAIL_NOTIFICATION'})
                .then(function(result){ return result.objectAt(0); }),
            analytics: this.store.query('setting', {type: 'ANALYTICS_CONFIG'})
                .then(function(result){ return result.objectAt(0); })

        });
    },
    afterModel: function(model){
        var info = JSON.stringify(model.info.get('value')),
            perfExp = JSON.stringify(model.perfExp.get('value')),
            notification = JSON.stringify(model.notification.get('value')),
            analytics = JSON.stringify(model.analytics.get('value')),
            strategy = JSON.stringify(model.strategy.get('value'));

        this.set('initialSettings', {
            info: info,
            perfExp: perfExp,
            notification: notification,
            analytics: analytics,
            strategy: strategy
        });
    },
    convertObjectToStr: function(obj){
        if(typeof obj === 'object'){
            return JSON.stringify(obj);
        }else{
            return obj;
        }
    },
    objectsAreEqual: function(obj1, obj2){
        var str1 = this.convertObjectToStr(obj1),
            str2 = this.convertObjectToStr(obj2);
        return str1 !== str2;
    },
    setupController: function(controller, model){
        this.controllerFor('settings.info').set('model', model.info);
        this.controllerFor('pools.strategy').set('model', model.strategy);
        this.controllerFor('pools.pools').set('model', model.pools);
        this.controllerFor('alerts.alerts').set('perfExpSetting', model.perfExp);
        this.controllerFor('settings.notification').set('model', model.notification);
        this.controllerFor('settings.user').set('model', model.user);
        this.controllerFor('settings.analytics').set('model', model.analytics);
        this.controllerFor('pools.strategy').set('model', model.strategy);
    },
    actions: {
        saveSettings: function(){
            this.controllerFor('settings').set('saveInProgress', true);
            this.send('showGlobalLoading');

            var self = this;
            var dirtyModels = {},
                errors = [];

            this.controllerFor('pools.pools').validatePools();
            if(this.controllerFor('pools.pools').get('hasDirtyPools')){

                if(this.controllerFor('pools.pools').get('poolsAreValid')){
                    dirtyModels.pools = this.controllerFor('pools.pools').save();
                }else{
                    errors = errors.concat(this.controllerFor('pools.pools').get('validationErrors'));
                }
            }
            if(this.controllerFor('settings.user').get('model.isDirty')){
                var usr = this.controllerFor('settings.user').get('model');
                if(usr.get("isValid")){
                    usr.set('passwordConfirmation', null);
                    dirtyModels.user = this.controllerFor('settings.user').save();
                }else{
                    usr.validate().catch(function(err){
                        errors = errors.concat(err.username);
                        errors = errors.concat(err.password);
                        errors = errors.concat(err.passwordConfirmation);
                    });
                    usr.set('passwordConfirmation', null);
                }

            }


            if(this.objectsAreEqual(this.controllerFor('settings.info').get('model.value'),
                this.get('initialSettings.info'))){
                dirtyModels.info = this.controllerFor('settings.info').save();
                this.controllerFor('application').updateDeviceName(
                    this.controllerFor('settings.info').get('model.value.name')
                );
            }

            if(this.objectsAreEqual(this.controllerFor('settings.notification').get('model.value'),
                this.get('initialSettings.notification'))){
                dirtyModels.notification = this.controllerFor('settings.notification').save();
            }
            if(this.objectsAreEqual(this.controllerFor('settings.analytics').get('model.value'),
                this.get('initialSettings.analytics'))){
                dirtyModels.analytics = this.controllerFor('settings.analytics').save();
            }
            if(this.objectsAreEqual(this.controllerFor('alerts.alerts').get('perfExpSetting.value'),
                this.get('initialSettings.perfExp'))){
                dirtyModels.perfExp = this.controllerFor('alerts.alerts').save();
            }
            if(this.objectsAreEqual(this.controllerFor('pools.strategy').get('model.value'),
                this.get('initialSettings.strategy'))){
                dirtyModels.strategy = this.controllerFor('pools.strategy').get('model').save();
            }

            if(errors.length <= 0){
                Em.RSVP.hash(dirtyModels).then(function(responses){
                    self.controllerFor('settings').set('saveInProgress', false);
                    self.send('hideGlobalLoading');

                    var valid = true,
                        errSections = "";
                    for(var e in responses){
                        if(e in dirtyModels && dirtyModels[e]){
                            if(!responses[e]){
                                valid = false;
                                var str = '<li>'+e.charAt(0).toUpperCase() + e.substring(1)+'</li>';
                                errSections += str;
                            }
                        }
                    }
                    if(!valid){
                        self.send('showHero', {
                            type: 'danger',
                            message: 'An error occurred while saving your settings... Please check the following sections ' +
                                'and try again<br/><ul>'+errSections+'</ul>',
                            title: 'Error while saving settings!'
                        });
                    }else{
                        if(Object.keys(dirtyModels).length > 0){
                            self.send('showHero', {
                                type: 'success',
                                message: 'Your settings have been saved successfully.',
                                title: 'Settings Saved!'
                            });
                        }else{
                            self.send('showAlert', {
                                type: 'info',
                                message: 'It looks like none of your settings have changed since you last saved...',
                                title: 'No Changes? '
                            });
                        }
                    }
                }).catch(function(error){
                    self.controllerFor('settings').set('saveInProgress', false);
                    self.send('hideGlobalLoading');
                    Em.Logger.error("<ERROR>: While saving settings to server...", error);
                });
            }else{
                self.send('hideGlobalLoading');
                var errList = '<ul><li>'+errors.join('</li><li>')+'</li></ul>';
                self.send('showHero', {
                    type: 'danger',
                    message: 'Some validation errors occurred.  Please review the errors and try again.<br/>'+errList,
                    title: 'Error while saving settings!'
                });
            }
        }
    }
});
