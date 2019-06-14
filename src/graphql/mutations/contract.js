import gql from 'graphql-tag';
import {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL,
  NOTE
} from '../constants';

export const UPDATE_CONTRACT = gql`
  mutation updateContract($selectedContract: SelectedContract) {
    updateContract(selectedContract: $selectedContract) @client
  }
`;

export const CREATE_CONTRACT = gql`
  mutation createContract(
    $name: String!
    $typeId: Int!
    $round: Int
    $effectiveFrom: Date!
    $effectiveTo: Date
    $description: String
    $divisionId: Int
  ) {
    createContract(
      name: $name
      typeId: $typeId
      round: $round
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
      description: $description
      divisionId: $divisionId
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
    $effectiveFrom: Date!
    $effectiveTo: Date
    $description: String
    $divisionId: Int
  ) {
    editContract(
      id: $id
      name: $name
      typeId: $typeId
      round: $round
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
      description: $description
      divisionId: $divisionId
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
  mutation createPricingTerm($contractId: Int!, $name: String!, $ignore: Boolean!) {
    createPricingTerm(contractId: $contractId, name: $name, ignore: $ignore) {
      ${PRICING_TERM}
    }
  }
`;

export const COPY_PRICING_TERM = gql`
  mutation copyPricingTerm($id: Int!, $contractId: Int!, $name: String!, $ignore: Boolean!) {
    copyPricingTerm(id: $id, contractId: $contractId, name: $name, ignore: $ignore) {
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
  mutation deletePricingTerms($contractId: Int!, $idList: [Int]!) {
    deletePricingTerms(contractId: $contractId, idList: $idList)
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
  mutation deleteDiscounts($pricingTermId: Int!, $idList: [Int]!) {
    deleteDiscounts(pricingTermId: $pricingTermId, idList: $idList)
  }
`;

export const ADD_NOTE = gql`
  mutation addNote(
    $parentId: Int!
    $parentTable: String!
    $important: Boolean!
    $text: String
    $assignedToId: Int!
  ) {
    addNote(
      parentId: $parentId
      parentTable: $parentTable
      important: $important
      text: $text
      assignedToId: $assignedToId
    ) {
      ${NOTE}
    }
  }
`;

export const EDIT_NOTE = gql`
  mutation editNote(
    $parentId: Int!
    $parentTable: String!
    $important: Boolean!
    $text: String
    $assignedToId: Int!
    $noteId: String!
  ) {
    editNote(
      parentId: $parentId
      parentTable: $parentTable
      important: $important
      text: $text
      assignedToId: $assignedToId
      noteId: $noteId
    ) {
      ${NOTE}
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote(
    $parentId: Int!
    $parentTable: String!
    $resetImportant: Boolean!
    $important: Boolean!
    $noteId: String!
  ) {
    deleteNote(
      parentId: $parentId
      parentTable: $parentTable
      resetImportant: $resetImportant
      important: $important
      noteId: $noteId
    )
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
  $contractId: Int!
  $name: String!
  $targetTypeId: Int!
  $timeframe: Int
  $cabinF: Boolean
  $cabinB: Boolean
  $cabinP: Boolean
  $cabinE: Boolean
  $incentiveTypeId: Int
  $currencyId: Int
  $softTarget: Boolean
  $internalTarget: Boolean
  $qsi: Float
  $dpmPrice: Float
  $dpmStartDate: Date
  $baselineDateFrom: Date
  $baselineDateTo: Date
  $goalDateFrom: Date
  $goalDateTo: Date
  $airlineGroupFrom: Date
  $airlineGroupTo: Date
  $fareCategoryFrom: Date
  $fareCategoryTo: Date
) {
  createTargetTerm(
    contractId: $contractId
    name: $name
    targetTypeId: $targetTypeId
    timeframe: $timeframe
    cabinF: $cabinF
    cabinB: $cabinB
    cabinP: $cabinP
    cabinE: $cabinE
    incentiveTypeId: $incentiveTypeId
    currencyId: $currencyId
    softTarget: $softTarget
    internalTarget: $internalTarget
    qsi: $qsi
    dpmPrice: $dpmPrice
    dpmStartDate: $dpmStartDate
    baselineDateFrom: $baselineDateFrom
    baselineDateTo: $baselineDateTo
    goalDateFrom: $goalDateFrom
    goalDateTo: $goalDateTo
    airlineGroupFrom: $airlineGroupFrom
    airlineGroupTo: $airlineGroupTo
    fareCategoryFrom: $fareCategoryFrom
    fareCategoryTo: $fareCategoryTo
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
  $timeframe: Int
  $cabinF: Boolean
  $cabinB: Boolean
  $cabinP: Boolean
  $cabinE: Boolean
  $currencyId: Int
  $softTarget: Boolean
  $internalTarget: Boolean
  $qsi: Float
  $dpmPrice: Float
  $dpmStartDate: Date
  $baselineDateFrom: Date
  $baselineDateTo: Date
  $goalDateFrom: Date
  $goalDateTo: Date
  $airlineGroupFrom: Date
  $airlineGroupTo: Date
  $fareCategoryFrom: Date
  $fareCategoryTo: Date
) {
  editTargetTerm(
    id: $id
    name: $name
    timeframe: $timeframe
    cabinF: $cabinF
    cabinB: $cabinB
    cabinP: $cabinP
    cabinE: $cabinE
    currencyId: $currencyId
    softTarget: $softTarget
    internalTarget: $internalTarget
    qsi: $qsi
    dpmPrice: $dpmPrice
    dpmStartDate: $dpmStartDate
    baselineDateFrom: $baselineDateFrom
    baselineDateTo: $baselineDateTo
    goalDateFrom: $goalDateFrom
    goalDateTo: $goalDateTo
    airlineGroupFrom: $airlineGroupFrom
    airlineGroupTo: $airlineGroupTo
    fareCategoryFrom: $fareCategoryFrom
    fareCategoryTo: $fareCategoryTo
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
    $targetTermId: Int!
    $targetAmount: Float!
    $scoringTarget: Boolean!
    $incentiveDescription: String
  ) {
    createTargetLevel(
      targetTermId: $targetTermId
      targetAmount: $targetAmount
      scoringTarget: $scoringTarget
      incentiveDescription: $incentiveDescription
    )
  }
`;

export const EDIT_TARGET_LEVEL = gql`
mutation editTargetLevel(
  $id: Int!, $targetTermId: Int!, $targetAmount: Float!, $scoringTarget: Boolean!, $incentiveDescription: String
) {
  editTargetLevel(
    id: $id, targetTermId: $targetTermId, targetAmount: $targetAmount, scoringTarget: $scoringTarget, incentiveDescription: $incentiveDescription) {
    ${TARGET_LEVEL}
  }
}
`;

export const TOGGLE_TARGET_LEVEL = gql`
mutation toggleTargetLevel(
  $id: Int!, $targetTermId: Int!
) {
  toggleTargetLevel(id: $id, targetTermId: $targetTermId) {
    ${TARGET_LEVEL}
  }
}
`;

export const DELETE_TARGET_LEVEL = gql`
  mutation deleteTargetLevel($id: Int!, $targetTermId: Int!) {
    deleteTargetLevel(id: $id, targetTermId: $targetTermId)
  }
`;
