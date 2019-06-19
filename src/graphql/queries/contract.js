import gql from 'graphql-tag';
import {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL
} from '../constants';

export const GET_CONTRACT_LIST = gql`
{
  contractList {
    ${CONTRACT}
  }
}
`;

export const GET_CONTRACT = gql`
query contract($id: Int!) {
  contract(id: $id) {
    ${CONTRACT}
  }
}
`;

export const GET_SELECTED_CONTRACT = gql`
  {
    selectedContract @client {
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

export const GET_BULK_ACTION_LIST = gql`
  query bulkActionList($parentId: Int!) {
    bulkActionList(parentId: $parentId) {
      id
      name
    }
  }
`;

export const GET_PRICING_TERM_LIST = gql`
query pricingTermList($contractId: Int) {
  pricingTermList(contractId: $contractId) {
    ${PRICING_TERM}
  }
}
`;

export const GET_PRICING_TERM = gql`
query pricingTerm($id: Int!) {
  pricingTerm(id: $id) {
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

export const GET_DISCOUNT = gql`
query discount($id: Int!) {
  discount(id: $id) {
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
  query noteList($parentId: Int, $parentTable: String!) {
    noteList(parentId: $parentId, parentTable: $parentTable) {
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

export const GET_TARGET_TERM_LIST = gql`
query targetTermList($contractId: Int) {
  targetTermList(contractId: $contractId) {
    ${TARGET_TERM}
  }
}
`;

export const GET_TARGET_TERM = gql`
query targetTerm($id: Int!) {
  targetTerm(id: $id) {
    ${TARGET_TERM}
  }
}
`;

export const GET_TARGET_LEVEL_LIST = gql`
query targetLevelList($targetTermId: Int) {
  targetLevelList(targetTermId: $targetTermId) {
    ${TARGET_LEVEL}
  }
}
`;

export const GET_TARGET_LEVEL = gql`
query targetLevel($id: Int!, $targetTermId: Int!) {
  targetLevel(id: $id, targetTermId: $targetTermId) {
    ${TARGET_LEVEL}
  }
}
`;

export const GET_TARGET_TYPE_LIST = gql`
  {
    targetTypeList {
      id
      name
    }
  }
`;

export const GET_INCENTIVE_TYPE_LIST = gql`
  {
    incentiveTypeList {
      id
      name
    }
  }
`;
