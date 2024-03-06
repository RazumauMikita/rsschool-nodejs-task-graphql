import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { profileType } from './profileType.js';
import { postType } from './postType.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'User ID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User name',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'User balance',
    },

    profile: {
      type: profileType,
      resolve: async ({ id }, _args, context) => {
        return context.profile.findUnique({ where: { userId: id } });
      },
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }, _args, context) => {
        return context.post.findMany({
          where: {
            authorId: id,
          },
        });
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async ({ id }, _args, context) => {
        return context.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },

    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async ({ id }, _args, context) => {
        return context.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
  }),
});
