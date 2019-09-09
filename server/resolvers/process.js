import { processData } from '../data';

export const process = {
  Query: {
    process: () => process
  },
  Mutation: {
    startProcess: () => {
      processData.processing = true;
      processData.processStartDate = new Date();
      return processData;
    },
    stopProcess: () => {
      processData.processing = false;
      processData.processStartDate = null;
      processData.recentProcessList.push({
        date: new Date(),
        contracts: 5,
        dataSets: 5,
        records: 1234567,
        processDuration: 100,
        status: 1,
        processedBy: 'Scott Cashon'
      });
      return processData;
    }
  }
};
