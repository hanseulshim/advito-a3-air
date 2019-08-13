import gql from 'graphql-tag';
import { NORAMLIZATION, NORAMLIZATION_MARKET } from '../../constants';

export const CREATE_NORMALIZATION = gql`
  mutation createNormalization(
    $discountId: Int!
    $usageFrom: Date!
    $usageTo: Date!
    $effectiveFrom: Date!
    $effectiveTo: Date!
  ) {
    createNormalization(
      discountId: $discountId
      usageFrom: $usageFrom
      usageTo: $usageTo
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
    ) {
      ${NORAMLIZATION}
    }
  }
`;

export const UPDATE_NORMALIZATION = gql`
  mutation updateNormalization(
    $id: Int!
    $usageFrom: Date!
    $usageTo: Date!
    $effectiveFrom: Date!
    $effectiveTo: Date!
  ) {
    updateNormalization(
      id: $id
      usageFrom: $usageFrom
      usageTo: $usageTo
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
    ) {
      ${NORAMLIZATION}
    }
  }
`;

export const DELETE_NORMALIZATION = gql`
  mutation deleteNormalization($id: Int!) {
    deleteNormalization(id: $id)
  }
`;

export const CREATE_NORMALIZATION_MARKET = gql`
mutation createNormalization(
  $normalizationId: Int!
  $marketA: String!
  $marketB: String!
  $farePaid: Float!
  $usageOverride: Float
  $farePullDate: Date!
  $notes: String
  $fareList: [NormalizationFareInput]
) {
  createNormalization(
    normalizationId: $normalizationId
    marketA: $marketA
    marketB: $marketB
    farePaid: $farePaid
    usageOverride: $usageOverride
    farePullDate: $farePullDate
    notes: $notes
    fareList: $fareList
  ) {
    ${NORAMLIZATION_MARKET}
  }
}
`;

export const UPDATE_NORMALIZATION_MARKET = gql`
mutation updateNormalization(
  $marketId: Int!
  $marketA: String!
  $marketB: String!
  $farePaid: Float!
  $usageOverride: Float
  $farePullDate: Date!
  $notes: String
  $fareList: [NormalizationFareInput]
) {
  updateNormalization(
    marketId: $marketId
    marketA: $marketA
    marketB: $marketB
    farePaid: $farePaid
    usageOverride: $usageOverride
    farePullDate: $farePullDate
    notes: $notes
    fareList: $fareList
  ) {
    ${NORAMLIZATION_MARKET}
  }
}
`;

export const DELETE_NORMALIZATION_MARKET = gql`
  mutation deleteNormalizationMarket($id: Int!) {
    deleteNormalizationMarket(id: $id)
  }
`;
