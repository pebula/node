import { StringBuilder } from './utils';
import { Block } from './block';
import { CoderContext } from './context';
import { Program } from './program';

export abstract class Base<TParent extends Block<any>> {
  get parent(): TParent { return this._parent as TParent; }

  protected readonly program: Program;
  protected readonly context: CoderContext;
  protected _parent: Block<any>;

  constructor(parent: TParent) {
    this._parent = parent;
    if (parent) {
      this.program = parent.program;
      this.context = parent.context;
    } else {
      this.program = this as any;
      this.context = new CoderContext(this.program);
    }
  }

  protected static updateParent<T extends Base<any>>(base: T, parent: Block<any>): T {
    base._parent = parent;
    return base;
  }

  use(handler: (c: this) => void) {
    handler(this);
    return this;
  }

  saveRef(identifier: string, strict = true) {
    this.context.saveRef(identifier, this, strict);
    return this;
  }

  abstract commit(): void;
  abstract validate(): void;
  abstract flush(sb: StringBuilder): void;

  toString() {
    this.commit();
    this.validate();
    const sb = new StringBuilder();
    this.flush(sb);
    return sb.toString();
  }
}
