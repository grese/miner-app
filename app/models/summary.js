import DS from 'ember-data';
var attr = DS.attr;
var SummaryModel = DS.Model.extend({
    "Elapsed": attr('number'),
    "MHS av": attr('number'),
    "MHS 5s": attr('number'),
    "Found Blocks": attr('number'),
    "Getworks": attr('number'),
    "Accepted": attr('number'),
    "Rejected": attr('number'),
    "Hardware Errors": attr('number'),
    "Utility": attr('number'),
    "Discarded": attr('number'),
    "Stale": attr('number'),
    "Get Failures": attr('number'),
    "Local Work": attr('number'),
    "Remote Failures": attr('number'),
    "Network Blocks": attr('number'),
    "Total MH": attr('number'),
    "Work Utility": attr('number'),
    "Difficulty Accepted": attr('number'),
    "Difficulty Rejected": attr('number'),
    "Difficulty Stale": attr('number'),
    "Best Share": attr('number'),
    "Device Hardware%": attr('number'),
    "Device Rejected%": attr('number'),
    "Pool Rejected%": attr('number'),
    "Pool Stale%": attr('number'),
    "Last getwork": attr('number')
});

SummaryModel.reopen({
    getMHsAv: function(){
        return this.get('MHS av');
    }.property('MHS av'),
    getMHs5s: function(){
        return this.get('MHS 5s');
    }.property('MHS 5s'),
    getFoundBlocks: function(){
        return this.get('Found Blocks');
    }.property('Found Blocks'),
    getHardwareErrors: function(){
        return this.get('Hardware Errors');
    }.property('Hardware Errors'),
    getFailures: function(){
        return this.get('Get Failures');
    }.property('Get Failures'),
    getLocalWork: function(){
        return this.get('Local Work');
    }.property('Local Work'),
    getRemoteFailures: function(){
        return this.get('Remote Failures');
    }.property('Remote Failures'),
    getNetworkBlocks: function(){
        return this.get('Network Blocks');
    }.property('Network Blocks'),
    getTotalMH: function(){
        return this.get('Total MH');
    }.property('Total MH'),
    getWorkUtility: function(){
        return this.get('Work Utility');
    }.property('Work Utility'),
    getDifficultyAccepted: function(){
        return this.get('Difficulty Accepted');
    }.property('Difficulty Accepted'),
    getDifficultyRejected: function(){
        return this.get('Difficulty Rejected');
    }.property('Difficulty Rejected'),
    getDifficultyStale: function(){
        return this.get('Difficulty Stale');
    }.property('Difficulty Stale'),
    getBestShare: function(){
        return this.get('Best Share');
    }.property('Best Share'),
    getDeviceHardwarePercent: function(){
        return this.get('Device Hardware%');
    }.property('Device Hardware%'),
    getDeviceRejectedPercent: function(){
        return this.get('Device Rejected%');
    }.property('Device Rejected%'),
    getPoolRejectedPercent: function(){
        return this.get('Pool Rejected%');
    }.property('Pool Rejected%'),
    getPoolStalePercent: function(){
        return this.get('Pool Stale%');
    }.property('Pool Stale%'),
    getLastGetwork: function(){
        return this.get('Last getwork');
    }.property('Last getwork')
});

export default SummaryModel;
