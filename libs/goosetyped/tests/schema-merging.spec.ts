import { initMongoConnection, checkDocumentAfterCreate, checkSubDocumentAfterCreate } from './utils';
// tslint:disable: max-classes-per-file
import {
  GtLocalProp,
  GtResource, GtModel,
  GtDocument, GtSubDocument,
  GtColumn,
  GtDiscriminator,
  GtIndex,
} from '../src/index';


@GtSubDocument({ noId: true })
export class EntityRef extends GtResource() {
 
  @GtIndex({ sort: 'asc' })
  @GtColumn({ required: true })
  refId: string;
  
  @GtColumn({})
  label: string;

  @GtLocalProp()
  token?: string = String(Date.now());

  constructor(doc?: Partial<EntityRef>) { super(doc); }
}

@GtDocument()
export class Recipient extends GtModel() {
  constructor(doc?: Partial<Recipient>) { super(doc); }

  id: string;

  @GtColumn()
  entity?: EntityRef;

  @GtIndex({ sort: 'asc' })
  @GtColumn({ required: true })
  name: string;

  /** Custom tags */
  @GtIndex({ sort: 'asc' })
  @GtColumn({ type: () => String })
  tags?: string[];

  @GtColumn({ default: true })
  active?: boolean;

  @GtDiscriminator()
  type: string;
}

@GtDocument()
export class EmailRecipient extends Recipient {
  @GtColumn({ required: true })
  email: string;
}

@GtDocument()
export class PhysicalRecipient extends Recipient {
  @GtColumn({ required: true })
  address: string;
}

@GtDocument()
export class PickupRecipient extends Recipient {
  @GtColumn({ required: true })
  slot: Date;
}

@GtDocument()
export class Instrucions extends GtModel() {
  constructor(doc?: Partial<Instrucions>) { super(doc); }
  @GtColumn()
  delivery: Recipient;
}

describe('E2E Tests', () => {
  initMongoConnection();

  describe('Schema Merging', () => {

    it('mongoose generated sub document class should reflect the declared class', async () => {
      const entityRef = new Instrucions({
        delivery: new EmailRecipient({
          entity: new EntityRef({
            refId: "a-b-c-d",
            label: "value"  
          }),
          name: "test",
          tags: ["x"],
          active: true,
        })
      })
    });
  });
});
