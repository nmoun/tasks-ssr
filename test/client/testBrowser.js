import * as tests from './state';
import { mocha } from 'mocha';

/* run the tests in a browser */
mocha.setup('bdd');
for (var test in tests){
  tests[test].call();
}
mocha.checkLeaks();
mocha.run();