Teamcity Reporter template for Jasmine unit tests [![Build Status](https://travis-ci.org/cloudchen/grunt-template-jasmine-requirejs.png?branch=master)](https://travis-ci.org/cloudchen/grunt-template-jasmine-requirejs)
-----------------------------------------

## Installation
By default, this template works with Jasmine 2.x
```
npm install grunt-template-jasmine-teamcity --save-dev
```

## Sample usage

```js
// Example configuration using a single requireJS config file
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
        display: 'none',
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js',
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-teamcity')
      }
    }
  }
});
```

### Authors / Maintainers

- Thiago Sciotta (@thiagog3)
