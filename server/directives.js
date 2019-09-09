import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-lambda';

const AIR_ADMIN = 10;
const AIR_USER = 11;

export default class RequireAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = this.defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const [, , context] = args;
      if (context.user) {
        const roleIds = context.user.role;
        if (!roleIds.includes(AIR_ADMIN) && !roleIds.includes(AIR_USER))
          throw new ApolloError('User did not have AIR role', 401);
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new ApolloError(
          'You must be signed in to view this resource.',
          401
        );
      }
    };
  }
}
