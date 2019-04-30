const { process } = require('../../data');

exports.process = {
  Query: {
    process: () => process
  },
  Mutation: {
    startProcess: () => {
      process.processing = true;
      process.processStartDate = new Date();
      return process;
    },
    stopProcess: () => {
      process.processing = false;
      process.processStartDate = null;
      process.recentProcessList.push({
        date: new Date(),
        contracts: 5,
        dataSets: 5,
        records: 1234567,
        processDuration: 100,
        status: 1,
        processedBy: 'Scott Cashon'
      });
      return process;
    }
  }
};
