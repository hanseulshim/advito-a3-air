export const process = `
type Process {
  currContCount: Int
  currDsCount: Int
  currRecCount: Int
  priContCount: Int
  priDsCount: Int
  priRecCount: Int
  procStart: Date
  procEnd: Date
  processing: Boolean
}

type RecentProcess {
  procEnd: Date
  procStart: Date
  contCount: Int
  dsCount: Int
  recCount: Int
  status: String
  procBy: String
}

extend type Query {
  process(projectId: Int): Process @auth
  recentProcessList(projectId: Int): [RecentProcess] @auth
}
extend type Mutation {
  startProcess(projectId: Int!, projectName: String!): Int @auth
  stopProcess(projectId: Int!): Int @auth
}
`;
