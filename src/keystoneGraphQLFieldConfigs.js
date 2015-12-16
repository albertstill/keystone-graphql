import {
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

export function date(field) {
  return({
    type: GraphQLString,
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
    type: GraphQLString,
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

export function url(field) {
  return({
    type: GraphQLString,
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
