const DATA_SET = `id
        name
        dateUpdated
        status
        posTrendList {
          id
          countryId
          name
          tickets
          segments
          farePaid
        }
        divisionTrendList {
          id
          divisionId
          name
          tickets
          segments
          farePaid
        }
        importErrorsList {
          id
          countryId
          name
          importedTickets
          errorTickets
          errorRatio
        }`;

module.exports = {
  DATA_SET
};
