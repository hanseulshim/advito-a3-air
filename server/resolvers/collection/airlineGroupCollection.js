export const airlineGroupCollection = {
  Query: {
    airlineGroupCollectionList: async (
      _,
      { clientId = null, projectId = null },
      { db }
    ) =>
      await db('carriergroupcollection as c')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'updated',
          effectiveStartDate: 'startdate',
          effectiveEndDate: 'enddate',
          active: db.raw(
            `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = c.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 3) = 1, FALSE)`
          ),
          airlineGroupCount: db.raw(
            `(SELECT COUNT(*) FROM carriergroup WHERE collectionid = c.id AND isdeleted = FALSE)`
          ),
          standard: 'isstandard'
        })
        .where('isdeleted', false)
        .andWhere(function() {
          this.where('clientid', clientId).orWhere('isstandard', true);
        })
        .orderBy('isstandard', 'desc'),
    airlineGroupCollection: async (_, { id, projectId }, { db }) =>
      await getAirlineGroupCollection(db, id, projectId),
    airlineGroupList: async (_, { collectionId }, { db }) => {
      const airlineGroupList = await db('carriergroup')
        .select({
          id: 'id',
          name: 'name',
          code: 'code',
          standard: 'isstandard',
          effectiveStartDate: 'activefrom',
          effectiveEndDate: 'inactiveon'
        })
        .where('collectionid', collectionId)
        .andWhere('isdeleted', false)
        .orderBy('name');
      const airlineGroupMemberRequests = airlineGroupList.map(
        async airlineGroup => {
          const airlineGroupMemberList = await db('carriergroupmember as c')
            .select({
              id: 'c.id',
              airlineId: 'c.carrierid',
              name: 'c1.name',
              code: 'c1.code',
              effectiveStartDate: 'c.activefrom',
              effectiveEndDate: 'c.inactiveon'
            })
            .leftJoin('carrier as c1', 'c.carrierid', 'c1.id')
            .where('c.carriergroupid', airlineGroup.id)
            .andWhere('c.isdeleted', false)
            .orderBy('c1.name');
          airlineGroup.airlineGroupMemberList = airlineGroupMemberList;
        }
      );
      await Promise.all(airlineGroupMemberRequests);
      return airlineGroupList;
    }
  },
  Mutation: {
    editAirlineGroupCollection: async (
      _,
      {
        projectId,
        id,
        name,
        description,
        effectiveStartDate,
        effectiveEndDate
      },
      { db }
    ) => {
      await db.raw(
        `SELECT carrier_group_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null},
          ${
            effectiveStartDate
              ? `'${new Date(effectiveStartDate).toISOString()}'`
              : null
          },
          ${
            effectiveEndDate
              ? `'${new Date(effectiveEndDate).toISOString()}'`
              : null
          }
        )`
      );
      return await getAirlineGroupCollection(db, id, projectId);
    },
    deleteAirlineGroupCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT carrier_group_collection_delete(${id}, ${projectId})`
      );
    },
    toggleAirlineGroupCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT carrier_group_collection_toggle(${id}, ${projectId})`
      );
    },
    addAirlineGroup: async (
      _,
      {
        collectionId,
        name,
        code,
        effectiveStartDate,
        effectiveEndDate,
        airlineList
      },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT carrier_group_create(${collectionId}, '${name}', '${code}', ${
          effectiveStartDate
            ? `'${new Date(effectiveStartDate).toISOString()}'`
            : null
        },
        ${
          effectiveEndDate
            ? `'${new Date(effectiveEndDate).toISOString()}'`
            : null
        })`
      );
      const [{ carrier_group_create: newId }] = rows;
      const carrierGroupMemberRequests = airlineList.map(
        ({ airlineId, effectiveStartDate, effectiveEndDate }) =>
          db.raw(
            `SELECT carrier_group_member_create(${newId}, ${airlineId}, ${
              effectiveStartDate
                ? `'${new Date(effectiveStartDate).toISOString()}'`
                : null
            },
            ${
              effectiveEndDate
                ? `'${new Date(effectiveEndDate).toISOString()}'`
                : null
            })`
          )
      );
      await Promise.all(carrierGroupMemberRequests);
    },
    editAirlineGroup: async (
      _,
      {
        carrierGroupId,
        name,
        code,
        effectiveStartDate,
        effectiveEndDate,
        airlineList
      },
      { db }
    ) => {
      await db.raw(
        `SELECT carrier_group_update(${carrierGroupId}, '${name}', '${code}', ${
          effectiveStartDate
            ? `'${new Date(effectiveStartDate).toISOString()}'`
            : null
        },
        ${
          effectiveEndDate
            ? `'${new Date(effectiveEndDate).toISOString()}'`
            : null
        })`
      );
      const carrierGroupMemberRequests = airlineList.map(
        ({ id, airlineId, effectiveStartDate, effectiveEndDate }) =>
          db.raw(
            `SELECT carrier_group_member_update(${carrierGroupId}, ${id}, ${airlineId}, ${
              effectiveStartDate
                ? `'${new Date(effectiveStartDate).toISOString()}'`
                : null
            },
            ${
              effectiveEndDate
                ? `'${new Date(effectiveEndDate).toISOString()}'`
                : null
            })`
          )
      );
      await Promise.all(carrierGroupMemberRequests);
    },
    deleteAirlineGroup: async (_, { id }, { db }) => {
      await db.raw(`SELECT carrier_group_delete(${id})`);
    }
  }
};

const getAirlineGroupCollection = async (db, id, projectId) => {
  const [airlineGroupCollection] = await db('carriergroupcollection as c')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      effectiveStartDate: 'startdate',
      effectiveEndDate: 'enddate',
      active: db.raw(
        `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = c.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 3) = 1, FALSE)`
      ),
      airlineGroupCount: db.raw(
        `(SELECT COUNT(*) FROM carriergroup WHERE collectionid = c.id AND isdeleted = FALSE)`
      ),
      standard: 'isstandard'
    })
    .where('id', id);
  return airlineGroupCollection;
};
