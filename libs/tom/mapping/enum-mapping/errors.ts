export function enumMapperSealedError() {
  const error = new Error(`Can not seal an already sealed enum mapper.`);
  error.name = 'EnumMapperSealedError';
  return error;
}
