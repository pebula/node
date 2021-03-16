import { Suite, Case } from '@pebula/touchstone';

const array = [1, 2, 3, 4, 5];

@Suite({ name: 'JS Performance - Loops'})
class TestSuite {

  @Case({ name: 'For Of' })
  forOf() {
    const result = [];
    for (const x of array) {
      result.push(x);
    }
  }

  @Case({ name: 'While' })
  whileLoop() {
    const result = [];
    let l = array.length;
    while(l--) {
      result.push(array[l]);
    }
  }

  @Case({ name: 'While Slice' })
  whileLoopSlice() {
    const result = array.slice();
    let l = result.length;
    while(l--) {

    }
  }

  @Case({ name: 'For Index' })
  forIndex() {
    const result = [];
    for (let i = 0, len = array.length; i < len; i++) {
      result.push(array[i]);
    }
  }

  @Case({ name: 'For Index Slice' })
  forIndexSlice() {
    const result = array.slice();
    for (let i = 0, len = result.length; i < len; i++) {
    }
  }
}
