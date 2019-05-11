import gql from 'graphql-tag';
import {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL,
  NOTE
} from '../constants';

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
      ${CONTRACT}
    }
  }
`;

export const COPY_CONTRACT = gql`
  mutation copyContract($id: Int!, $name: String!) {
    copyContract(id: $id, name: $name) {
      ${CONTRACT}
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
      ${CONTRACT}
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
      ${PRICING_TERM}
    }
  }
`;

export const COPY_PRICING_TERM = gql`
  mutation copyPricingTerm($id: Int!, $name: String!, $ignore: Boolean!) {
    copyPricingTerm(id: $id, name: $name, ignore: $ignore) {
      ${PRICING_TERM}
    }
  }
`;

export const EDIT_PRICING_TERM = gql`
  mutation editPricingTerm($id: Int!, $name: String!, $ignore: Boolean!) {
    editPricingTerm(id: $id, name: $name, ignore: $ignore) {
      ${PRICING_TERM}
    }
  }
`;

export const TOGGLE_PRICING_TERM_QC = gql`
  mutation togglePricingTermQC($id: Int!) {
    togglePricingTermQC(id: $id) {
      ${PRICING_TERM}
    }
  }
`;

export const DELETE_PRICING_TERMS = gql`
  mutation deletePricingTerms($idList: [Int]!) {
    deletePricingTerms(idList: $idList)
  }
`;

export const CREATE_DISCOUNT = gql`
  mutation createDiscount(
    $pricingTermId: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    createDiscount(
      pricingTermId: $pricingTermId
      name: $name
      discountTypeId: $discountTypeId
      discountValue: $discountValue
      journeyTypeId: $journeyTypeId
      directionTypeId: $directionTypeId
    ) {
      ${DISCOUNT}
    }
  }
`;

export const COPY_DISCOUNT = gql`
  mutation copyDiscount(
    $id: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    copyDiscount(
      id: $id
      name: $name
      discountTypeId: $discountTypeId
      discountValue: $discountValue
      journeyTypeId: $journeyTypeId
      directionTypeId: $directionTypeId
    ) {
      ${DISCOUNT}
    }
  }
`;

export const EDIT_DISCOUNT = gql`
  mutation editDiscount(
    $id: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    editDiscount(
      id: $id
      name: $name
      discountTypeId: $discountTypeId
      discountValue: $discountValue
      journeyTypeId: $journeyTypeId
      directionTypeId: $directionTypeId
    ) {
      ${DISCOUNT}
    }
  }
`;

export const DELETE_DISCOUNTS = gql`
  mutation deleteDiscounts($idList: [Int]!) {
    deleteDiscounts(idList: $idList)
  }
`;

export const SAVE_NOTE = gql`
  mutation saveNote(
    $id: Int!
    $important: Boolean!
    $message: String
    $assigneeId: Int!
    $noteId: Int
  ) {
    saveNote(
      id: $id
      important: $important
      message: $message
      assigneeId: $assigneeId
      noteId: $noteId
    ) {
      ${NOTE}
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!, $noteId: Int!) {
    deleteNote(id: $id, noteId: $noteId) {
      ${NOTE}
    }
  }
`;

export const SAVE_DISCOUNT_NOTE = gql`
  mutation saveDiscountNote(
    $id: Int!
    $important: Boolean!
    $message: String
    $assigneeId: Int!
    $noteId: Int
  ) {
    saveDiscountNote(
      id: $id
      important: $important
      message: $message
      assigneeId: $assigneeId
      noteId: $noteId
    ) {
      ${NOTE}
    }
  }
`;

export const DELETE_DISCOUNT_NOTE = gql`
  mutation deleteDiscountNote(
    $id: Int!
    $noteId: Int!
  ) {
    deleteDiscountNote(
      id: $id
      noteId: $noteId
    ) {
      ${NOTE}
    }
  }
`;

export const UPDATE_APPLIED_ORDER = gql`
  mutation updateAppliedOrder($updatePricingTermList: [NewAppliedOrder]!) {
    updateAppliedOrder(updatePricingTermList: $updatePricingTermList) {
      ${PRICING_TERM}
    }
  }
`;

export const UPDATE_DISCOUNT_APPLIED_ORDER = gql`
  mutation updateDiscountAppliedOrder(
    $updateDiscountList: [NewAppliedOrder]!
  ) {
    updateDiscountAppliedOrder(
      updateDiscountList: $updateDiscountList
    ) {
      ${DISCOUNT}
    }
  }
`;

export const CREATE_TARGET_TERM = gql`
mutation createTargetTerm(
  $name: String!
  $targetTypeId: Int!
  $cabinF: Boolean!
  $cabinB: Boolean!
  $cabinP: Boolean!
  $cabinE: Boolean!
  $incentiveTypeId: Int!
  $qsi: Float!
  $softTarget: Boolean
  $internalTarget: Boolean
  $timeframe: Int
) {
  createTargetTerm(
    name: $name
    targetTypeId: $targetTypeId
    cabinF: $cabinF
    cabinB: $cabinB
    cabinP: $cabinP
    cabinE: $cabinE
    incentiveTypeId: $incentiveTypeId
    qsi: $qsi
    softTarget: $softTarget
    internalTarget: $internalTarget
    timeframe: $timeframe
  ) {
    ${TARGET_TERM}
  }
}
`;

export const COPY_TARGET_TERM = gql`
mutation copyTargetTerm(
  $id: Int!
  $name: String!
) {
  copyTargetTerm(
    id: $id
    name: $name
  ) {
    ${TARGET_TERM}
  }
}
`;

export const EDIT_TARGET_TERM = gql`
mutation editTargetTerm(
  $id: Int!
  $name: String!
  $targetTypeId: Int!
  $cabinF: Boolean!
  $cabinB: Boolean!
  $cabinP: Boolean!
  $cabinE: Boolean!
  $incentiveTypeId: Int!
  $qsi: Float!
  $softTarget: Boolean
  $internalTarget: Boolean
  $timeframe: Int
) {
  editTargetTerm(
    id: $id
    name: $name
    targetTypeId: $targetTypeId
    cabinF: $cabinF
    cabinB: $cabinB
    cabinP: $cabinP
    cabinE: $cabinE
    incentiveTypeId: $incentiveTypeId
    qsi: $qsi
    softTarget: $softTarget
    internalTarget: $internalTarget
    timeframe: $timeframe
  ) {
    ${TARGET_TERM}
  }
}
`;

export const DELETE_TARGET_TERMS = gql`
  mutation deleteTargetTerms($idList: [Int]!) {
    deleteTargetTerms(idList: $idList)
  }
`;

export const TOGGLE_TARGET_TERM_QC = gql`
  mutation toggleTargetTermQC($id: Int!) {
    toggleTargetTermQC(id: $id) {
      ${TARGET_TERM}
    }
  }
`;

export const SAVE_TARGET_TERM_NOTE = gql`
  mutation saveTargetTermNote(
    $id: Int!
    $important: Boolean!
    $message: String
    $assigneeId: Int!
    $noteId: Int
  ) {
    saveTargetTermNote(
      id: $id
      important: $important
      message: $message
      assigneeId: $assigneeId
      noteId: $noteId
    ) {
      ${NOTE}
    }
  }
`;

export const DELETE_TARGET_TERM_NOTE = gql`
  mutation deleteTargetTermNote($id: Int!, $noteId: Int!) {
    deleteTargetTermNote(id: $id, noteId: $noteId) {
      ${NOTE}
    }
  }
`;

export const CREATE_TARGET_LEVEL = gql`
mutation createTargetLevel(
  $targetTermId: Int!, $targetAmount: Float!, $scoringTarget: Boolean!, $incentiveDescription: String
) {
  createTargetLevel(
    targetTermId: $targetTermId, targetAmount: $targetAmount, scoringTarget: $scoringTarget, incentiveDescription: $incentiveDescription) {
    ${TARGET_LEVEL}
  }
}
`;

export const EDIT_TARGET_LEVEL = gql`
mutation editTargetLevel(
  $id: Int!, $targetAmount: Float!, $scoringTarget: Boolean!, $incentiveDescription: String
) {
  editTargetLevel(
    id: $id, targetAmount: $targetAmount, scoringTarget: $scoringTarget, incentiveDescription: $incentiveDescription) {
    ${TARGET_LEVEL}
  }
}
`;

export const DELETE_TARGET_LEVEL = gql`
  mutation deleteTargetLevel($id: Int!) {
    deleteTargetLevel(id: $id)
  }
`;
