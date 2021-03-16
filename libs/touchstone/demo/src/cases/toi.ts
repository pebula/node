import * as toi from '@toi/toi';
import { Case } from '@pebula/touchstone';
import { PackageCase, RuntimeValidatorPackageSuite } from './case';

const obj = () => toi.required().and(toi.obj.isplain());
const req = () => toi.required();
const num = () => toi.num.is();
const str = () => toi.str.is();

const isValid = obj().and(
  toi.obj.keys({
    number: req().and(num()),
    negNumber: req().and(num()),
    maxNumber: req().and(num()),
    string: req().and(str()),
    longString: req().and(str()),
    boolean: req().and(toi.bool.is()),
    deeplyNested: obj().and(
      toi.obj.keys({
        foo: req().and(str()),
        num: req().and(num()),
        bool: req().and(toi.bool.is()),
      })
    ),
  })
);

@RuntimeValidatorPackageSuite()
export class ToiPkg extends PackageCase {

  @Case({ name: 'toi-sync' }) 
  validate() {
    return isValid(this.data);
  }
}
