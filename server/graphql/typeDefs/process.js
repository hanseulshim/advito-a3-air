exports.process = `
type Process {
  contracts: Int
  dataSets: Int
  records: Int
  recentProcessList: [RecentProcess]
}

type RecentProcess {
  date: Date
  contracts: Int
  dataSets: Int
  records: Int
  processDuration: Int
  status: Float
  processedBy: String
}

extend type Query {
  process: Process @auth
}
`;
