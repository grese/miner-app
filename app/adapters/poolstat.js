import ApplicationAdapter from 'miner-app/adapters/application';

export default ApplicationAdapter.extend({
    pathForType: function(){
        return 'cgminer/pools';
    }
});