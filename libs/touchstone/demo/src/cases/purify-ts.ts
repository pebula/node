import { Codec, string, number, boolean } from 'purify-ts/Codec';
import { Case } from '@pebula/touchstone';
import { PackageCase, RuntimeValidatorPackageSuite } from './case';

const dataType = Codec.interface({
  number,
  negNumber: number,
  maxNumber: number,
  string,
  longString: string,
  boolean,
  deeplyNested: Codec.interface({
    foo: string,
    num: number,
    bool: boolean,
  }),
});


@RuntimeValidatorPackageSuite()
export class PurifyTsPkg extends PackageCase {

  @Case({ name: 'purify-ts-sync' }) 
  validate() {
    const decodedData = dataType.decode(this.data);

    if (decodedData.isRight()) {
      return decodedData.extract();
    }

    throw new Error('Invalid');
  }
}
