import { Serializer } from '../../serializer';
import { generateSerializerInitCode, generateSerializerDisposeCode } from '../_codegen/init-dispose-compiler';
import * as SHARED_PCB from '../_codegen/property-code-blocks';
import * as SHARED_TC from '../_codegen/type-compilers';
import * as SHARED_RTC from '../_codegen/runtime-converters';
import { runtimeTransformSerialize, runtimeTransformDeserialize } from './runtime-transform';

export class PassthroughSerializer extends Serializer {
  static get instance() { return passthroughSerializer || new PassthroughSerializer(); }

  readonly name: string = 'JSON';

  protected configure(): void {
    this.setFnInitCompiler(generateSerializerInitCode);
    this.setFnDisposeCompiler(generateSerializerDisposeCode);
    this.registerPropertyBlockCompilers();
    this.registerTypeCompilers();
    this.registerRuntimeConverters();
    super.setRuntimeTransformer(runtimeTransformSerialize, runtimeTransformDeserialize);
  }

  protected registerPropertyBlockCompilers() {
    this.addPropertyBlockCompilers().register(SHARED_PCB.filterIfKeyExists, SHARED_PCB.filterIfKeyExists);
      this.addPropertyBlockCompilers(SHARED_PCB.groupValidator)
      .addPropertyBlockCompilers(SHARED_PCB.filterIfHasCondition)
      .addPropertyBlockCompilers(SHARED_PCB.handleCopyRef)
  }

  protected registerTypeCompilers() {
    this.setDefaultTypeCompiler().register(SHARED_TC.passthrough, SHARED_TC.passthrough);
  }

  protected registerRuntimeConverters() {
    this.setDefaultRuntimeConverter().register(SHARED_RTC.passthrough, SHARED_RTC.passthrough);
  }
}

export const passthroughSerializer: PassthroughSerializer = PassthroughSerializer.instance;
