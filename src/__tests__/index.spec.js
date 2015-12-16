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


describe('convertListToFields', () => {
  keystone.init();
  keystone.set('cloudinary config', { cloud_name: 'my-cloud', api_key: 'abc',
    api_secret: '123' });

  it('can convert a really basic List', () => {
    const Post = new keystone.List('Post');

    Post.add({
      title: { type: Types.Text, required: true, initial: false },
      subtitle: { type: String },
    });

    Post.register()

    expect(convertListToFields(Post)).to.deep.equal({
      title: { type: new GraphQLNonNull(GraphQLString) },
      subtitle: { type: GraphQLString },
    })
  });

  it('can convert a more complex List', () => {
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
});
