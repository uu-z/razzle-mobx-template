import { Observable } from "graphql-typed-client";

export interface Query {
  hello: String;
  __typename: "Query";
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string;

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean;

export interface QueryRequest {
  hello?: boolean | number;
  __typename?: boolean | number;
  __scalar?: boolean | number;
}

const Query_possibleTypes = ["Query"];
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error("__typename is missing");
  return Query_possibleTypes.includes(obj.__typename);
};

export interface QueryPromiseChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> };
}

export interface QueryObservableChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> };
}
