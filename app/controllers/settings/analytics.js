import Em from 'ember';
export default Em.ObjectController.extend({
    isDataCollectionEnabled: function(){
        if(!this.get('model.value.dataCollectionEnabled')){
            return 'disabled';
        }else{
            return false;
        }
    }.property('model.value.dataCollectionEnabled'),
    selectOptions: [
        {
            label: '15 seconds',
            value: 15
        },
        {
            label: '30 seconds',
            value: 30
        },
        {
            label: '1 minute',
            value: 60
        },
        {
            label: '2 minutes',
            value: 120
        },
        {
            label: '5 minutes',
            value: 300
        }
    ],
    save: function(){
        return this.get('model').save();
    }
});
