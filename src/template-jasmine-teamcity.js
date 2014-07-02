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
	});
	
	task.phantomjs.on('jasmine.jasmineDone', function()
	{
		outputLog += "##teamcity[progressFinish 'Running Jasmine Tests']";
		
		if(mixedInContext.options.output)
		{
			grunt.file.write(mixedInContext.options.output, outputLog);
		}
		
		grunt.log.writeln(outputLog);
	});
	
	return processMixedInTemplate(grunt, task, context);
};