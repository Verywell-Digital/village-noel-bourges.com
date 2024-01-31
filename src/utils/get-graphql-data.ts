import { getClient } from "@/lib/apollo-client";

export async function getGqlData(query: any, key: any, variables: any = {}) {
  const {
    data: {
      [key]: { data },
    },
  } = await getClient().query({
    query,
    variables,
    fetchPolicy: 'no-cache', // or fetchPolicy: 'network-only' to refetch every time for each query. Actually it's to bypass the cache and use apollo cache only
    // doc : https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
    // Other considerations : 
    // Use directly getClient in the component : 
    // const { data } = await getClient().query({ 
    //   query,
    //   context: {
    //     fetchOptions: {
    //       next: { revalidate: 5 }, // Don't forget to remove the cache in apollo-client
    //     },
    //   },
    // })
  });

  return data.map((item: { attributes: any }) => item?.attributes);
}
