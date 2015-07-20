import Em from 'ember';
export default Em.Controller.extend({
    saveInProgress: false,
    actions: {
        saveSettings: function(){
            return true;
        }
    }
});
