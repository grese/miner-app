import Em from 'ember';
export default Em.Mixin.create({
    formatLineChartSingleSeries: function(){
        var ctr = 0,
            self = this,
            model = this.get('model');
        return model.map(function(item){
            var date = moment.unix(item.collected),
                dateExists = false;
            if(ctr > 0){
                var dateStr = date.format(self.get('format')),
                    prevDateStr = moment.unix(model[ctr - 1].collected).format(self.get('format'));
                dateExists = (prevDateStr === dateStr);
            }

            var y = parseInt(date.format('YYYY'), 10),
                m = parseInt(date.format('M'), 10) -1,
                d = parseInt(date.format('D'), 10),
                h = parseInt(date.format('h'), 10),
                mm = parseInt(date.format('m'), 10),
                s = parseInt(date.format('s'), 10),
                ss = parseInt(date.format('SSS'), 10);
            m = m >= 0 ? m : 11;

            ctr++;

            if(!dateExists){
                return [Date.UTC(y,m,d,h,mm,s,ss), Math.round(item.value*100)/100];
            }
        });
    },
    formatLineChartMinerMultiSeries: function(){
        var model = this.get('model');
        var miners = {};

        model.map(function(item){
            if(!miners['miner-'+item.deviceName]){
                miners['miner-'+item.deviceName] = Em.A([]);
            }

            var date = moment.unix(parseInt(item.collected)),
                y = parseInt(date.format('YYYY'), 10),
                m = parseInt(date.format('M'), 10) -1,
                d = parseInt(date.format('D'), 10),
                h = parseInt(date.format('h'), 10),
                mm = parseInt(date.format('m'), 10),
                s = parseInt(date.format('s'), 10),
                ss = parseInt(date.format('SSS'), 10);
            m = m >= 0 ? m : 11;

            miners['miner-'+item.deviceName].addObject([Date.UTC(y,m,d,h,mm,s,ss), Math.round(item.value*100)/100]);
        });
        return miners;
    }
});
