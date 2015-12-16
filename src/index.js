import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import {
  KeystoneGraphQLMarkdown,
  KeystoneGraphQLName,
  KeystoneGraphQLCloudinaryImage,
  KeystoneGraphQLLocation,
  KeystoneGraphQLEmail,
} from './keystoneGraphQLObjectTypes.js'


function nonNullWrapCheck(field, type) {
  return field.options.required === true ? new GraphQLNonNull(type) : type;
}

export function convertListToFields(list) {
  let fieldConfig = {};
  list.fieldsArray.forEach((field) => {
    let fieldHash = {};

    switch (field.type) {
    case 'text':
      fieldHash = { type: nonNullWrapCheck(field, GraphQLString) };
      break;
    case 'markdown':
      fieldHash =
        { type: nonNullWrapCheck(field, KeystoneGraphQLMarkdown) };
      break;
    case 'name':
      fieldHash =
        { type: nonNullWrapCheck(field, KeystoneGraphQLName) };
      break;
    case 'cloudinaryimage':
      fieldHash =
        { type: nonNullWrapCheck(field, KeystoneGraphQLCloudinaryImage) };
      break;
    case 'location':
      fieldHash =
        { type: nonNullWrapCheck(field, KeystoneGraphQLLocation) };
      break;
    case 'email':
      fieldHash =
        { type: nonNullWrapCheck(field, KeystoneGraphQLEmail) };
      break;
    default:
      throw new Error('Unreconised field type for `keystone-graphql`')
    }

    fieldConfig[field.path] = fieldHash;
  });
  return fieldConfig;
}
