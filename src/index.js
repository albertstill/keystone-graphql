import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

// nested keystone object types
import {
  KeystoneGraphQLMarkdown,
  KeystoneGraphQLName,
  KeystoneGraphQLCloudinaryImage,
  KeystoneGraphQLLocation,
  KeystoneGraphQLEmail,
  KeystoneGraphQLEmbedly,
  KeystoneGraphQLLocalFile,
  KeystoneGraphQLS3File,
  KeystoneGraphQLAzureFile,
} from './keystoneGraphQLObjectTypes'

// functions that generate GraphQLFieldConfig's that include format arguments
import {
  date,
  datetime,
  url,
  money,
  number,
} from './keystoneGraphQLFieldConfigFunctions'

import { conditionalNullWrap } from './utils';

// in the order specified at http://keystonejs.com/docs/database/#fieldtypes
// ignores password
// TODO select to generate Enum and cloudinary underscore methods
let keystoneTypeToGraphQLMap = {
  boolean: GraphQLBoolean,
  color: GraphQLString,
  date: date,
  datetime: datetime,
  email: KeystoneGraphQLEmail,
  html: GraphQLString,
  key: GraphQLString,
  location: KeystoneGraphQLLocation,
  markdown: KeystoneGraphQLMarkdown,
  money: money,
  name: KeystoneGraphQLName,
  number: number,
  text: GraphQLString,
  textarea: GraphQLString,
  url: url,
  azurefile: KeystoneGraphQLAzureFile,
  cloudinaryimage: KeystoneGraphQLCloudinaryImage,
  cloudinaryimages: new GraphQLList(KeystoneGraphQLCloudinaryImage),
  embedly: KeystoneGraphQLEmbedly,
  localfile: KeystoneGraphQLLocalFile,
  s3file: KeystoneGraphQLS3File,
}

export function convertListToFields(list) {
  let fieldConfig = {};
  list.fieldsArray.forEach((field) => {
    const type = keystoneTypeToGraphQLMap[field.type];
    if (type === undefined) {
      return;
    }
    fieldConfig[field.path] = typeof type === 'function' ?
      type(field) : { type: conditionalNullWrap(field, type) }
  });
  return fieldConfig;
}
