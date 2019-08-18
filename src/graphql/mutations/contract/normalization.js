import gql from 'graphql-tag';
import { NORMALIZATION, NORMALIZATION_MARKET } from '../../constants';

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
      ${NORMALIZATION}
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
      ${NORMALIZATION}
    }
  }
`;

export const DELETE_NORMALIZATION = gql`
  mutation deleteNormalization($id: Int!) {
    deleteNormalization(id: $id)
  }
`;

export const CREATE_NORMALIZATION_MARKET = gql`
mutation createNormalizationMarket(
  $normalizationId: Int!
  $marketA: String!
  $marketB: String!
  $farePaid: Float!
  $usageOverride: Float
  $farePullDate: Date!
  $notes: String
  $fareList: [NormalizationFareInput]
) {
  createNormalizationMarket(
    normalizationId: $normalizationId
    marketA: $marketA
    marketB: $marketB
    farePaid: $farePaid
    usageOverride: $usageOverride
    farePullDate: $farePullDate
    notes: $notes
    fareList: $fareList
  ) {
    ${NORMALIZATION_MARKET}
  }
}
`;

export const UPDATE_NORMALIZATION_MARKET = gql`
mutation updateNormalizationMarket(
  $marketId: Int!
  $marketA: String!
  $marketB: String!
  $farePaid: Float!
  $usageOverride: Float
  $farePullDate: Date!
  $notes: String
  $fareList: [NormalizationFareInput]
) {
  updateNormalizationMarket(
    marketId: $marketId
    marketA: $marketA
    marketB: $marketB
    farePaid: $farePaid
    usageOverride: $usageOverride
    farePullDate: $farePullDate
    notes: $notes
    fareList: $fareList
  ) {
    ${NORMALIZATION_MARKET}
  }
}
`;

export const DELETE_NORMALIZATION_MARKET = gql`
  mutation deleteNormalizationMarket($id: Int!) {
    deleteNormalizationMarket(id: $id)
  }
`;
