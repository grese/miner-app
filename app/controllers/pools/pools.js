import Em from 'ember';
import DeviceMixin from 'miner-app/mixins/device-mixin';
export default Em.ArrayController.extend(Em.Evented, DeviceMixin,{
    save: function(){
        var promises = this.get('model').map(function(pool){
            if(pool.get('isDirty')){
                return pool.save();
            }
        });
        if(promises.length > 0){
            return Em.RSVP.all(promises);
        }else{
            return null;
        }
    },
    poolsByPriority: function(){
        this.trigger('poolPriorityChanged');
        return this.get('model').sortBy('priority');
    }.property('model.@each.priority'),
    validatePools: function(){
        this.get('model').map(function(pool){
            pool.validate();
        });
    },
    validationErrors: function(){
        var errors = [];
        this.get('model').map(function(pool){
            var errs = pool.get('errors');
            if(errs.name.length > 0){
              errors = errors.concat(errs.name);
            }
            if(errs.url.length > 0){
              errors = errors.concat(errs.url);
            }
        });
        return errors;
    }.property('poolsAreValid'),
    poolsAreValid: function(){
        var valid = true;
        this.get('model').map(function(pool){
            if(!pool.get('isValid')){ valid = false; }
        });
        return valid;
    }.property('model.@each.isValid'),
    hasDirtyPools: function(){
        var has = false;
        this.get('model').map(function(pool){
            if(pool.get('isDirty')){ has = true; }
        });
        return has;
    }.property('model.@each.isDirty'),
    actions: {
        newPool: function(){
            this.store.createRecord('pool', {});
        },
        deletePool: function(pool){
            pool.deleteRecord();
            pool.save();
        },
        increasePriority: function(pool){
            var self = this,
                id = pool.get('id');

            this.get('poolsByPriority').forEach(function(item, idx){
               if(item.get('id') === id){
                   if(idx > 0){
                       var prev = self.get('poolsByPriority')[idx - 1],
                           p = item.get('priority');
                       if(prev){
                           var pp = prev.get('priority');
                           item.set('priority', pp);
                           prev.set('priority', p);
                       }
                       return false;
                   }
                }
            });
        },
        decreasePriority: function(pool){
            var self = this,
                id = pool.get('id'),
                len = this.get('model.content').length;

            this.get('poolsByPriority').forEach(function(item, idx){

                if(item.get('id') === id){
                    if(idx < len){
                        var next = self.get('poolsByPriority')[idx + 1];
                        if(next){
                            var np = next.get('priority'),
                                p = item.get('priority');
                            item.set('priority', np);
                            next.set('priority', p);
                        }
                    }
                    return false;
                }
            });
        }
    }
});
