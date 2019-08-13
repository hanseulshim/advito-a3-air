exports.normalization = {
  Query: {
    normalizationList: async (_, { discountId }, { db }) =>
      await db('discountnormalisation as n')
        .select({
          id: 'n.id',
          usageFrom: 'n.usagefrom',
          usageTo: 'n.usageto',
          effectiveFrom: 'n.effectivefrom',
          effectiveTo: 'n.effectiveto',
          created: 'n.created',
          createdby: 'n.createdby',
          marketCount: db.raw(`
            (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id)
          `)
        })
        .where('discountid', discountId)
        .andWhere('isdeleted', false),
    normalization: async (_, { id }, { db }) => await getNormalization(db, id)
  },
  Mutation: {
    createNormalization: async (
      _,
      { discountId, usageFrom, usageTo, effectiveFrom, effectiveTo },
      { db, user }
    ) => {
      const { rows } = await db.raw(
        `SELECT discount_normalisation_create(
          ${discountId},
          ${
            new Date(usageFrom).toISOString()
              ? `'${new Date(usageFrom).toISOString()}'`
              : null
          },
          ${
            new Date(usageTo).toISOString()
              ? `'${new Date(usageTo).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveFrom).toISOString()
              ? `'${new Date(effectiveFrom).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveTo).toISOString()
              ? `'${new Date(effectiveTo).toISOString()}'`
              : null
          },
          '${user.name}'
        )`
      );
      const [{ discount_normalisation_create: id }] = rows;
      return await getNormalization(db, id);
    },
    updateNormalization: async (
      _,
      { id, usageFrom, usageTo, effectiveFrom, effectiveTo },
      { db, user }
    ) => {
      await db.raw(
        `SELECT discount_normalisation_update(
          ${id},
          ${
            new Date(usageFrom).toISOString()
              ? `'${new Date(usageFrom).toISOString()}'`
              : null
          },
          ${
            new Date(usageTo).toISOString()
              ? `'${new Date(usageTo).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveFrom).toISOString()
              ? `'${new Date(effectiveFrom).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveTo).toISOString()
              ? `'${new Date(effectiveTo).toISOString()}'`
              : null
          },
          '${user.name}'
        )`
      );
      return await getNormalization(db, id);
    },
    deleteNormalization: async (_, { id }, { db }) => {
      await db.raw(`SELECT discount_normalisation_delete(${id})`);
      return id;
    }
  }
};

const getNormalization = async (db, id) => {
  const [normalization] = await db('discountnormalisation as n')
    .select({
      id: 'n.id',
      usageFrom: 'n.usagefrom',
      usageTo: 'n.usageto',
      effectiveFrom: 'n.effectivefrom',
      effectiveTo: 'n.effectiveto',
      created: 'n.created',
      createdby: 'n.createdby',
      marketCount: db.raw(`
      (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id)
    `)
    })
    .where('id', id);
  return normalization;
};
