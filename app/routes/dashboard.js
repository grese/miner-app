import Em from 'ember';
import AuthenticatedRoute from 'miner-app/routes/authenticated';
export default AuthenticatedRoute.extend({
    model: function(params){
        var startDate, endDate;
        if(params && params.startDate && params.endDate){
            startDate = params.startDate.unix();
            endDate = params.endDate.unix();
        }else{
            startDate = moment().subtract(1, 'hours').unix();
            endDate = moment().unix();
        }return Em.RSVP.hash({
            startDate: startDate,
            endDate: endDate,
            summary: this.store.find('summary').then(function(result){
                return result.objectAt(0);
            }),
            poolstats: this.store.find('poolstat'),
            miners: this.store.find('miner'),
            summaryTrend: this.store.query('trend', {type: 'SUMMARY', startDate: startDate, endDate: endDate}),
            minerTrend: this.store.query('trend', {type: 'MINER', startDate: startDate, endDate: endDate})
        });
    },
    setupController: function(controller, model){
        var self = this;
        controller.set('model', model);
        this.store.query('setting', {type: 'PERFORMANCE_ALERT'}).then(function(result){
            if(result){
                self.evaluatePerformance(model, result.objectAt(0));
            }
        });
    },
    evaluatePerformance: function(model, perfExp){
        if(perfExp && perfExp.get('value.enabled')){
            var actualNumDevices = model.miners.length,
                expectedDevices = perfExp.get('value.numDevices'),
                actualAvgSpeed = model.summary.get('MHS av'),
                expectedSpeed = perfExp.get('value.numMhs');

            var messages = [];
            if(expectedSpeed > actualAvgSpeed){
                messages.push('The average speed of your miners is currently less than your expected speed setting.');
            }
            if(expectedDevices > actualNumDevices){
                messages.push('The number of devices currently running on your machine is less than your expected number of devices.');
            }

            this.send('showHero', {
                type: 'warning',
                title: 'Performance Warning',
                message: messages.join('<br/>')
            });
        }
    },
    actions: {
        updateModel: function(params){
            var self = this;
            if(params && params.startDate && params.endDate){
                self.model({startDate: params.startDate, endDate: params.endDate}).then(function(data){
                    self.controllerFor('dashboard').set('model', data);
                });
            }else{
                self.model().then(function(data){
                    self.controllerFor('dashboard').set('model', data);
                });
            }

        }
    }
});
