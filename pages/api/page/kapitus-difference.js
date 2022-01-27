export default async function handler(req, resp) {
  const {
    query: { slug },
  } = req;

  const QUERY_SUCCESS_STORIES = `
    query SuccessStories($id: ID!) {
        page(idType: URI, id: $id) {
          title
          uri
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
            financeSolution
          }
          
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SUCCESS_STORIES,
      variables: {
        id: "kapitus-difference",
      },
    }),
  });
  // if (resp.status(500)) {
  //   // resp.status(500).json({ message: `User with id not found.` });
  //   resp.redirect("./500");
  // } else {
  //   console.log(json);
  const json = await data.json();
  // console.log(json);
  resp.json(json?.data?.page);
  // }
}
