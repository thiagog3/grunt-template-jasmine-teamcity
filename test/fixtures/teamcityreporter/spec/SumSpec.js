"use strict";

describe('Sum', function(){
	it('Should add two numbers together', function(){
		expect(sum(2,10)).toEqual(12);
	});
	it('Should add two numbers together again', function(){
		expect(sum(2,10)).toEqual(12);
	});
});

describe('Multiply', function(){
	it('Should multiply two numbers together', function(){
		expect(multiply(2,10)).toEqual(20);
	});
	it('Should multiply two numbers together again', function(){
		expect(multiply(2,10)).toEqual(22);
	});
});