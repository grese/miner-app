/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  // bootstrap
  app.import('vendor/bootstrap-yeti.min.css');
  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');

  // bootstrap-select
  app.import(app.bowerDirectory + '/bootstrap-select/dist/css/bootstrap-select.css');
  app.import(app.bowerDirectory + '/bootstrap-select/dist/js/bootstrap-select.js');

  // bootstrap-switch:
  app.import('vendor/bootstrap-switch.css');
  app.import('vendor/bootstrap-switch.js');

  // momentjs
  app.import(app.bowerDirectory + '/moment/moment.js');

  // jquery-ui
  app.import(app.bowerDirectory + '/jquery-ui/jquery-ui.js');

  // jquery-flipcountdown
  app.import(app.bowerDirectory + '/flipcountdown/jquery.flipcountdown.css');
  app.import(app.bowerDirectory + '/flipcountdown/jquery.flipcountdown.js');

  // jquery-cookie:
  app.import(app.bowerDirectory + '/jquery-cookie/jquery.cookie.js');

  // jquery-md5
  app.import(app.bowerDirectory + '/jquery-md5/jquery.md5.js');

  // grese-bootstrap-datetimerangepicker
  app.import(app.bowerDirectory + '/grese-bootstrap-datetimerangepicker/bootstrap-datetimerangepicker.css');
  app.import(app.bowerDirectory + '/grese-bootstrap-datetimerangepicker/bootstrap-datetimerangepicker.js');

  // Highcharts:
  app.import('vendor/highcharts.js');

  // ic-ajax:
  app.import(app.bowerDirectory + '/ic-ajax/dist/globals/main.js');

  // fontawesome
  app.import(app.bowerDirectory + '/fontawesome/css/font-awesome.css');
  var fonts = new Funnel(app.bowerDirectory + '/fontawesome', {
    srcDir: '/fonts',
    include: [
    'fontawesome-webfont.*'
    ],
    destDir: '/fonts'
  });

  return app.toTree(fonts);
};
