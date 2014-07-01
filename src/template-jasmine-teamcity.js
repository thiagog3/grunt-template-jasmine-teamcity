"use strict";
var grunt = require('grunt');

var DEFAULT_TEMPLATE = __dirname + '/templates/jasmine-teamcity.html';
var	tcReporter =  __dirname + '/reporters/teamcity-reporter.js';
	
var processMixedInTemplate = function (grunt, task, context) {
	var	template = DEFAULT_TEMPLATE;
	
	// clone context
	var mixedInContext = JSON.parse(JSON.stringify(context));
	
	// transit templateOptions
	mixedInContext.options = context.options.templateOptions || {};
	if (template.process) {
		return template.process(grunt, task, mixedInContext);
	} else {
		return grunt.util._.template(grunt.file.read(template), mixedInContext);
	}
};	

var outputLog = "";	
	
exports.process = function(grunt, task, context)
{
	var mixedInContext = JSON.parse(JSON.stringify(context));	
	task.copyTempFile(tcReporter, 'teamcity-reporter.js');
	
	task.phantomjs.on('teamcity', function (coverage) {
		if(mixedInContext.options.output)
		{
			outputLog += coverage + '\n';
		}
		//grunt.log.writeln(coverage);
	});
	
	task.phantomjs.on('jasmine.jasmineDone', function()
	{
		var endStr = "##teamcity[progressFinish 'Running Jasmine Tests']";
		//grunt.log.writeln(endStr);
		
		if(mixedInContext.options.output)
		{
			outputLog += endStr;
		}
		grunt.file.write(mixedInContext.options.output, outputLog);
		//grunt.log.writeln(outputLog);
	});
	
	return processMixedInTemplate(grunt, task, context);
};