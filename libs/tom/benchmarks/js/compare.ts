import { Suite, Case, OnStart, SuiteStartEvent } from '@pebula/touchstone';
const S_LITERAL = 'literal';
const S_CLASS = 'class';
const S_String = 'string';
const S_Array = 'array';

const N_LITERAL = 297;
const N_Class = 128254;
const N_String = 256;
const N_Array = 10;

class Any {}
class Literal {}

// Perf test to check the fastest way to compare types.
// Seems like string comparison is the fastest

@Suite({ name: 'JS Performance - RefCompare', caseInvokeType: 'method' })
class TestSuite {
  typeRef: any;
  stringRef: any;
  numberRef: any;
  classRef: any;
  classStringRef: any;
  classNumberRef: any;

  @OnStart()
  prepareTomClassSerialization(event: SuiteStartEvent): void {
    this.typeRef = Array;
    this.stringRef = 'array';
    this.numberRef = 10;
    this.classRef = Any;
    this.classStringRef = 'class';
    this.classNumberRef = 128254;
  }

  @Case({ name: 'Type Ref Compare' })
  typeRefCompare() {
    if (this.typeRef === Boolean) {
      throw new Error('');
    } else if (this.typeRef === Array) {
      if (this.classRef === Literal) {
        throw new Error('');
      } else if (this.classRef === Any) {
        return true;
      } else {
        throw new Error('');
      }
    } else {
      throw new Error('');
    }
  }


  @Case({ name: 'String Compare' })
  stringCompare() {
    if (this.stringRef === 'string') {
      throw new Error('');
    } else if (this.stringRef === 'array') {
      if (this.classStringRef === 'literal') {
        throw new Error('');
      } else if (this.classStringRef === 'class') {
        return true;
      } else {
        throw new Error('');
      }
    } else {
      throw new Error('');
    }
  }

  @Case({ name: 'String Ref Compare' })
  stringRefCompare() {
    if (this.stringRef === S_String) {
      throw new Error('');
    } else if (this.stringRef === S_Array) {
      if (this.classStringRef === S_LITERAL) {
        throw new Error('');
      } else if (this.classStringRef === S_CLASS) {
        return true;
      } else {
        throw new Error('');
      }
    } else {
      throw new Error('');
    }
  }

  @Case({ name: 'Number Compare' })
  numberCompare() {
    if (this.numberRef === 256) {
      throw new Error('');
    } else if (this.numberRef === 10) {
      if (this.classNumberRef === 2321) {
        throw new Error('');
      } else if (this.classNumberRef === 128254) {
        return true;
      } else {
        throw new Error('');
      }
    } else {
      throw new Error('');
    }
  }

  @Case({ name: 'Number Ref Compare' })
  numberRefCompare() {
    if (this.numberRef === N_String) {
      throw new Error('');
    } else if (this.numberRef === N_Array) {
      if (this.classNumberRef === N_LITERAL) {
        throw new Error('');
      } else if (this.classNumberRef === N_Class) {
        return true;
      } else {
        throw new Error('');
      }
    } else {
      throw new Error('');
    }
  }
}
