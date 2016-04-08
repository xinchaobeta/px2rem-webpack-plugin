.PHONY: clean compile test

clean:
	rm -rf dist

dev: clean
	./node_modules/.bin/babel -w -d ./dist src

build: clean
	./node_modules/.bin/babel -d ./dist src

debug:
	./node_modules/.bin/webpack --config ./test/sample/webpack.config.js

test:
	./node_modules/.bin/mocha --require babel-register ./test/index.js
