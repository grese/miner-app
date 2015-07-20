import Em from 'ember';
export default Em.Route.extend({
    beforeModel: function(){
        this.doUpdateAPIToken();
    },
    loadingView: null,
    routeDidChange: function(){
        if(!this.get('controller.isLoggedIn')){
            this.transitionTo('login');
        }
    }.observes('currentPath'),
    doUpdateAPIToken: function(){
        var user = this.controllerFor('application').get('user');
        if(user){
            var token = user.token;
            if(token){
                this.store.adapterFor('application').set('headers.apitoken', token);
            }
        }
    },
    actions: {
        updateAPIToken: function(){
            this.doUpdateAPIToken();
        },
        logout: function(){
            this.store.adapterFor('application').logoutUser();
            this.transitionTo('login');
        },
        showAlert: function(params){
            var outlet = params.outlet ? params.outlet : 'alert',
                targetView = params.targetView ? params.targetView : 'application';
            this.controllerFor('elements.alert').setProperties({
                type: params.type,
                message: params.message,
                title: params.title
            });
            this.render('elements.alert', {
                into:  targetView,
                outlet: outlet,
                controller: 'elements.alert'
            });
        },
        showHero: function(params){
            this.controllerFor('elements.hero').setProperties({
                type: params.type,
                message: params.message,
                title: params.title
            });
            this.render('elements.hero', {
                into: 'application',
                outlet: 'hero',
                controller: 'elements.hero'
            });
            window.scrollTo(0, 0);
        },
        loading: function() {
            var view = this.container.lookup('view:loading').append();
            this.router.one('didTransition', view, 'destroy');
        },
        showGlobalLoading: function(){
            var loadingView = this.container.lookup('view:loading').append();
            this.set('loadingView', loadingView);
        },
        hideGlobalLoading: function(){
            this.get('loadingView').destroy();
        },
        reloadPage: function(){
            var currentLoc = window.location.href;
            window.location = currentLoc;
        },
        showWaitScreen: function(config){
            var method = config.get('method'),
                duration = config.get('duration');
            this.controllerFor('elements.please-wait').setProperties({
                method: method,
                duration: duration // milliseconds
            });
            this.render('elements.please-wait', {
                into: 'application',
                controller: 'elements.please-wait'
            });
        }
    }
});
