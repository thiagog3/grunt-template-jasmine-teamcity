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
			print("##teamcity[testStarted name='" + escapeTeamcityString(spec.description) + "' captureStandardOutput='true']");
		},

		specDone : function (result) {
			report.specCount++;
			
			if (result.status == "failed") {
				report.failureCount++;
				print("##teamcity[testFailed name='" + escapeTeamcityString(result.description) + "' message='" + escapeTeamcityString(result.status) + "']");
				var resultItems = result.failedExpectations;
				var outPut = "";
				
				for (var i = 0; i < resultItems.length; i++) {
					var resultSpec = resultItems[i];
					
					outPut = outPut  
						+ "\nMESSAGE:=" 
						+ escapeTeamcityString(resultSpec.message) 
						+ " MATCHER:=" 
						+ escapeTeamcityString(resultSpec.matcherName) 
						+ " EXPECTED:=" 
						+ escapeTeamcityString(resultSpec.expected + "") 
						+ " ACTUAL:=" 
						+ escapeTeamcityString(resultSpec.actual + "");
				}
				print("##teamcity[testStdErr name='" + escapeTeamcityString(result.description) + "' out='" + outPut + "']");
			}
			print("##teamcity[testFinished name='" + escapeTeamcityString(result.description) + "']");
		}
	};
	
	function print(out) {
		phantom.sendMessage('teamcity', out);
	};

	function escapeTeamcityString(message) {
		if (!message || message === undefined || message === null) {
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