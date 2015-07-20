import Em from 'ember';
export default Em.Route.extend({
   beforeModel: function(transition){
       if(!this.controllerFor('application').get('isLoggedIn')){
            this.redirectToLogin(transition);
        }
   },
   redirectToLogin: function(transition){
       this.controllerFor('login').set('attemptedTransition', transition);
       this.transitionTo('login');
   },
   actions: {
    error: function(reason, transition){
        if(reason.status === 401){
            Em.Logger.error('<ERROR:> API Authentication Error: ', reason);
            this.redirectToLogin(transition);
        }
    }
   }
});
