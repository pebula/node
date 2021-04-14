import { TypeSystem } from '@pebula/tom';
import { Serializer } from '../../serializer';
import { SerializerFactoryOptions } from '../../../serializer-schema';
import { generateSerializerInitCode, generateSerializerDisposeCode } from '../_codegen/init-dispose-compiler';
import * as SHARED_PCB from '../_codegen/property-code-blocks';
import * as SHARED_TC from '../_codegen/type-compilers';
import * as SHARED_TGC from '../_codegen/type-gurad-compilers';
import * as SHARED_RTC from '../_codegen/runtime-converters';
import * as PCB from './codegen/property-code-blocks';
import * as TC from './codegen/type-compilers';
import * as TDC from './codegen/type-detector-compilers';
import * as RTC from './codegen/runtime-converters';
import * as RTTD from './codegen/runtime-type-detector';
import { runtimeTransformSerialize, runtimeTransformDeserialize } from './runtime/runtime-transform';

export interface JsonSerializerFactoryOptions extends SerializerFactoryOptions {
  enumAsLabels?: boolean;
}

export class JsonSerializer extends Serializer<JsonSerializerFactoryOptions> {
  static get instance() { return jsonSerializer || new JsonSerializer(); }

  readonly name: string = 'JSON';

  protected configure(): void {
    this.setFnInitCompiler(generateSerializerInitCode);
    this.setFnDisposeCompiler(generateSerializerDisposeCode);
    this.registerPropertyBlockCompilers();
    this.registerTypeCompilers();
    this.registerTypeDetectorCompilers();
    this.registerRuntimeConverters();
    this.registerRuntimeTypeDetectors();
    super.setRuntimeTransformer(runtimeTransformSerialize, runtimeTransformDeserialize);
  }

  protected registerPropertyBlockCompilers() {
    this.addPropertyBlockCompilers().register(SHARED_PCB.filterIfKeyExists, SHARED_PCB.filterIfKeyExists);
    this
      .addPropertyBlockCompilers(SHARED_PCB.groupValidator)
      .addPropertyBlockCompilers(SHARED_PCB.filterIfHasCondition)
      .addPropertyBlockCompilers(SHARED_PCB.handleCopyRef)
      .addPropertyBlockCompilers(PCB.nonContainerPreAssignLogic)
      .addPropertyBlockCompilers().register(SHARED_PCB.checkCircularRef, SHARED_PCB.noop);
  }

  protected registerTypeCompilers() {
    this.setTypeCompiler('boolean').register(SHARED_TC.passthrough, TC.booleanDeserialize);
    this.setTypeCompiler('number').register(SHARED_TC.passthrough, TC.numberDeserialize);
    this.setTypeCompiler('bigInt').register(TC.bigIntSerialize, TC.bigIntDeserialize);
    this.setTypeCompiler('string').register(SHARED_TC.passthrough, TC.stringDeserialize);
    this.setTypeCompiler('date').register(TC.dateSerialize, TC.dateDeserialize);
    this.setTypeCompiler('class').register(TC.classCompiler, TC.classCompiler);
    this.setTypeCompiler('enum').register(TC.enumSerialize, TC.enumDeserialize);
    this.setTypeCompiler('literal').register(SHARED_TC.passthrough, TC.literalDeserialize);
    this.setTypeCompiler('union').register(TC.union, TC.union);

    this.setTypeCompiler('arrayBuffer').register(TC.arrayBufferSerialize, TC.arrayBufferDeserialize);
    for (const [k, v] of TypeSystem.bufferTypeDefMap) {
      if (v !== ArrayBuffer) {
        this.setTypeCompiler(k).register(TC.typedArraySerialize, TC.typedArrayDeserialize);
      }
    }

    this.setTypeCompiler('array').register(TC.array, TC.array);
    this.setTypeCompiler('tuple').register(TC.tuple, TC.tuple);
    this.setTypeCompiler('set').register(TC.set, TC.set);
    this.setTypeCompiler('map').register(TC.map, TC.map);
    this.setTypeCompiler('objectMap').register(TC.objectMap, TC.objectMap);

  }

  protected registerTypeDetectorCompilers() {
    this.setTypeDetectorCompiler('boolean').register(TDC.boolean, TDC.boolean);
    this.setTypeDetectorCompiler('number').register(TDC.number, TDC.number);
    this.setTypeDetectorCompiler('bigInt').register(TDC.bigIntSerialize, TDC.bigIntDeserialize);
    this.setTypeDetectorCompiler('string').register(TDC.string, TDC.string);
    this.setTypeDetectorCompiler('date').register(TDC.dateSerialize, TDC.dateDeserialize);
    this.setTypeDetectorCompiler('class').register(TDC.classIdentifierSerializer, TDC.classIdentifierDeserializer);
    this.setTypeDetectorCompiler('enum').register(TDC.enumsSerialize, TDC.enumsDeserialize);
    this.setTypeDetectorCompiler('literal').register(TDC.literal, TDC.literal);

    this.setTypeDetectorCompiler('arrayBuffer').register(TDC.arrayBufferSerialize, TDC.arrayBufferDeserialize);
    for (const [k, v] of TypeSystem.bufferTypeDefMap) {
      if (v !== ArrayBuffer) {
        this.setTypeDetectorCompiler(k).register(TDC.typedArraySerialize, TDC.typedArrayDeserialize);
      }
    }

    this.setTypeDetectorCompiler('array').register(TDC.array, TDC.array);
    this.setTypeDetectorCompiler('tuple').register(TDC.tuple, TDC.tuple);
    this.setTypeDetectorCompiler('set').register(TDC.set, TDC.set);
    this.setTypeDetectorCompiler('map').register(TDC.map, TDC.map);
    this.setTypeDetectorCompiler('objectMap').register(TDC.objectMap, TDC.objectMap);

  }
  protected registerRuntimeConverters() {
    this.setRuntimeConverter<boolean>('boolean').register(SHARED_RTC.passthrough, RTC.booleanDeserialize);
    this.setRuntimeConverter<number>('number').register(SHARED_RTC.passthrough, RTC.numberDeserialize);
    this.setRuntimeConverter<bigint>('bigInt').register(RTC.bigIntSerialize, RTC.bigIntDeserialize);
    this.setRuntimeConverter<string>('string').register(SHARED_RTC.passthrough, RTC.stringDeserialize);
    this.setRuntimeConverter<Date>('date').register(RTC.dateSerialize, RTC.dateDeserialize);
    this.setRuntimeConverter<any>('class').register(RTC.classConverter, RTC.classConverter);
    this.setRuntimeConverter<any>('enum').register(RTC.enumSerialize, RTC.enumDeserialize);
    this.setRuntimeConverter<any>('literal').register(SHARED_RTC.passthrough, RTC.literalDeserialize);
    this.setRuntimeConverter<any>('union').register(RTC.union, RTC.union);

    this.setRuntimeConverter<any>('arrayBuffer').register(RTC.arrayBufferSerialize, RTC.arrayBufferDeserialize);
    for (const [k, v] of TypeSystem.bufferTypeDefMap) {
      if (v !== ArrayBuffer) {
        this.setRuntimeConverter(k).register(RTC.typedArraySerialize, RTC.typedArrayDeserialize);
      }
    }

    this.setRuntimeConverter('array').register(RTC.array, RTC.array);
    this.setRuntimeConverter('tuple').register(RTC.tuple, RTC.tuple);
    this.setRuntimeConverter('set').register(RTC.set, RTC.set);
    this.setRuntimeConverter('map').register(RTC.map, RTC.map);
    this.setRuntimeConverter('objectMap').register(RTC.objectMap, RTC.objectMap);
  }

  protected registerRuntimeTypeDetectors() {
    this.setRuntimeTypeDetector<boolean>('boolean').register(RTTD.boolean, RTTD.boolean);
    this.setRuntimeTypeDetector<number>('number').register(RTTD.number, RTTD.number as any);
    this.setRuntimeTypeDetector<bigint>('bigInt').register(RTTD.bigIntSerialize, RTTD.bigIntDeserialize as any);
    this.setRuntimeTypeDetector<any>('string').register(RTTD.string, RTTD.string);
    this.setRuntimeTypeDetector<any>('literal').register(RTTD.literal, RTTD.literal);
    this.setRuntimeTypeDetector<Date>('date').register(RTTD.date, RTTD.date as any);
    this.setRuntimeTypeDetector<any>('enum').register(RTTD.enumSerialize, RTTD.enumDeserialize);
    this.setRuntimeTypeDetector<any>('class').register(RTTD.classIdentifierTypeDetectorSerializer, RTTD.classIdentifierTypeDetectorDeserializer);

    this.setRuntimeTypeDetector('arrayBuffer').register(RTTD.arrayBufferSerialize, RTTD.arrayBufferDeserialize);
    for (const [k, v] of TypeSystem.bufferTypeDefMap) {
      if (v !== ArrayBuffer) {
        this.setRuntimeTypeDetector(k).register(RTTD.typedArraySerialize, RTTD.typedArrayDeserialize);
      }
    }

    this.setRuntimeTypeDetector('array').register(RTTD.array, RTTD.array);
    this.setRuntimeTypeDetector('tuple').register(RTTD.tuple, RTTD.tuple);
    this.setRuntimeTypeDetector('set').register(RTTD.set, RTTD.set);
    this.setRuntimeTypeDetector('map').register(RTTD.map, RTTD.map);
    this.setRuntimeTypeDetector('objectMap').register(RTTD.objectMap, RTTD.objectMap);
  }
}

export const jsonSerializer: JsonSerializer = JsonSerializer.instance;
