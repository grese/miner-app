/*
// The startDate & endDate properties of this component are the actual start/end dates.

This component is built on a fork of the bootstrap-datetimepicker.
 http://eonasdan.github.io/bootstrap-datetimepicker/
 */
import Em from 'ember';
var $ = Em.$;
export default Em.Component.extend({
    classNames: ['drp'],
    format: 'MM/DD/YYYY hh:mm A',
    startPicker: null,
    endPicker: null,
    startDate: null,
    endDate: null,
    opens: 'left',
    defaultStartDate: moment().subtract(1, 'hours'),
    defaultEndDate: moment(),
    dateRange: null,
    dateRangeDidChange: function(){
        var dates = this.get('dateRange').split(' - ');
        this.setProperties({
            startDate: moment(dates[0], this.get('format')),
            endDate: moment(dates[1], this.get('format'))
        });
    }.observes('dateRange'),
    datepickerInput: null,
    calendarButton: null,
    didInsertElement: function(){
        var self = this;
        self.setProperties({
            startDate: this.get('defaultStartDate'),
            endDate: this.get('defaultEndDate')
        });
        var $input = $('#'+this.get('elementId')+' input.dtrp-input'),
            picker =  $input.datetimerangepicker(
            {
                format: self.get('format'),
                renderTo: '#'+self.get('elementId'),
                maxDate: moment(),
                minDate: moment().subtract(30, 'days'),
                direction: self.get('opens'),
                defaultStartDate: self.get('defaultStartDate'),
                ranges: self.get('ranges'),
                icons: self.get('icons')
            }
        );
        self.set('picker', picker);
        self.set('datepickerInput', $input);
        self.set('calendarButton', $('#'+this.get('elementId')+' .calendar-button'));
        self.get('calendarButton').on('click', function(){
            self.get('picker').data('DateTimeRangePicker').hide();
        });
        self.updateInputValue();
    },
    updateInputValue: function(){
        var sd = this.get('startDate').format(this.get('format')),
            ed = this.get('endDate').format(this.get('format'));
        this.set('dateRange', sd + ' - ' + ed);
    },
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
    },
    ranges: [
        {
            text: 'Last Hour',
            start: moment().subtract(1, 'hours'),
            end: moment()
        },
        {
            text: 'Last 12 Hours',
            start: moment().subtract(12, 'hours'),
            end: moment()
        },
        {
            text: 'Last 24 Hours',
            start: moment().subtract(24, 'hours'),
            end: moment()
        },
        {
            text: 'Last 7 Days',
            start: moment().subtract(7, 'days'),
            end: moment()
        }
    ]
});
