'use strict';

var Gauge = require('gauge');
var webpack = require('webpack');

var gauge;

/**
 * Creates a progress bar for Webpack based on Gauge.
 * @param {(string|Object)} [section=''] Optional "section" to display.  Use
 * with multiple targets (which are run in parallel).  If an `Object`, assumed
 * to be `gaugeOpts`.
 * @param {Object} [gaugeOpts] Any options to be passed into Gauge.
 * @param {stream.Writable} [gaugeOpts.write=process.stderr] Custom stream for
 * Gauge.
 * @see https://www.npmjs.com/package/gauge
 * @returns {webpack.ProgressPlugin}
 */
module.exports = function ProgressBarPlugin (section, gaugeOpts) {
  if (typeof section !== 'string') {
    if (typeof section === 'object') {
      gaugeOpts = section;
    }
    section = '';
  }

  gauge = gauge || new Gauge(gaugeOpts);

  return new webpack.ProgressPlugin(function (completed, subsection) {
    gauge.show({
      section,
      subsection,
      completed
    });
    gauge.pulse(subsection);
  });
};
