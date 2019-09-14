import scenario from './scenario';
import client from './client';
import collection from './collection';
import project from './project';
import dataSet from './dataSet';
import library from './library';
import contract from './contract';
import pricingTerm from './contract/pricingTerm';
import targetTerm from './contract/targetTerm';
import discount from './contract/discount';
import normalization from './contract/normalization';
import note from './contract/note';
import rule from './contract/rule';
import user from './user';
import process from './process';

export default {
  tabs: [
    scenario,
    client,
    dataSet.queries,
    dataSet.mutations,
    project.mutations,
    project.queries,
    library,
    contract.queries,
    contract.mutations,
    pricingTerm.queries,
    pricingTerm.mutations,
    targetTerm.queries,
    targetTerm.mutations,
    discount.queries,
    discount.mutations,
    normalization.queries,
    normalization.mutations,
    collection.queries,
    collection.mutations,
    note.queries,
    note.mutations,
    rule.queries,
    rule.mutations,
    user.queries,
    process.queries,
    process.mutations
  ]
};
