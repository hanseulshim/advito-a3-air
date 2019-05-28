import gql from 'graphql-tag';
import { CONTRACT, PRICING_TERM, DISCOUNT } from '../constants';

export const GET_CONTRACT_LIST = gql`
query contractList($id: Int) {
  contractList(id: $id) {
    ${CONTRACT}
  }
}
`;

export const GET_DIVISION_TYPE_LIST = gql`
  {
    divisionTypeList {
      id
      name
    }
  }
`;

export const GET_CONTRACT_TYPE_LIST = gql`
  {
    contractTypeList {
      id
      name
    }
  }
`;

export const GET_PRICING_TERM_LIST = gql`
query pricingTermList($contractId: Int, $id: Int) {
  pricingTermList(contractId: $contractId, id: $id) {
    ${PRICING_TERM}
  }
}
`;

export const GET_DISCOUNT_LIST = gql`
query discountList($pricingTermId: Int) {
  discountList(pricingTermId: $pricingTermId) {
    ${DISCOUNT}
  }
}
`;

export const GET_DISCOUNT_TYPE_LIST = gql`
  {
    discountTypeList {
      id
      name
    }
  }
`;

export const GET_JOURNEY_TYPE_LIST = gql`
  {
    journeyTypeList {
      id
      name
    }
  }
`;

export const GET_DIRECTION_TYPE_LIST = gql`
  {
    directionTypeList {
      id
      name
    }
  }
`;

export const GET_NOTE_LIST = gql`
  query noteList($parentId: Int) {
    noteList(parentId: $parentId) {
      id
      text
      lastUpdate
      assigneeId
      assigneeName
      assignedToId
      assignedToName
    }
  }
`;
