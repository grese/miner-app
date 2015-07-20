import Em from 'ember';
export default Em.Handlebars.makeBoundHelper(function(sec) {
    var d, h, m, s;
    s = Math.floor(sec);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    var time = { d: d, h: h, m: m, s: s };
    Em.Logger.debug(sec);
    Em.Logger.debug(time);
    if(sec < 60){
        return time.s + 's';
    }else if(sec >= 60 && sec < 3600){
        return time.m + 'm ' + time.s + 's';
    }else if(sec >= 3600 && sec < 86400){
        return time.h + 'h ' + time.m + 'm ' + time.s + 's';
    }else if(sec >= 86400){
        return time.d + 'd ' + time.h + 'h ' + time.m + 'm ' + time.s + 's';
    }
});
