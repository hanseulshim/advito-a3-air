import gql from 'graphql-tag';
import { CONTRACT, PRICING_TERM, DISCOUNT, NOTE } from '../constants';

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
    $id: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    createDiscount(
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

export const COPY_DISCOUNT = gql`
  mutation copyDiscount(
    $pricingTermId: Int!
    $id: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    copyDiscount(
      pricingTermId: $pricingTermId
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
    $pricingTermId: Int!
    $id: Int!
    $name: String!
    $discountTypeId: Int
    $discountValue: Float!
    $journeyTypeId: Int
    $directionTypeId: Int
  ) {
    editDiscount(
      pricingTermId: $pricingTermId
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

export const SAVE_NOTE = gql`
  mutation saveNote(
    $pricingTermId: Int!
    $important: Boolean!
    $message: String
    $assigneeId: Int!
    $noteId: Int
  ) {
    saveNote(
      pricingTermId: $pricingTermId
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
  mutation deleteNote($pricingTermId: Int!, $noteId: Int!) {
    deleteNote(pricingTermId: $pricingTermId, noteId: $noteId) {
      ${NOTE}
    }
  }
`;

export const SAVE_DISCOUNT_NOTE = gql`
  mutation saveDiscountNote(
    $pricingTermId: Int!
    $discountId: Int!
    $important: Boolean!
    $message: String
    $assigneeId: Int!
    $noteId: Int
  ) {
    saveDiscountNote(
      pricingTermId: $pricingTermId
      discountId: $discountId
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
    $pricingTermId: Int!
    $discountId: Int!
    $noteId: Int!
  ) {
    deleteDiscountNote(
      pricingTermId: $pricingTermId
      discountId: $discountId
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
    $id: Int!
    $updateDiscountList: [NewAppliedOrder]!
  ) {
    updateDiscountAppliedOrder(
      id: $id
      updateDiscountList: $updateDiscountList
    ) {
      ${DISCOUNT}
    }
  }
`;
