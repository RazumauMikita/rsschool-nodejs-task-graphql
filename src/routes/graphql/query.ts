import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MemberTypeId, memberType } from './types/memberType.js';

import { httpErrors } from '@fastify/sensible';
import { postType } from './types/postType.js';
import { UUIDType } from './types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { userType } from './types/userType.js';
import { profileType } from './types/profileType.js';
import { rootMutation } from './mutation.js';

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: async (_, __, context: PrismaClient) => {
        return context.memberType.findMany();
      },
    },

    memberType: {
      type: memberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeId),
        },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        try {
          const memberType = await context.memberType.findUnique({
            where: {
              id: id,
            },
          });
          if (memberType === null) {
            throw httpErrors.notFound();
          }
          return memberType;
        } catch (err) {
          if (err instanceof Error) return new Error(err.message);
        }
      },
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async (_, __, context: PrismaClient) => {
        try {
          return context.post.findMany();
        } catch (err) {
          if (err instanceof Error) return new Error(err.message);
        }
      },
    },

    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        const post = await context.post.findUnique({ where: { id: id } });

        return post;
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve: async (_, __, context: PrismaClient) => {
        try {
          return context.user.findMany();
        } catch (err) {
          if (err instanceof Error) return new Error(err.message);
        }
      },
    },

    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        const user = await context.user.findUnique({ where: { id: id } });
        return user;
      },
    },

    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_, __, context: PrismaClient) => {
        try {
          return context.profile.findMany();
        } catch (err) {
          if (err instanceof Error) return new Error(err.message);
        }
      },
    },

    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context: PrismaClient) => {
        const profile = await context.profile.findUnique({ where: { id: id } });
        return profile;
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
