import gql from 'graphql-tag';
import { CONTRACT, PRICING_TERM, DISCOUNT, NOTE } from '../constants';

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
