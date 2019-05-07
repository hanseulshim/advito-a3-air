import gql from 'graphql-tag';
import { DATA_SET } from '../constants';

export const TOGGLE_DATA_SET = gql`
  mutation toggleDataSet($id: Int!, $status: String) {
    toggleDataSet(id: $id, status: $status) {
      ${DATA_SET}
    }
  }
`;

export const DELETE_DATA_SET = gql`
  mutation deleteDataSet($id: Int!) {
    deleteDataSet(id: $id)
  }
`;
