import { Serializer } from '../../serializer';

export class EmptySerializer extends Serializer {
  static get instance() { return emptySerializer || new EmptySerializer(); }

  readonly name: string = 'EmptySerializer';

  protected constructor() { super(); }

}

export const emptySerializer: EmptySerializer = EmptySerializer.instance;
