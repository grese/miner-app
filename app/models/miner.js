import DS from 'ember-data';
var Miner = DS.Model.extend({
    "Model": DS.attr('string'),
    "Kernel": DS.attr('string'),
    "Device Path": DS.attr('string'),
    "DetailID": DS.attr('string'),
    "Driver": DS.attr('string'),
    "DeviceName": DS.attr('string'),
    "DeviceID": DS.attr('string'),
    "ASC": DS.attr('string'),
    "ID": DS.attr('string'),
    "PGA": DS.attr('string'),
    "Name": DS.attr('string'),
    "Enabled": DS.attr('string'),
    "Status": DS.attr('string'),
    "Temperature": DS.attr('string'),
    "MHS av": DS.attr('number'),
    "MHS 5s": DS.attr('number'),
    "MHS 1m": DS.attr('number'),
    "MHS 5m": DS.attr('number'),
    "MHS 15m": DS.attr('number'),
    "Accepted": DS.attr('number'),
    "Rejected": DS.attr('number'),
    "Hardware Errors": DS.attr('number'),
    "Utility": DS.attr('number'),
    "Last Share Pool": DS.attr('string'),
    "Last Share Time": DS.attr('string'),
    "Total MH": DS.attr('number'),
    "Frequency": DS.attr('string'),
    "Diff1 Work": DS.attr('string'),
    "Difficulty Accepted": DS.attr('string'),
    "Difficulty Rejected": DS.attr('string'),
    "Last Share Difficulty": DS.attr('string'),
    "No Device": DS.attr('string'),
    "Last Valid Work": DS.attr('string'),
    "Device Hardware%": DS.attr('string'),
    "Device Rejected%": DS.attr('string'),
    "Device Elapsed": DS.attr('number')
});

Miner.reopen({
    getMHsAv: function(){
        return this.get('MHS av');
    }.property('MHS av'),
    getMH5s: function(){
        return this.get('MHS 5s');
    }.property('MHS 5s'),
    getHardwareErrors: function(){
        return this.get('Hardware Errors');
    }.property('Hardware Errors'),
    getLastSharePool: function(){
        return this.get('Last Share Pool');
    }.property('Last Share Pool'),
    getLastShareTime: function(){
        return this.get('Last Share Time');
    }.property('Last Share Time'),
    getTotalMH: function(){
        return this.get('Total MH');
    }.property('Total MH'),
    getDiff1Work: function(){
        return this.get('Diff1 Work');
    }.property('Diff1 Work'),
    getDifficultyAccepted: function(){
        return this.get('Difficulty Accepted');
    }.property('Difficulty Accepted'),
    getDifficultyRejected: function(){
        return this.get('Difficulty Rejected');
    }.property('Difficulty Rejected'),
    getLastShareDifficulty: function(){
        return this.get('Last Share Difficulty');
    }.property('Last Share Difficulty'),
    getNoDevice: function(){
        return this.get('No Device');
    }.property('No Device'),
    getLastValidWork: function(){
        return this.get('Last Valid Work');
    }.property('Last Valid Work'),
    getDeviceHardwarePercent: function(){
        return this.get('Device Hardware%');
    }.property('Device Hardware%'),
    getDeviceRejectedPercent: function(){
        return this.get('Device Rejected%');
    }.property('Device Rejected%'),
    getDeviceElapsed: function(){
        return this.get('Device Elapsed');
    }.property('Device Elapsed')
});

export default Miner;
