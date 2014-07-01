"use strict";
(function () {

	var report = {
		
		started: false,
		finished : false,

		jasmineStarted : function () {
			report.started = true;
			report.specCount = 0;
			report.failureCount = 0;
			print("##teamcity[progressStart 'Running Jasmine Tests']");
		},

		suiteStarted : function (suite) {
			print("##teamcity[testSuiteStarted name='" + escapeTeamcityString(suite.fullName) + "']");
		},

		suiteDone : function (suite) {		
			print("##teamcity[testSuiteFinished name='" + escapeTeamcityString(suite.fullName) + "']");
		},

		specStarted : function (spec) {
			print("##teamcity[testStarted name='" + escapeTeamcityString(spec.description) + "']");
		},

		specDone : function (result) {
			report.specCount++;
			
			if (result.status == "failed") {
				report.failureCount++;
				print("##teamcity[testFailed name='" + escapeTeamcityString(result.description) + "' message='" + escapeTeamcityString(result.status) + "' details='"+ escapeTeamcityString(result.failedExpectations[0].stack) +"']");				
			}
			print("##teamcity[testFinished name='" + escapeTeamcityString(result.description) + "']");
		}
	};
	
	function print(out) {
		phantom.sendMessage('teamcity', out);
	};

	function escapeTeamcityString(message) {
		if (!message) {
			return "";
		}

		return message.replace(/\|/g, "||")
					  .replace(/\'/g, "|'")
					  .replace(/\n/g, "|n")
					  .replace(/\r/g, "|r")
					  .replace(/\u0085/g, "|x")
					  .replace(/\u2028/g, "|l")
					  .replace(/\u2029/g, "|p")
					  .replace(/\[/g, "|[")
					  .replace(/]/g, "|]");
	};
	
	jasmine.getEnv().addReporter(report);

})();	