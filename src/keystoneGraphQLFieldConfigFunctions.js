import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql';

import { conditionalNullWrap } from './utils'

export function date(field) {
  return({
    type: conditionalNullWrap(field, GraphQLString),
    args: {
      format: {
        type: GraphQLString,
        description: 'A formated time using Moment.js tokens ' +
        'http://momentjs.com/docs/#/displaying/format/',
      },
    },
    resolve: (source, args) => {
      if (args.format) {
        return field.format(source, args.format);
      }
      return source.get(field.path);
    },
  });
}

export function datetime(field) {
  return({
    type: conditionalNullWrap(field, GraphQLString),
    args: {
      format: {
        type: GraphQLString,
        description: 'A formated datetime using Moment.js tokens ' +
          'http://momentjs.com/docs/#/displaying/format/',
      },
    },
    resolve: (source, args) => {
      if (args.format) {
        return field.format(source, args.format);
      }
      return source.get(field.path);
    },
  });
}

export function money(field) {
  return({
    type: conditionalNullWrap(field, GraphQLString),
    args: {
      format: {
        type: GraphQLString,
        description: 'Formats the stored value using http://numeraljs.com/',
      },
    },
    resolve: (source, args) => {
      if (args.format) {
        return field.format(source, args.format);
      }
      return source.get(field.path);
    },
  });
}

export function number(field) {
  return({
    type: conditionalNullWrap(field, GraphQLFloat),
    args: {
      format: {
        type: GraphQLString,
        description: 'Formats the stored value using http://numeraljs.com/',
      },
    },
    resolve: (source, args) => {
      if (args.format) {
        return field.format(source, args.format);
      }
      return source.get(field.path);
    },
  });
}

export function url(field) {
  return({
    type: conditionalNullWrap(field, GraphQLString),
    args: {
      format: {
        type: GraphQLBoolean,
        defaultValue: false,
        description: "Pass the URL through the `format Function` option",
      },
    },
    resolve: (source, args) => {
      if (args.format) {
        return field.format(source, args.format);
      }
      return source.get(field.path);
    },
  });
}
