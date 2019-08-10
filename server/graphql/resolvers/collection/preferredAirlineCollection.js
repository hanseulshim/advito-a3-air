const { ApolloError } = require('apollo-server-lambda');
const {
  preferredAirlineCollectionList,
  preferenceLevelList,
  airlineGroupAirlineList,
  posList
} = require('../../../data');

exports.preferredAirlineCollection = {
  Query: {
    preferredAirlineCollectionList: async (
      _,
      { clientId = null, projectId = null },
      { db }
    ) =>
      await db('preferredcarriergroup as p')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'updated',
          airlineCount: db.raw(
            `(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`
          ),
          active: db.raw(
            `COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`
          )
        })
        .where('isdeleted', false)
        .andWhere('clientid', clientId),
    preferredAirlineList: async (_, { groupId }, { db }) => {
      const preferredAirlineList = await db('pcgcarrier as p')
        .select({
          id: 'p.id',
          airlineId: 'carrierid',
          name: 'c.name',
          preferenceLevelId: 'preferencelevelid',
          preferenceLevelName: 'l.name_val',
          effectiveStartDate: 'effectivedatestart',
          effectiveEndDate: 'effectivedateend',
          active: db.raw(`TRUE`)
        })
        .leftJoin('carrier as c', 'c.id', 'p.carrierid')
        .leftJoin('lov_lookup as l', 'l.id', 'p.preferencelevelid')
        .where('p.isdeleted', false)
        .andWhere('pcgroupid', groupId)
        .orderBy('p.id');
      const preferredAirlineRequests = preferredAirlineList.map(
        async preferredAirline => {
          const posList = await db('pcgcpointofsale as p')
            .select({
              id: 'p.id',
              locationId: 'p.locationid',
              name: 'l.name',
              code: 'l.code'
            })
            .leftJoin('location as l', 'p.locationid', 'l.id')
            .where('p.pcgcarrierid', preferredAirline.id)
            .andWhere('p.isdeleted', false);
          preferredAirline.posList = posList;
        }
      );
      await Promise.all(preferredAirlineRequests);
      return preferredAirlineList;
    },
    posList: () => posList,
    preferenceLevelList: () => preferenceLevelList
  },
  Mutation: {
    editPreferredAirlineCollection: async (
      _,
      { projectId, id, name, description },
      { db }
    ) => {
      await db.raw(
        `SELECT preferred_carrier_group_update(
            ${id},
            '${name}',
            ${description ? `'${description}'` : null}
          )`
      );
      return await getPreferredAirlineCollection(db, id, projectId);
    },
    deletePreferredAirlineCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT preferred_carrier_group_delete(${id}, ${projectId})`
      );
    },
    togglePreferredAirlineCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT preferred_carrier_group_toggle(${id}, ${projectId})`
      );
    },
    addPreferredAirline: (_, { id, airlineList }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.dateUpdated = new Date();
      airlineList.forEach(airline => {
        const name = airlineGroupAirlineList.filter(
          air => air.id === airline.id
        )[0].name;
        const pos = posList
          .filter(p => airline.posIdList.indexOf(p.id) !== -1)
          .map(p => p.name);
        const preferenceLevel = preferenceLevelList.filter(
          p => p.id === airline.preferenceLevelId
        )[0].name;
        preferredAirlineCollection.airlineList.push({
          id: airline.id,
          name,
          pos,
          preferenceLevel,
          effectiveStartDate: airline.effectiveStartDate,
          effectiveEndDate: airline.effectiveEndDate
            ? airline.effectiveEndDate
            : new Date(253402232400000),
          active: true
        });
      });
      return preferredAirlineCollection;
    },
    editPreferredAirline: (_, { id, airlineList }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.dateUpdated = new Date();
      const airlineListCopy = airlineList.map(airline => {
        const airlineCopyArray = preferredAirlineCollection.airlineList.filter(
          air => air.id === airline.id
        );
        const airlineCopy = airlineCopyArray.length
          ? airlineCopyArray[0]
          : null;
        const name = airlineGroupAirlineList.filter(
          air => air.id === airline.id
        )[0].name;
        const pos = posList
          .filter(p => airline.posIdList.indexOf(p.id) !== -1)
          .map(p => p.name);
        const preferenceLevel = preferenceLevelList.filter(
          p => p.id === airline.preferenceLevelId
        )[0].name;
        return airlineCopy
          ? {
              ...airlineCopy,
              name,
              pos,
              preferenceLevel,
              effectiveStartDate: airline.effectiveStartDate,
              effectiveEndDate: airline.effectiveEndDate
                ? airline.effectiveEndDate
                : new Date(253402232400000)
            }
          : {
              id: airline.id,
              name,
              pos,
              preferenceLevel,
              active: true,
              effectiveStartDate: airline.effectiveStartDate,
              effectiveEndDate: airline.effectiveEndDate
                ? airline.effectiveEndDate
                : new Date(253402232400000)
            };
      });
      preferredAirlineCollection.airlineList = airlineListCopy;
      return preferredAirlineCollection;
    },
    deletePreferredAirline: (_, { id, collectionId }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      const index = preferredAirlineCollection.airlineList.findIndex(
        group => group.id === id
      );
      if (index === -1) {
        throw new ApolloError('Airline Group not found', 400);
      }
      preferredAirlineCollection.airlineList.splice(index, 1);
      return preferredAirlineCollection;
    }
  }
};

const getPreferredAirlineCollection = async (db, id, projectId) => {
  const [preferredAirlineCollection] = await db('preferredcarriergroup as p')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      airlineCount: db.raw(
        `(SELECT COUNT(*) FROM pcgcarrier WHERE pcgroupid = p.id AND isdeleted = FALSE)`
      ),
      active: db.raw(
        `COALESCE((SELECT COUNT(*) FROM projectdataref as pd WHERE pd.datarefid = p.id AND pd.projectid = ${projectId} AND status = 1 AND datareftype = 4) = 1, FALSE)`
      )
    })
    .where('id', id);
  return preferredAirlineCollection;
};
