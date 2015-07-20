import Em from 'ember';
export default Em.ObjectController.extend({
    options: [
        {
            label: 'Failover',
            value: 'FAILOVER'
        },
        {
            label: 'Round Robin',
            value: 'ROUND_ROBIN'
        },
        {
            label: 'Rotate',
            value: 'ROTATE'
        },
        {
            label: 'Load Balance',
            value: 'LOAD_BALANCE'
        },
        {
            label: 'Balance',
            value: 'BALANCE'
        }
    ],
    isStrategyRotate: function(){
        Em.Logger.debug('the model: ', this.get('model'));
        return this.get('model.value.strategy') === 'ROTATE';
    }.property('model.value.strategy'),
    actions: {
        openStrategyInfo: function(){
            this.set('strategyInfoVisible', true);
        },
        closeStrategyInfo: function(){
            this.set('strategyInfoVisible', false);
        }
    }
});
