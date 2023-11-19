import { getClient } from "@/lib/apollo-client";

export async function getGqlData(query: any, key: any, variables: any = {}) {
  const {
    data: {
      [key]: { data },
    },
  } = await getClient().query({
    query,
    variables,
    // context: {
    //   fetchOptions: {
    //     next: { revalidate: 60 },
    //   },
    // },
  });

  return data.map((item: { attributes: any }) => item.attributes);
}
