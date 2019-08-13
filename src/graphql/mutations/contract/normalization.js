import gql from 'graphql-tag';
import { NORAMLIZATION } from '../../constants';

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
