export default async function handler(req, resp) {
  const {
    query: { slug },
  } = req;

  const QUERY_SINGLE_POST = `
    query SinglePage($id: ID!) {
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
            }
            accordionData {
              accordion {
                  accordionContent
                  accordionTitle
              }
            }
            productsAcf {
              mobileBannerImage {
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
              bannerListItems {
                title
                listsItems
              }
              pageBannerDescription
              pageBannerTitle
              ourGoal
              productsCards {
                cardContent
                cardTitle
                svgIcon {
                  sourceUrl
                }
                cardButton
                cardSlug
              }
              getStartedToday
              pageBanner {
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
            }
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: slug,
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
