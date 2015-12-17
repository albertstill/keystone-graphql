import { expect } from 'chai';
import { convertListToFields } from '../index';
import keystone from 'keystone';

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
} from '../keystoneGraphQLObjectTypes.js'

const Types = keystone.Field.Types;


describe('#convertListToFields', () => {
  keystone.init();
  keystone.set('cloudinary config', { cloud_name: 'my-cloud', api_key: 'abc',
    api_secret: '123' });

  it('can convert a really basic List that uses GraphQL built in scalars', () => {
    const Post = new keystone.List('Post');

    Post.add({
      title: { type: Types.Text },
      subtitle: { type: String },
    });

    Post.register()

    expect(convertListToFields(Post)).to.deep.equal({
      title: { type: GraphQLString },
      subtitle: { type: GraphQLString },
    })
  });

  it('can convert a more complex List that uses Keystone GraphQL objects', () => {
    const Meetup = new keystone.List('Meetup');

    Meetup.add({
      description: { type: Types.Markdown },
      name: { type: Types.Name, required: true },
      picture: { type: Types.CloudinaryImage },
      where: { type: Types.Location },
      mainContact: { type: Types.Email },
    });

    Meetup.register()

    expect(convertListToFields(Meetup)).to.deep.equal({
      description: { type: KeystoneGraphQLMarkdown },
      name: { type: new GraphQLNonNull(KeystoneGraphQLName) },
      picture: { type: KeystoneGraphQLCloudinaryImage },
      where: { type: KeystoneGraphQLLocation },
      mainContact: { type: KeystoneGraphQLEmail },
    })
  });

  it('wraps types with non-null if they have the required option set', () => {
    const Car = new keystone.List('Car');

    Car.add({
      name: { type: Types.Name, required: true },
      description: { type: Types.Text, required: true, initial: true},
    });

    Car.register()

    expect(convertListToFields(Car)).to.deep.equal({
      name: { type: new GraphQLNonNull(KeystoneGraphQLName) },
      description: { type: new GraphQLNonNull(GraphQLString)},
    })
  });

  it('coverts a List that uses the GQL field config functions', () => {
    const Meeting = new keystone.List('Meeting');

    Meeting.add({
      name: { type: Types.Datetime  },
      cost: { type: Types.Money },
    });

    Meeting.register()

    let result = convertListToFields(Meeting);

    // remove the resolve functions so the assertion can work
    delete result.name.resolve
    delete result.cost.resolve

    expect(result).to.deep.equal({
      name: {
        type: GraphQLString,
        args: {
          format: {
            type: GraphQLString,
            description: 'A formated datetime using Moment.js tokens ' +
              'http://momentjs.com/docs/#/displaying/format/',
          },
        },
      },
      cost: {
        type: GraphQLString,
        args: {
          format: {
            type: GraphQLString,
            description: 'Formats the stored value using http://numeraljs.com/',
          },
        },
      },
    })
  });
});
