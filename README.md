Teamcity Reporter template for Jasmine unit tests [![Build Status](https://travis-ci.org/thiagog3/grunt-template-jasmine-teamcity.png?branch=master)](https://travis-ci.org/thiagog3/grunt-template-jasmine-teamcity)
-----------------------------------------

It's a Teamcity Reporter template for uses with grunt-contrib-jasmine template option. It's the best way to integrate Jasmine Tests + GruntJS + TeamCity.

## Installation
By default, this template works only with Jasmine 2.x
```
npm install grunt-template-jasmine-teamcity --save-dev
```

## Sample usage

```js
// Example configuration using a single mode and logging teamcity reporter to a file 
grunt.initConfig({
  connect: {
    test : {
      port : 8000
    }
  },
  jasmine: {
    taskName: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js',
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-teamcity'),
        templateOptions: {
							output: 'jasmine.teamcity.log'
				},
      }
    }
  }
});
```

## Usage with istanbul (coverage) template

```js
//Example configuration using a grunt-template-jasmine-istanbul template
grunt.initConfig({
  connect: {
    test : {
      port : 8000
    }
  },
  jasmine: {
    taskName: {
				src: 'src/**/*.js'
				options: {
					specs: 'spec/*Spec.js',
					template: require("grunt-template-jasmine-istanbul"),
					templateOptions: {
						template: require('grunt-template-jasmine-teamcity'),
						templateOptions: {
							output: 'jasmine.teamcity.log'
						},
						coverage: "tests/coverage/coverage.json",
						report:
						{
							type: ['html'],
							options: 
							{
								dir: "tests/coverage"
							}	
						}
					}
				}
			}
  }
});
```

### Authors / Maintainers

- Thiago Sciotta (@thiagog3)
