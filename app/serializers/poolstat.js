import DS from 'ember-data';
export default DS.RESTSerializer.extend({
    normalizePayload: function(payload){
        var pool, pools = [];
        for(var poolName in payload){
            if(poolName.match(/^POOL\d+$/g)){
                pool = payload[poolName];
                pool.id = poolName;
                pools.push(pool);
            }
        }
        return { poolstats: pools };
    }
});
