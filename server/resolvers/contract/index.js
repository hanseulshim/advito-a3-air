import merge from 'lodash.merge';
import { contractContainer } from './contractContainer';
import { pricingTerm } from './pricingTerm';
import { targetTerm } from './targetTerm';
import { targetLevel } from './targetLevel';
import { discount } from './discount';
import { normalization } from './normalization';
import { note } from './note';
import { rule } from './rule';
import { bulkRule } from './bulkRule';

export const contract = {
  ...merge(
    contractContainer,
    pricingTerm,
    targetTerm,
    discount,
    normalization,
    note,
    targetLevel,
    rule,
    bulkRule
  )
};
