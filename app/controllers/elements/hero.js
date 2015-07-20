import Em from 'ember';
export default Em.Controller.extend({
    tagName: 'div',
    iconClass: null,
    title: null,
    type: null,
    message: null,
    getMessage: function(){
        if(this.get('message') == null){
            var type = this.get('type');
            var msg;
            switch(type){
                case 'warning':
                    msg = '[ warning message ]';
                    break;
                case 'danger':
                    msg = '[ error message ]';
                    break;
                case 'info':
                    msg = '[ info message ]';
                    break;
                case 'success':
                    msg = '[ success message ]';
                    break;
                case 'primary':
                    msg = '[ some message ]';
                    break;
                default:
                    msg = '[ default message ]';
                    break;
            }
            return msg;
        }else{
            return this.get('message');
        }
    }.property('type', 'message'),
    getTitle: function(){
        if(this.get('title') == null){
            var type = this.get('type');
            var title;
            switch(type){
                case 'warning':
                    title = 'Warning!';
                    break;
                case 'danger':
                    title = 'Whoops!';
                    break;
                case 'info':
                    title = 'Heads Up!';
                    break;
                case 'success':
                    title = 'Success!';
                    break;
                case 'primary':
                    title = 'F.Y.I.';
                    break;
                default:
                    title = 'Info';
                    break;
            }
            return title;
        }else{
            return this.get('title');
        }
    }.property('title', 'type'),
    getIconClass: function(){
        if(this.get('iconClass') == null){
            var type = this.get('type');
            var icon;
            switch(type){
                case 'warning':
                    icon = 'fa fa-warning';
                    break;
                case 'danger':
                    icon = 'fa fa-times-circle';
                    break;
                case 'info':
                    icon = 'fa fa-info-circle';
                    break;
                case 'success':
                    icon = 'fa fa-check-circle';
                    break;
                case 'primary':
                    icon = 'fa fa-info-circle';
                    break;
                default:
                    icon = 'fa fa-info-circle';
                    break;
            }
            return icon;
        }else{
            return this.get('iconClass');
        }
    }.property('type', 'iconClass'),
    getAlertType: function(){
        return 'alert-'+this.get('type');
    }.property('type')
});
