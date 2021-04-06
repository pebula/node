import { Validator } from '../validator';
import { generateValidatorDisposeCode, generateValidatorInitCode } from './codegen/init-dispose-compiler';
import { validateRuntime } from './runtime/validate-runtime';

import {
  checkCircularRef,
  filterIfKeyExists,
  filterIfSkipValidation
} from './codegen/property-code-blocks';
import * as TVC from './codegen/validator-compilers';
import * as TRV from './runtime/runtime-validators';

export class DefaultValidator extends Validator {
  static get instance() { return defaultValidator || new DefaultValidator(); }

  readonly name: string = 'default';

  protected configure(): void {
    this.setFnInitCompiler(generateValidatorInitCode);
    this.setFnDisposeCompiler(generateValidatorDisposeCode);
    this.registerPropertyBlockCompilers();
    this.registerValidatorCompilers();
    this.registerRuntimeValidators();
    super.setValidateRuntime(validateRuntime);
  }

  protected registerPropertyBlockCompilers() {
    this.addPropertyBlockCompilers().setDefaultHandler(filterIfSkipValidation);
    this.addPropertyBlockCompilers().setDefaultHandler(checkCircularRef);

    // this
    //   .addPropertyBlockCompilers(SHARED_PCB.groupValidator)
    //   .addPropertyBlockCompilers(SHARED_PCB.filterIfHasCondition)
    //   .addPropertyBlockCompilers(SHARED_PCB.handleCopyRef)
    //   .addPropertyBlockCompilers(PCB.nonContainerPreAssignLogic)
    //   .addPropertyBlockCompilers().register(SHARED_PCB.checkCircularRef, SHARED_PCB.noop);
  }

  protected registerValidatorCompilers() {
    this.addValidatorCompiler(TVC.number);

    // this.setTypeCompiler('boolean').register(SHARED_TC.passthrough, TC.booleanDeserialize);
    // this.setTypeCompiler('number').register(SHARED_TC.passthrough, TC.numberDeserialize);
    // this.setTypeCompiler('bigInt').register(TC.bigIntSerialize, TC.bigIntDeserialize);
    // this.setTypeCompiler('string').register(SHARED_TC.passthrough, TC.stringDeserialize);
    // this.setTypeCompiler('date').register(TC.dateSerialize, TC.dateDeserialize);
    // this.setTypeCompiler('class').register(TC.classCompiler, TC.classCompiler);
    // this.setTypeCompiler('enum').register(TC.enumSerialize, TC.enumDeserialize);
    // this.setTypeCompiler('literal').register(SHARED_TC.passthrough, TC.literalDeserialize);
    // this.setTypeCompiler('union').register(TC.union, TC.union);

    // this.setTypeCompiler('arrayBuffer').register(TC.arrayBufferSerialize, TC.arrayBufferDeserialize);
    // for (const [k, v] of bufferTypeDefMap) {
    //   if (v !== ArrayBuffer) {
    //     this.setTypeCompiler(k).register(TC.typedArraySerialize, TC.typedArrayDeserialize);
    //   }
    // }

    // this.setTypeCompiler('array').register(TC.array, TC.array);
    // this.setTypeCompiler('set').register(TC.set, TC.set);
    // this.setTypeCompiler('map').register(TC.map, TC.map);
    // this.setTypeCompiler('objectMap').register(TC.objectMap, TC.objectMap);

  }

  protected registerRuntimeValidators() {
    this.addRuntimeValidator(TRV.number);

    // this.setRuntimeConverter<boolean>('boolean').register(SHARED_RTC.passthrough, RTC.booleanDeserialize);
    // this.setRuntimeConverter<number>('number').register(SHARED_RTC.passthrough, RTC.numberDeserialize);
    // this.setRuntimeConverter<bigint>('bigInt').register(RTC.bigIntSerialize, RTC.bigIntDeserialize);
    // this.setRuntimeConverter<string>('string').register(SHARED_RTC.passthrough, RTC.stringDeserialize);
    // this.setRuntimeConverter<Date>('date').register(RTC.dateSerialize, RTC.dateDeserialize);
    // this.setRuntimeConverter<any>('class').register(RTC.classConverter, RTC.classConverter);
    // this.setRuntimeConverter<any>('enum').register(RTC.enumSerialize, RTC.enumDeserialize);
    // this.setRuntimeConverter<any>('literal').register(SHARED_RTC.passthrough, RTC.literalDeserialize);
    // this.setRuntimeConverter<any>('union').register(RTC.union, RTC.union);

    // this.setRuntimeConverter<any>('arrayBuffer').register(RTC.arrayBufferSerialize, RTC.arrayBufferDeserialize);
    // for (const [k, v] of bufferTypeDefMap) {
    //   if (v !== ArrayBuffer) {
    //     this.setRuntimeConverter(k).register(RTC.typedArraySerialize, RTC.typedArrayDeserialize);
    //   }
    // }

    // this.setRuntimeConverter('array').register(RTC.array, RTC.array);
    // this.setRuntimeConverter('set').register(RTC.set, RTC.set);
    // this.setRuntimeConverter('map').register(RTC.map, RTC.map);
    // this.setRuntimeConverter('objectMap').register(RTC.objectMap, RTC.objectMap);
  }
}

export const defaultValidator: DefaultValidator = DefaultValidator.instance;
