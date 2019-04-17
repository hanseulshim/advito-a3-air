import gql from 'graphql-tag';

export const CREATE_CONTRACT = gql`
  mutation createContract(
    $name: String!
    $typeId: Int!
    $round: Int
    $effectiveStartDate: Date!
    $effectiveEndDate: Date
    $description: String
    $division: String
  ) {
    createContract(
      name: $name
      typeId: $typeId
      round: $round
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      description: $description
      division: $division
    ) {
      id
      name
      type
      description
      round
      effectiveStartDate
      effectiveEndDate
      qc
      pricingTermTotal
      targetTermTotal
      pointOfSaleList
      pointOfOriginList
      airlineList
    }
  }
`;

export const COPY_CONTRACT = gql`
  mutation copyContract($id: Int!, $name: String!) {
    copyContract(id: $id, name: $name) {
      id
      name
      type
      description
      round
      effectiveStartDate
      effectiveEndDate
      qc
      pricingTermTotal
      targetTermTotal
      pointOfSaleList
      pointOfOriginList
      airlineList
    }
  }
`;

export const EDIT_CONTRACT = gql`
  mutation editContract(
    $id: Int!
    $name: String!
    $typeId: Int!
    $round: Int
    $effectiveStartDate: Date!
    $effectiveEndDate: Date
    $description: String
    $division: String
  ) {
    editContract(
      id: $id
      name: $name
      typeId: $typeId
      round: $round
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      description: $description
      division: $division
    ) {
      id
      name
      type
      description
      round
      effectiveStartDate
      effectiveEndDate
      qc
      pricingTermTotal
      targetTermTotal
      pointOfSaleList
      pointOfOriginList
      airlineList
    }
  }
`;

export const DELETE_CONTRACT = gql`
  mutation deleteContract($id: Int!) {
    deleteContract(id: $id)
  }
`;

export const CREATE_PRICING_TERM = gql`
  mutation createPricingTerm($name: String!, $ignore: Boolean!) {
    createPricingTerm(name: $name, ignore: $ignore) {
      id
      contractOrder
      appliedOrder
      name
      effectiveStartDate
      effectiveEndDate
      qc
      discountList
      pointOfSaleList
      pointOfOriginList
      airlineList
      note
      ignore
    }
  }
`;

export const COPY_PRICING_TERM = gql`
  mutation copyPricingTerm($id: Int!, $name: String!, $ignore: Boolean!) {
    copyPricingTerm(id: $id, name: $name, ignore: $ignore) {
      id
      contractOrder
      appliedOrder
      name
      effectiveStartDate
      effectiveEndDate
      qc
      discountList
      pointOfSaleList
      pointOfOriginList
      airlineList
      note
      ignore
    }
  }
`;

export const EDIT_PRICING_TERM = gql`
  mutation editPricingTerm($id: Int!, $name: String!, $ignore: Boolean!) {
    editPricingTerm(id: $id, name: $name, ignore: $ignore) {
      id
      contractOrder
      appliedOrder
      name
      effectiveStartDate
      effectiveEndDate
      qc
      discountList
      pointOfSaleList
      pointOfOriginList
      airlineList
      note
      ignore
    }
  }
`;

export const DELETE_PRICING_TERMS = gql`
  mutation deletePricingTerms($idList: [Int]!) {
    deletePricingTerms(idList: $idList)
  }
`;
