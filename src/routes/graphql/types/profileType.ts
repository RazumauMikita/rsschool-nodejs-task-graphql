import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeId, memberType } from './memberType.js';
import { UUIDType } from './uuid.js';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Profile ID',
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Is user male',
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'User year of birth',
    },

    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
      description: 'Member Type ID',
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'User ID',
    },

    memberType: {
      type: memberType,
      resolve: async ({ memberTypeId }, args, context) => {
        return await context.memberType.findUnique({
          where: {
            id: memberTypeId,
          },
        });
      },
    },
  }),
});
