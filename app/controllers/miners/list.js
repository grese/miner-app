import Em from 'ember';
var $ = Em.$;
export default Em.ArrayController.extend({
    needs: ['dashboard'],
    isShowInactiveActive: function(){
        return this.get('controllers.dashboard.showInactiveMiners');
    }.property('controllers.dashboard.showInactiveMiners'),
    columns: function(){
        var self = this,
            speedMetric = self.get('controllers.dashboard.speedMetric');
        var idCol = Em.Object.create({
            headerCellText: 'ID',
            contentPath: 'DeviceID',
            columnWidth: 60,
            getFooterCellContent: function(rows){
                return rows.length;
            }
        });
        var nameCol = Em.Object.create({
            headerCellText: 'Name',
            getCellContent: function(row){
                return row.get('Name')+' '+row.get('ID');
            }
        });
        var driverCol = Em.Object.create({
            headerCellText: 'Driver',
            contentPath: 'Driver'
        });
        var enabledCol = Em.Object.create({
            headerCellText: 'Enabled',
            getCellContent: function(row){
                var badgeClass = 'badge',
                    text = '';
                if(row.get('Enabled') === 'Y'){
                    text = 'Yes';
                    badgeClass += ' alert-success';
                }else{
                    text = 'No';
                    badgeClass += ' alert-danger';
                }
                return "<span class='"+badgeClass+"'>"+text+"</span>";
            }
        });
        var statusCol = Em.Object.create({
            headerCellText: 'Status',
            contentPath: 'Status',
            getCellContent: function(row){
                var badgeClass = 'badge';
                if(row.get('Status') === 'Alive'){
                    badgeClass += ' alert-success';
                }else{
                    badgeClass += ' alert-danger';
                }
                return "<span class='"+badgeClass+"'>"+row.get('Status')+"</span>";
            }
        });
        var tempCol = Em.Object.create({
            headerCellText: 'Temp.',
            getCellContent: function(row){
                return new Em.Handlebars.SafeString(row.get('Temperature')+'&deg;');
            }
        });
        var deviceElapsed = Em.Object.create({
            headerCellText: 'Elapsed',
            getCellContent: function(row){
                Em.Logger.debug('ELAPSED:'+row.get('Device Elapsed'));
                return moment.duration(row.get('Device Elapsed'), 'seconds').humanize();
            }
        });

        var accCol = Em.Object.create({
            headerCellText: 'Accepted',
            contentPath: 'Accepted',
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Accepted');
                });
                return total;
            }
        });

        var rejCol = Em.Object.create({
            headerCellText: 'Rejected',
            getCellContent: function(row){
                return row.get('Rejected')+' ('+parseFloat(row.get('Device Rejected%')).toFixed(2)+'%)';
            },
            getFooterCellContent: function(rows){
                var total = 0,
                    totalRate = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Rejected');
                    totalRate += row.get('Device Rejected%');
                });
                return total + ' ('+parseFloat(totalRate).toFixed(2)+'%)';
            }
        });

        var errCol = Em.Object.create({
            headerCellText: 'Errors',
            contentPath: 'Hardware Errors',
            getCellContent: function(row){
                return row.get('Hardware Errors') + ' ('+parseFloat(row.get('Device Hardware%')).toFixed(2)+'%)';
            },
            getFooterCellContent: function(rows){
                var total = 0,
                    totalRate = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Hardware Errors');
                    totalRate += row.get('Device Hardware%');
                });
                return total + ' ('+parseFloat(totalRate).toFixed(2)+'%)';
            }
        });

        var mhsHeader = speedMetric === 'GH' ? 'Gh/s (5sec)' : 'Mh/s (5sec)',
        mh5sCol = Em.Object.create({
            headerCellText: mhsHeader,
            getFooterCellContent: function(rows){
                var total = 0,
                    rowCt = 0;
                $.each(rows, function(idx, row){
                    rowCt++;
                    total += row.get('MHS 5s');
                });

                if(speedMetric === 'GH'){
                    total = total / 1000;
                }
                return parseFloat(total).toFixed(2);
            },
            getCellContent: function(row){
                var avg = row.get('MHS 5s');
                if(speedMetric === 'GH'){
                    avg = avg / 1000;
                }
                return parseFloat(avg).toFixed(2);
            }
        });

        var avgHeader = speedMetric === 'GH' ? 'Avg. Gh/s' : 'Avg. Mh/s',
        avgMhsCol = Em.Object.create({
            headerCellText: avgHeader,
            getCellContent: function(row){
                var avg = row.get('MHS av');
                if(speedMetric === 'GH'){
                    avg = avg / 1000;
                }
                return parseFloat(avg).toFixed(2);
            },
            getFooterCellContent: function(rows){
                var total = 0,
                    rowCt = 0;
                $.each(rows, function(idx, row){
                    rowCt++;
                    total += row.get('MHS av');
                });

                if(speedMetric === 'GH'){
                    total = total / 1000;
                }
                return parseFloat(total).toFixed(2);
            }
        });

        var utilityCol = Em.Object.create({
            headerCellText: 'Utility',
            contentPath: 'Utility',
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Utility');
                });
                return parseFloat(total).toFixed(2);
            }
        });

        var totalHeader = speedMetric === 'GH' ? 'Total Gh' : 'Total Mh',
        totalMhsCol = Em.Object.create({
            headerCellText: totalHeader,
            getCellContent: function(row){
                var total = row.get('Total MH');
                if(speedMetric === 'GH'){
                    total = total / 1000;
                }
                return $.number(total, 2);
            },
            getFooterCellContent: function(rows){
                var total = 0;
                $.each(rows, function(idx, row){
                    total += row.get('Total MH');
                });
                if(speedMetric === 'GH'){
                    total = total / 1000;
                }
                return $.number(total, 2);
            }
        });
        var lastShareCol = Em.Object.create({
            headerCellText: 'Last Share',
            getCellContent: function(row){
                var lastShare = parseInt(row.get('Last Share Time'));
                if(lastShare){
                    return moment.unix(lastShare).format('MM-DD-YYYY hh:mm:ss');
                }else{
                    return 'N/A';
                }
            }
        });
        return [idCol, statusCol, enabledCol, nameCol, driverCol, tempCol, deviceElapsed, accCol,
            rejCol, errCol, mh5sCol, avgMhsCol, utilityCol, totalMhsCol, lastShareCol];
    }.property('controllers.dashboard.speedMetric'),
    rows: Em.computed(function(){
        return this.get('model');
    }).property('model.[]'),
    hasMiners: function(){
        return this.get('model').length > 0;
    }.property('model.[]'),
    filterTypes: {
        DISABLED: {
            filterEnabled: true,
            btnSelector: '#show-disabled-miners'
        }
    },
    actions: {
        toggleFilter: function(type){
            var btn = $(this.filterTypes[type].btnSelector);
            if(this.filterTypes[type].filterEnabled || btn.hasClass('filter-enabled')){
                this.filterTypes[type].filterEnabled = false;
                btn.removeClass('filter-enabled');
            }else{
                this.filterTypes[type].filterEnabled = true;
                if(!btn.hasClass('filter-enabled')){ btn.addClass('filter-enabled'); }
            }
            this.transitionTo('/dashboard');
        },
        toggleShowInactive: function(){
            if(this.get('controllers.dashboard.showInactiveMiners')){
                this.set('controllers.dashboard.showInactiveMiners', false);
            }else{
                this.set('controllers.dashboard.showInactiveMiners', true);
            }
        }
    }
});
