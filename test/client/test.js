import * as tests from './state';

/* run the tests with cli */
for (var test in tests){
  tests[test].call();
}