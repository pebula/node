import { Suite, Case } from '@pebula/touchstone';

const array = [1, 2, 3, 4, 5];

@Suite({ name: 'JS Performance - Array'})
class TestSuite {

  @Case({ name: 'Array.isArray' })
  isArray() {
    Array.isArray(array);
  }

  @Case({ name: 'instanceof' })
  instanceOf() {
    array instanceof Array;
  }

  @Case({ name: 'duckTape Positive' })
  duckTapingPositive() {
    array.length !== undefined && typeof array !== 'string' && typeof array.pop === 'function';
  }

  @Case({ name: 'duckTape Negative' })
  duckTapingNegative() {
    array.length === undefined || typeof array === 'string' || typeof array.pop !== 'function';
  }

}
