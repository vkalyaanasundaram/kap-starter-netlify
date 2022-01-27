export default async function handler(req, resp) {
  const {
    query: { slug },
  } = req;

  resp.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const errorCode = resp.ok ? false : resp.statusCode;

  const QUERY_SINGLE_POST = `
  query HomePage {
         page(id: "index-2", idType: URI) {
          title
          ThreeColumnStaticPage {
            banner {
              staticBannerButton
              staticBannerDescription
              staticBannerTitle
              staticMobileBannerImage {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
              }
              staticBannerImage {
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
  `;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: "/index-2",
      },
    }),
  });

  //   console.log(json);
  const json = await data.json();
  // console.log(json);
  resp.json(json.data);
}
