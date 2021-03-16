import { Base } from './base';
import { Block } from './block';
import { Program } from './program';

const PREFIX = '$';

export type ReferenceStorage = { [key: string]: Base<Block<any>> };

export class CoderContext {
  private varId = 0;
  private refStorage: ReferenceStorage = {};

  constructor(public readonly program: Program) { }

  generateVarName(): string {
    return `${PREFIX}${this.nextVarId()}`;
  }

  replaceRefStorage(newRefStorage: ReferenceStorage): void {
    this.refStorage = Object.assign(newRefStorage, this.refStorage);
  }

  saveRef(identifier: string, part: Base<Block<any>>, strict: boolean) {
    if (strict === true && !!this.refStorage[identifier]) {
      throw new Error(`Identifier "${identifier}" exists, please use a different identifier or if you want to override, set "strict" to false`);
    }
    this.refStorage[identifier] = part;
  }

  restoreRef<T extends Base<Block<any>> = Base<Block<any>>>(identifier: string, remove = true): T | undefined {
    const ref = this.refStorage[identifier];
    if (ref && remove) {
      this.refStorage[identifier] = undefined;
    }
    return ref as any;
  }

  private nextVarId(): number {
    return this.varId++;
  }
}
