import DS from 'ember-data';
export default DS.RESTSerializer.extend({
    extract: function(store, type, payload){
        return payload;
    }
});
