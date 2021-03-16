import { Suite, Case, OnStart, SuiteStartEvent } from '@pebula/touchstone';

const obj: any = { a: 'a', b: { value: true }, c: '23' };

@Suite({ name: 'JS Performance - Optional Chaining', caseInvokeType: 'method' })
class TestSuite {
  paramName: string;
  notParamName: string;

  @OnStart()
  prepareTomClassSerialization(event: SuiteStartEvent): void {
    this.paramName = 'b';
    this.notParamName = 'notAParamName';
  }

  @Case({ name: 'if ("NAME" in OBJ)' })
  literalNameInObject() {
    if ('notAParamName' in obj) {
      return obj['notAParamName'].value;
    } else if ('b' in obj) {
      return obj['b'].value;
    } else {
      return false;
    }
  }

  @Case({ name: 'if (this.NAME in OBJ)' })
  literalRefNameInObject() {
    if (this.notParamName in obj) {
      return obj[this.notParamName].value;
    } else if (this.paramName in obj) {
      return obj[this.paramName].value;
    } else {
      return false;
    }
  }

  @Case({ name: 'optional?chaining' })
  optionalChaining() {
    return obj.notParamName?.value ?? obj.b?.value ?? false;
  }

}
