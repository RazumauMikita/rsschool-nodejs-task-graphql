import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(MemberTypeId),
      description: 'Member Type ID',
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Discount',
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Posts limit per month',
    },
  }),
});
