import Em from 'ember';
export default Em.Controller.extend({
    type: null,
    dismissable: true,
    autoDismissTimeout: 5000,
    autoDismiss: true,
    alertClass: function(){
        var dismissable = this.get('dismissable') ? ' alert-dismissable' : '';
        switch(this.get('type')){
            case 'success':
                return 'alert-success'+dismissable;
            case 'danger':
                return 'alert-danger'+dismissable;
            case 'info':
                return 'alert-info'+dismissable;
            default:
                return 'alert-warning'+dismissable;
        }
    }.property('type', 'dismissable'),
    alertIcon: function(){
        switch(this.get('type')){
            case 'success':
                return 'fa fa-check-circle';
            case 'danger':
                return 'fa fa-ban';
            case 'info':
                return 'fa fa-info-circle';
            default:
                return 'fa fa-exclamation-circle';
        }
    }.property('type')
});
