import Em from 'ember';
export default Em.ArrayController.extend({
    hasPoolStats: function(){
        return this.get('content.content').length > 0;
    }.property('content.[]'),
    needs: ['dashboard'],
    columns: function(){
        var idCol = Em.Object.create({
            headerCellText: 'ID',
            contentPath: 'id',
            getFooterCellContent: function(rows){
                return rows.length;
            }
        });
        var urlCol = Em.Object.create({
            headerCellText: 'URL',
            getCellContent: function(row){
                return row.get('URL');
            }
        });
        var userCol = Em.Object.create({
            headerCellText: 'User',
            contentPath: 'User'
        });
        var statusCol = Em.Object.create({
            headerCellText: 'Status',
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
        var stratumCol = Em.Object.create({
            headerCellText: 'Stratum',
            getCellContent: function(row){
                return row.get('Has Stratum') && row.get('Stratum Active');
            }
        });
        var lastShareCol = Em.Object.create({
            headerCellText: 'Last Share',
            getCellContent: function(row){
                var lastShare = parseInt(row.get('Last Share Time'));
                if(lastShare){
                    lastShare = moment.unix(lastShare).format('MM-DD-YYYY hh:mm:ss');
                    return "<div style='min-width: 140px !important;'>"+lastShare+"</div>";
                }else{
                    return 'N/A';
                }
            }
        });
        var bestShareCol = Em.Object.create({
            headerCellText: 'Best Share',
            contentPath: 'Best Share'
        });
        var diffAccCol = Em.Object.create({
            headerCellText: 'Diff Accepted',
            contentPath: 'Difficulty Accepted'
        });
        var diffRejCol = Em.Object.create({
            headerCellText: 'Diff Rejected',
            contentPath: 'Difficulty Rejected'
        });
        var lsdCol = Em.Object.create({
            headerCellText: 'Last Share Diff',
            contentPath: 'Last Share Difficulty'
        });
        var priorityCol = Em.Object.create({
            headerCellText: 'Priority',
            contentPath: 'Priority'
        });
        var quotaCol = Em.Object.create({
            headerCellText: 'Quota',
            contentPath: 'Quota'
        });
        var getworksCol = Em.Object.create({
            headerCellText: 'Getworks',
            contentPath: 'Getworks'
        });
        var accCol = Em.Object.create({
            headerCellText: 'Accepted',
            contentPath: 'Accepted'
        });
        var staleCol = Em.Object.create({
            headerCellText: 'Stale',
            getCellContent: function(row){
                return row.get('Rejected')+' ('+
                    parseFloat(row.get('Pool Rejected%')).toFixed(2) +'%)';
            }
        });
        var rejCol = Em.Object.create({
            headerCellText: 'Rejected',
            getCellContent: function(row){
                return row.get('Stale')+' ('+
                    parseFloat(row.get('Pool Stale%')).toFixed(2) +'%)';
            }
        });
        var worksCol = Em.Object.create({
            headerCellText: 'Works',
            contentPath: 'Works'
        });
        var discardedCol = Em.Object.create({
            headerCellText: 'Discarded',
            contentPath: 'Discarded'
        });
        return [idCol, statusCol, urlCol, userCol, getworksCol, accCol, rejCol, lsdCol, diffAccCol,
            diffRejCol, bestShareCol, worksCol, discardedCol, staleCol, stratumCol, priorityCol,
            quotaCol, lastShareCol];
    }.property('controllers.dashboard.speedMetric'),
    rows: function(){
        return this.get('content');
    }.property('content.[]')
});
