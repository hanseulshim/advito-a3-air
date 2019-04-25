const { userList } = require('../../data');

exports.user = {
  Query: {
    userList: () => userList,
    user: (_, __, { user }) => user
  }
};
