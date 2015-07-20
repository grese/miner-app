import Em from 'ember';
export default Em.Component.extend({
   tagName: 'span',
   type: 'button',
   size: null,
   color: null,
   active: false,
   disabled: false,
   isLoading: false,
   iconClass: '',
   actionName: null,
   spinnerClass: 'fa fa-spinner fa-spin fa-lg',
   buttonText: 'Click Me',
   _hasAction: function(){
       return this.get('actionName') === null ? false : this.get('actionName');
   }.property('actionName'),
    _activeClass: function(){
        switch(this.get('active')){
            case 'active':
            case true:
                return 'active';
            default:
                return '';
        }
   }.property('active'),
   _disabledAttr: function(){
       switch(this.get('disabled')){
           case 'disabled':
           case true:
               return 'disabled';
           default:
               return false;
       }
   }.property('disabled'),
   _colorClass: function(){
       switch(this.get('color')){
           case 'primary':
           case 'danger':
           case 'success':
           case 'warning':
           case 'info':
           case 'link':
               return 'btn-'+this.get('color');
           default:
               return 'btn-default';
       }
   }.property('color'),
   _sizeClass: function(){
       switch(this.get('size')){
           case 'xs':
           case 'sm':
           case 'lg':
                return 'btn-'+this.get('size');
           default:
               return '';
       }
   }.property('size'),
   actions: {
       sendAction: function(){
           Em.Logger.debug('SENDING ACTION');
           this.sendAction(this.get('actionName'));
           if(this.get('actionName') !== null){
               this.sendAction(this.get('actionName'));
           }else{
               Em.Logger.error('No action name for button...');
           }
       }
   }
});
