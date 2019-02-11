import { mocha } from 'mocha';
import * as tests from './state';

mocha.setup('bdd');
console.log(JSON.stringify(tests))
for (var test in tests){
  tests[test].call();
}

mocha.checkLeaks();
mocha.run();