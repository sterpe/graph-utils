/* global
  jasmine
*/

require('jasmine-reporters')

var TEST_REPORTS_DIR = process.env.JEST_JUNIT_REPORTS_DIR

jasmine.VERBOSE = !!process.env.JEST_JASMINE_VERBOSE

jasmine.getEnv().addReporter(new jasmine
  .JUnitXmlReporter(TEST_REPORTS_DIR))
