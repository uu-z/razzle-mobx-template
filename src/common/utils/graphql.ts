import { createClient } from "../../../generated/gql/createClient";
import { request } from "graphql-request";

export const gqlClient = createClient({
  fetcher: ({ query, variables }) => request("/api-gateway", query, variables).then((data) => ({ data })),
});
