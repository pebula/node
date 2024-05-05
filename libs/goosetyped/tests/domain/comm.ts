// tslint:disable: max-classes-per-file
import {
  GtSubDocument, GtResource,
  GtColumn,
  GtDiscriminator,
  GtTimestampCreated,
  GtTimestampUpdated,
  GtIndex,
  GtLocalProp,
} from '../../src/index';

@GtSubDocument({ noId: true })
export class BaseComm extends GtResource() {

  @GtDiscriminator()
  type: string;

  @GtTimestampCreated()
  @GtIndex({ sort: 'desc' })
  createDate: Date;

  @GtTimestampUpdated()
  @GtIndex({ sort: 'desc' })
  updateDate: Date;

  @GtLocalProp()
  token?: string = String(Date.now());
}

@GtSubDocument({ noId: true })
export class EmailComm extends BaseComm {
  @GtColumn()
  email: string;

  @GtLocalProp()
  initValue = String(Date.now());

  constructor(doc?: Partial<EmailComm>) { super(doc); }
}

@GtSubDocument({ noId: true })
export class PhoneComm extends BaseComm {
  @GtColumn()
  phone: string;

  @GtLocalProp()
  initValue = String(Date.now());

  constructor(doc?: Partial<PhoneComm>) {
    super(doc);
  }
}

@GtSubDocument({ noId: true })
export class ResidenceComm extends BaseComm {
  @GtColumn({
    required: true,
  })
  street: string;
  @GtColumn()
  city: string;
  @GtColumn()
  zip: string;
  @GtColumn()
  country: string;

  @GtLocalProp()
  initValue = String(Date.now());

  constructor(doc?: Partial<ResidenceComm>) { super(doc); }
}
