/**
 * CRUD service for contracts
 */
class ContractService {
  /**
   * Constructs a ContractService
   * @param {object} knex - Knex client used for database connections.
   */
  constructor(knex) {
    this.knex = knex;
  }

  /**
   * @return {object[]} List of all contracts that are not deleted.
   */
  async getAll() {
    const knex = this.knex;
    const rows = await knex('contract').where('is_deleted', false);
    return rows.map(this._mapRowToContract);
  }

  /**
   * @param {object} contract To get pricing term total for.
   * @return {number} Pricing term total of the contract.
   */
  async getPricingTermTotal(contract) {
    const knex = this.knex;
    const row = await knex('pricing_term')
      .count('*')
      .where('contract_id', contract.id)
      .first();
    return row.count;
  }

  /**
   * @param {object} contract To get target term total for.
   * @return {number} Target term total of the contract.
   */
  async getTargetTermTotal(contract) {
    return 0;
  }

  /**
   * Gets type of this contract
   * @param {object} contract Contract to get type of
   */
  async getType(contract) {
    const row = await this.knex('contract_type')
      .where('id', contract.typeId)
      .first();
    return {
      id: row.id,
      name: row.name
    };
  }

  /**
   * Gets point of sale list for a given contract.
   * @param {contract} contract Contract to get point of sale list for
   */
  async getPointOfSaleList(contract) {
    const rows = await this.knex
      .select('geography.code')
      .from('contract')
      .innerJoin(
        'contract_point_of_sale_link',
        'contract_point_of_sale_link.contract_id',
        'contract.id'
      )
      .innerJoin(
        'geography',
        'geography.id',
        'contract_point_of_sale_link.geography_id'
      )
      .where('contract.id', contract.id);
    return rows.map(row => row.code);
  }

  /**
   * Gets point of origin list for a given contract.
   * @param {contract} contract Contract to get point of origin list for
   */
  async getPointOfOriginList(contract) {
    const rows = await this.knex
      .select('geography.code')
      .from('contract')
      .innerJoin(
        'contract_point_of_origin_link',
        'contract_point_of_origin_link.contract_id',
        'contract.id'
      )
      .innerJoin(
        'geography',
        'geography.id',
        'contract_point_of_origin_link.geography_id'
      )
      .where('contract.id', contract.id);
    return rows.map(row => row.code);
  }

  /**
   * Creates a contract in the database.
   * @param {object} contract to insert.
   */
  async create(contract) {
    const rows = await this.knex('contract')
      .insert(this._mapContractToRow(contract))
      .returning('*');
    const row = rows[0];
    return this._mapRowToContract(row);
  }

  /**
   * Gets contract by id.
   * @param {id} id ID of contract to get.
   */
  async get(id) {
    const row = await this.knex('contract')
      .where('id', id)
      .where('is_deleted', false)
      .first();
    return row ? this._mapRowToContract(row) : null;
  }

  /**
   * Copies and creates a new contract.
   * @param {object} contract Contract to copy.
   * @param {string} newName New name of contract.
   */
  async copy(contract, newName) {
    // Copies main table
    const copiedContract = Object.assign({}, contract);
    copiedContract.name = newName;
    const dbContract = this._mapContractToRow(copiedContract);
    const rows = await this.knex('contract')
      .insert(dbContract)
      .returning('*');
    const newContract = rows[0];

    // Gets existing secondary contract data
    const airlineLinks = await this.knex('contract_airline_link').where(
      'contract_id',
      contract.id
    );
    const pointOfOrigins = await this.knex(
      'contract_point_of_origin_link'
    ).where('contract_id', contract.id);
    const pointOfSales = await this.knex('contract_point_of_sale_link').where(
      'contract_id',
      contract.id
    );

    // Inserts copies secondary contract data
    await this.knex('contract_airline_link').insert(
      airlineLinks.map(link => ({
        contract_id: newContract.id,
        airline_id: link.airline_id
      }))
    );
    await this.knex('contract_point_of_origin_link').insert(
      pointOfOrigins.map(link => ({
        contract_id: newContract.id,
        geography_id: link.geography_id
      }))
    );
    await this.knex('contract_point_of_sale_link').insert(
      pointOfSales.map(link => ({
        contract_id: newContract.id,
        geography_id: link.geography_id
      }))
    );

    // Returns mapped contract inserted
    return this._mapRowToContract(newContract);
  }

  /**
   * Edits the contents of a contract
   * @param {number} id ID of the contract to edit.
   * @param {object} contract Edits an existing contract.
   */
  async edit(id, contract) {
    const contractDB = this._mapContractToRow(contract);
    const rows = await this.knex('contract')
      .where('id', id)
      .update(contractDB)
      .returning('*');
    const row = rows[0];
    return this._mapRowToContract(row);
  }

  /**
   * Deletes a given contract
   * @param {number} id of the contract to delete.
   */
  async delete(id) {
    await this.knex('contract')
      .update({ is_deleted: true })
      .where('id', id);
  }

  /**
   * Gets airline list for a given contract.
   * @param {contract} contract Contract to get airline list for
   */
  async getAirlineList(contract) {
    const rows = await this.knex
      .select('airline.code')
      .from('contract')
      .innerJoin(
        'contract_airline_link',
        'contract_airline_link.contract_id',
        'contract.id'
      )
      .innerJoin('airline', 'airline.id', 'contract_airline_link.airline_id')
      .where('contract.id', contract.id);
    return rows.map(row => row.code);
  }

  /**
   * Converts database row to a Contract instance
   * @param {object} row Database row
   */
  _mapRowToContract(row) {
    return {
      id: row.id,
      projectId: row.project_id,
      typeId: row.contract_type_id,
      name: row.name,
      description: row.description,
      division: row.division,
      round: row.round,
      effectiveStartDate: row.effective_from,
      effectiveEndDate: row.effective_to,
      qc: row.qc,
      isDeleted: row.is_deleted
    };
  }

  /**
   * Converts Contract instance into a db row.
   * @param {object} contract Contract to map to a db row.
   */
  _mapContractToRow(contract) {
    return {
      project_id: contract.projectId,
      contract_type_id: contract.typeId,
      name: contract.name,
      description: contract.description,
      division: contract.division,
      round: contract.round,
      effective_from: new Date(contract.effectiveStartDate),
      effective_to: contract.effectiveEndDate
        ? new Date(contract.effectiveEndDate)
        : undefined,
      qc: contract.qc ? contract.qc : 1.0,
      is_deleted: contract.is_deleted
    };
  }
}

module.exports.ContractService = ContractService;
