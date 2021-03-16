import { StringBuilder } from './utils';
import { Block } from './block';
import { ReferenceStorage } from './context';

export class Program<TStore extends ReferenceStorage = ReferenceStorage> extends Block<Program> {
  constructor(refStorage?: TStore) {
    super(null);
    if (refStorage) {
      this.context.replaceRefStorage(refStorage);
    }
  }

  // We don't want to indent in Program
  flush(sb: StringBuilder): void {
    for (const c of this.statements) {
      c.flush(sb);
    }
  }

  generateCode() {
    this.commit();
    this.validate();
    const sb = new StringBuilder();
    this.flush(sb);
    return sb.flush();
  }
}
