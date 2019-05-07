import gql from 'graphql-tag';
import { PROCESS } from '../constants';

export const GET_PROCESS = gql`
  {
    process {
      ${PROCESS}
    }
  }
`;
