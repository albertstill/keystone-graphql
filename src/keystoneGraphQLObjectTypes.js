import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

export const KeystoneGraphQLName = new GraphQLObjectType({
  name: 'KeystoneName',
  fields: {
    first: {
      type: GraphQLString,
    },
    last: {
      type: GraphQLString,
    },
    full: {
      type: GraphQLString,
    },
  },
});

export const KeystoneGraphQLCloudinaryImage = new GraphQLObjectType({
  name: 'KeystoneCloudinaryImage',
  fields: {
    public_id: {
      type: GraphQLString,
    },
    version: {
      type: GraphQLFloat,
    },
    signature: {
      type: GraphQLString,
    },
    format: {
      type: GraphQLString,
    },
    resource_type: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
    width: {
      type: GraphQLInt,
    },
    height: {
      type: GraphQLInt,
    },
    secure_url: {
      type: GraphQLString,
    },
  },
});

export const KeystoneGraphQLEmbedly = new GraphQLObjectType({
  name: 'KeystoneEmbedly',
  fields: {
    exists: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    version: { type: GraphQLString },
    description: { type: GraphQLString },
    html: { type: GraphQLString },
    authorName: { type: GraphQLString },
    authorUrl: { type: GraphQLString },
    providerName: { type: GraphQLString },
    providerUrl: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    thumbnailWidth: { type: GraphQLInt },
    thumbnailHeight: { type: GraphQLInt },
  },
});

export const KeystoneGraphQLLocalFile = new GraphQLObjectType({
  name: 'KeystoneLocalFile',
  fields: {
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    size: { type: GraphQLInt },
    filetype: { type: GraphQLString },
    exists: { type: GraphQLBoolean },
  },
});

export const KeystoneGraphQLS3File = new GraphQLObjectType({
  name: 'KeystoneS3File',
  fields: {
    filename: { type: GraphQLString },
    type: { type: GraphQLString },
    filesize: { type: GraphQLInt },
    url: { type: GraphQLString },
    exists: { type: GraphQLBoolean },
  },
});

export const KeystoneGraphQLAzureFile = new GraphQLObjectType({
  name: 'KeystoneAzureFile',
  fields: {
    filename: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    filesize: {
      type: GraphQLInt,
    },
    url: {
      type: GraphQLString,
    },
    etag: {
      type: GraphQLString,
    },
    exists: {
      type: GraphQLBoolean,
    },
  },
});

export const KeystoneGraphQLLocation = new GraphQLObjectType({
  name: 'KeystoneLocation',
  fields: {
    name: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLString,
    },
    street1: {
      type: GraphQLString,
    },
    street2: {
      type: GraphQLString,
    },
    suburb: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    postcode: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    geo: {
      type: new GraphQLList(GraphQLString),
      description: 'An array [longitude, latitude]',
    },
  },
});

export const KeystoneGraphQLMarkdown = new GraphQLObjectType({
  name: 'KeystoneMarkdown',
  fields: {
    md: {
      type: GraphQLString,
      description: 'source markdown text',
    },
    html: {
      type: GraphQLString,
      description: 'generated html code',
    },
  },
});

export const KeystoneGraphQLEmail = new GraphQLObjectType({
  name: 'KeystoneEmail',
  fields: {
    email: {
      type: GraphQLString,
    },
    gravatarUrl: {
      type: GraphQLString,
      args: {
        size: {
          type: GraphQLInt,
          defaultValue: 80,
          description: 'Size of images ranging from 1 to 2048 pixels, square',
        },
        defaultImage: {
          type: GraphQLString,
          defaultValue: 'identicon',
          description: 'default image url encoded href or one of the built ' +
            'in options: 404, mm, identicon, monsterid, wavatar, retro, blank',
        },
        rating: {
          type: GraphQLString,
          defaultValue: 'g',
          description: 'the rating of the image, either rating, g, pg, r or x',
        },
      },
      description: 'Protocol-less Gravatar image request URL',
      resolve: (source, args) =>
        source.gravatarUrl(args.size, args.defaultImage, args.rating),
    },
  },
});
