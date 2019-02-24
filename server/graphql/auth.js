exports.authenticateUser = async token => {
  return token === 'valid'
    ? {
        name: 'Scott Cashon',
        email: 'scott.cashon@boostlabs.com',
        clientId: 1,
        profilePicturePath: null,
        sessionToken: 'Ep6JsErunzl0Smj96gSxCA=='
      }
    : null;
};
