const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require('apollo-server-lambda');

const AIR_ADMIN = 10;
const AIR_USER = 11;

class RequireAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = this.defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const [, , context] = args;
      if (context.user) {
        const roleIds = context.user.role;
        if (!roleIds.includes(AIR_ADMIN) && !roleIds.includes(AIR_USER))
          throw new AuthenticationError('User did not have AIR role');
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new AuthenticationError(
          'You must be signed in to view this resource.'
        );
      }
    };
  }
}

module.exports = RequireAuthDirective;
