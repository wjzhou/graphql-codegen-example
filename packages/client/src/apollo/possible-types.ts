
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "ChatMessage",
      "User"
    ],
    "SearchResult": [
      "User",
      "ChatMessage"
    ]
  }
};
      export default result;
    