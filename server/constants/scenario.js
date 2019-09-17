export const SCENARIO = `scenarioId
        projectId
        shortName
        name
        description
        airlineContracts
        preferredAirlines
        tripDistribution
        effectiveSavings
        influenceLevelCd
        priceInfluenceLevelCd
        biasOverride
        servedMarketThreshold
        overlapThreshold
        segmentIncrease
        fareIncrease
        useHistoricalShare
        useHistoricalFares
        ignoresSmallQsi
        smallQsiThreshold`;

export const SCENARIO_LOOKUP = {
  INIT_TYPE: 16,
  INIT_BLANK: 92,
  INIT_COPY_SCENARIO: 93,
  INIT_COPY_PROJECT: 94,
  INFLUENCE_LEVEL_TYPE: 17,
  PRICE_INFLUENCE_LEVEL_TYPE: 18,
  BIAS_OVERRIDE_TYPE: 19
};
