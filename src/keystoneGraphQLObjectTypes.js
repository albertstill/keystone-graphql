import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
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
      type: GraphQLInt,
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

export const KeystoneGraphQLLocation = new GraphQLObjectType({
  name: 'KeystoneLocation',
  fields: {
    name: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
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
      type: GraphQLInt,
    },
    country: {
      type: GraphQLInt,
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
