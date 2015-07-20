import Em from 'ember';
export default Em.Route.extend({
    model: function(){
        return Em.Object.create({
            username: null,
            password: null
        });
    }
});
