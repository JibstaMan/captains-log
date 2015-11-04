/**
 * Dependencies
 */
var suites = require('./suites');
var fixtures = require('./fixtures');
var CaptainsLog = require('../');
var WError = require('verror').WError;

describe('Full stack trace logging', function() {

  before(function newLog() {
    this.log = new CaptainsLog({
      level: 'debug',
      prefix: '',
      prefixes: null
    });
  });

  describe('single stack trace', function() {

    suites.console.checkOutputValue(function customTest(log) {
      var err = new Error('Single error');
      log.error(err);
    },
      'Error: Single error\n' +
      '    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:22:17)\n' +
      '    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n' +
      '    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n' +
      '    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n' +
      '    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n' +
      '    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n' +
      '    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n' +
      '    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n' +
      '    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n' +
      '    at processImmediate [as _immediateCallback] (timers.js:367:17) [Error: Single error]\n'
    );
  });

  describe('wrapped stack trace', function() {

    suites.console.checkOutputValue(function customTest(log) {
        var err = new Error('Single error');
        var err2 = new WError(err, 'Wrapped error for single error');
        log.error(err2);
      },
      "WError: Wrapped error for single error\n" +
      "    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:43:20)\n" +
      "    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n" +
      "    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n" +
      "    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n" +
      "    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n" +
      "    at processImmediate [as _immediateCallback] (timers.js:367:17)\n" +
      "Caused by: Error: Single error\n" +
      "    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:42:19)\n" +
      "    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n" +
      "    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n" +
      "    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n" +
      "    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n" +
      "    at processImmediate [as _immediateCallback] (timers.js:367:17) { [WError: Wrapped error for single error]\n" +
      "  message: 'Wrapped error for single error',\n" +
      "  we_cause: [Error: Single error] }\n"
    );
  });

  describe('Multiple wrapped stack traces', function()
  {
    suites.console.checkOutputValue(function customTest(log)
      {
        var err = new Error('Single error');
        var err2 = new WError(err, 'Wrapped error for single error');
        var err3 = new WError(err2, 'Inception happened.');
        log.error(err3);
      },
      "WError: Inception happened.\n" +
      "    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:79:20)\n" +
      "    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n" +
      "    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n" +
      "    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n" +
      "    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n" +
      "    at processImmediate [as _immediateCallback] (timers.js:367:17)\n" +
      "Caused by: WError: Wrapped error for single error\n" +
      "    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:78:20)\n" +
      "    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n" +
      "    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n" +
      "    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n" +
      "    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n" +
      "    at processImmediate [as _immediateCallback] (timers.js:367:17)\n" +
      "Caused by: Error: Single error\n" +
      "    at customTest (C:\\development\\playtest\\captains-log\\test\\stacktrace.test.js:77:19)\n" +
      "    at Context.<anonymous> (C:\\development\\playtest\\captains-log\\test\\suites\\index.js:52:9)\n" +
      "    at Test.Runnable.run (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runnable.js:221:32)\n" +
      "    at Runner.runTest (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:374:10)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:452:12\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:299:14)\n" +
      "    at C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:309:7\n" +
      "    at next (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:247:23)\n" +
      "    at Immediate._onImmediate (C:\\development\\playtest\\captains-log\\node_modules\\mocha\\lib\\runner.js:276:5)\n" +
      "    at processImmediate [as _immediateCallback] (timers.js:367:17) { [WError: Inception happened.]\n" +
      "  message: 'Inception happened.',\n" +
      "  we_cause: \n" +
      "   { [WError: Wrapped error for single error]\n" +
      "     message: 'Wrapped error for single error',\n" +
      "     we_cause: [Error: Single error] } }\n"
    );
  });

});
