import { GraphQLNonNull } from 'graphql';

export function conditionalNullWrap(field, type) {
  return field.options.required === true ? new GraphQLNonNull(type) : type;
}
