import { BIG_INT_REGEX } from '../utils';

export function booleanDeserialize(v: any) {
  if (typeof v === 'boolean') {
    return v;
  } else {
    if (v === 'true' || v === '1' || v === 1) {
      return true;
    }
    if (v === 'false' || v === '0' || v === 0) {
      return false;
    }
  }
}

export function numberDeserialize(v: any) {
  if (typeof v === 'number') {
    return v;
  } else {
    return +v;
  }
}

export function stringDeserialize(v: any) {
  if (typeof v === 'string') {
    return v;
  } else {
    return `${v}`;
  }
}

export const dateSerialize = (v: Date) => v.toJSON();
export const dateDeserialize = (v: any) => new Date(v);

export const bigIntSerialize = (v: BigInt) => `${v}n`;
export const bigIntDeserialize = (v: any) => {
  if (typeof v === 'number') {
    return BigInt(v)
  } else if (typeof v === 'string') {
    const m = v.match(BIG_INT_REGEX);
    if (!!m) {
      return BigInt(m[1]);
    }
  }
}
