import Em from 'ember';
var $ = Em.$;
export default Em.Mixin.create({
    init: function(){
        this._super();
        var self = this;
        self.updateWindowWidth();
        $(window).resize(function() {
            self.updateWindowWidth();
        });
    },
    updateWindowWidth: function(){
        this.set('windowWidth', $(window).width());
    },
    windowWidth: null,
    isDeviceMobile: function(){
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    isIPhone: function(){
        return /iPhone/i.test(navigator.userAgent);
    }.property('isDeviceMobile'),
    isIPad: function(){
        return /iPad/i.test(navigator.userAgent);
    }.property('isDeviceMobile'),
    isMobile: function(){
        return  this.isDeviceMobile() ||  this.get('windowWidth') < 769;
    }.property('windowWidth', 'isDeviceMobile'),
    isTablet: function(){
        return this.isIPad() || (769 < this.get('windowWidth') < 992);
    }.property('windowWidth', 'isDeviceMobile')
});
