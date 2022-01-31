const API_URL = process.env.WORDPRESS_URL;

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });
  // error handling work
  const json = await res.json();
  console.log(json);
  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `{
        posts(where: {status: PUBLISH}, first: 10) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              title
              date
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
            cursor
          }
        }
      }`
  );

  return data?.posts;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `{
        posts(where: {status: PUBLISH}, first: 1000) {
          nodes {
            slug
            title
            content
          }
        }
      }`
  );
  return data?.posts;
}

export async function getAllUsers() {
  const data = await fetchAPI()(
    `{
      query ProductServiceQry {
        users(first: 50){
          nodes {
            name
            nicename
            username
            email
          }
        }
      }

    }`
  );
  return data?.users;
}
