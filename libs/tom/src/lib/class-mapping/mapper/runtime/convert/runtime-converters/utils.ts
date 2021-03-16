import { MapperTypeConverterHandler } from '../../mapping';

export const BIG_INT_REGEX = /^(-?\d+)n$/;
export const directAssign: MapperTypeConverterHandler = v => v;
