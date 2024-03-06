import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'ID',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Post author ID',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Post title',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Posts content',
    },
  },
});
