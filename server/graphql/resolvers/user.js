const CLIENT_ID = 57;

exports.user = {
  Query: {
    userList: async (_, __, { db }) => {
      const userList = await db('blops.advito_user')
        .where('client_id', CLIENT_ID)
        .orWhere('id', 882);
      return userList.map(user => ({
        id: user.id,
        name: `${user.name_first} ${user.name_last}`,
        email: user.email
      }));
    },
    user: (_, __, { user }) => user
  }
};
