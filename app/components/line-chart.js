import Em from 'ember';
import ChartDataFormatMixin from 'miner-app/mixins/chart-data-format';
var $ = Em.$;
var LineGraphBaseConfig = Em.Object.extend({
    title: { text: null },
    colors: ['#D97F89', '#5B4D79', '#04668E', '#059AC4', '#F2642C', '#A44025'],
    chart: {
        marginTop: 20,
        marginLeft: 90,
        marginBottom: 30,
        marginRight: 10,
        spacingTop: 0,
        spacingBottom: 30,
        spacingLeft: 0,
        spacingRight: 10,
        height: 230
    },
    legend: {enabled: false},
    credits: { enabled: false },
    xAxis: {
        type: 'datetime',
        title: {text: null},
        format: '%H:%M',
        lineColor: 'transparent',
        gridLineWidth: 0,
        gridLineColor: '#fff',
        tickLength: 0,
        labels: {
            style: {
                color: '#9f9f9f'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Speed (MH)',
            style: {
                fontFamily: "Helvetica",
                fontWeight: 100,
                color: '#777'
            },
            x: 7,
            useHTML: true
        },
        labels: {
            style: {
                color: '#9f9f9f',
                paddingLeft: '5px'
            },
            useHTML: true,
            formatter: function(){
                return $.number(this.value, 2);
            }
        },
        showFirstLabel: false,
        lineWidth: 0,
        gridLineWidth: 0
    },
    plotOptions: {
        line: {
            marker: {
                radius: 3,
                symbol: 'circle'
            }
        }
    },
    tooltip: {
        useHTML: true,
        backgroundColor: 'rgba(160,160,160, 0.85)',
        borderColor: '#aaa',
        borderRadius: 1,
        crosshairs: true,
        positioner: function(w, h, p){
            return {x: p.plotX, y: 0};
        }
    }
});


export default Em.Component.extend(ChartDataFormatMixin, {
    tagName: 'div',
    init: function(){
        this._super();
        this.set('baseConfig', LineGraphBaseConfig.create());
    },
    modelChanged: function(){
        this.renderChart();
    }.observes('model'),
    classNames: ['line-graph-component'],
    chartSelector: function(){
        return '#'+this.get('elementId')+' .line-chart';
    }.property('elementId'),
    prepareChartData: function(){
        if(this.get('key') === 'MINER'){
            return this.formatLineChartMinerMultiSeries();
        }else{
            return this.formatLineChartSingleSeries();
        }
    },
    yAxisInterval: null,

    didInsertElement: function(){
        var self = this;
        self.set('baseConfig.chart.renderTo', self.get('chartSelector'));
        self.set('baseConfig.plotOptions.line.marker.lineColor', self.get('chartColor'));
        this.renderChart();
    },
    renderChart: function(){
        var self = this;
        self.set('chart', null);

        var metric = this.get('metric') ? this.get('metric') : 'MH',
            yAxisLbl = 'Speed ('+metric+')';

        self.set('baseConfig.yAxis.title.text', yAxisLbl);
        var chartParams = {
            colors: self.get('baseConfig.colors'),
            title: self.get('baseConfig.title'),
            chart: self.get('baseConfig.chart'),
            tooltip: self.get('baseConfig.tooltip'),
            credits: self.get('baseConfig.credits'),
            xAxis: self.get('baseConfig.xAxis'),
            yAxis: self.get('baseConfig.yAxis'),
            legend: self.get('baseConfig.legend'),
            plotOptions: self.get('baseConfig.plotOptions')
        };

        if(this.get('key') === 'MINER'){
            var miners = this.prepareChartData();
            chartParams.series = [];
            for(var m in miners){
                var name = m.replace('miner-', '');
                chartParams.series.push({
                    name: name,
                    data: miners[m]
                });
            }
        }else{
            chartParams.series = [{
                color: this.get('chartColor'),
                data: this.prepareChartData()
            }];
        }        if(this.get('yAxisInterval') != null){ chartParams.set('yAxis.tickInterval', this.get('yAxisTickInterval')); }
        var chart = $(this.get('chartSelector')).highcharts(chartParams);
        this.set('chart', chart);
    },
    chartColor: function(){
        return this.get('colors.'+this.get('key'));
    }.property('key'),
    key: null,
    colors: {
        SUMMARY: '#ed6639',
        MINER: '#009999'
    }
});
