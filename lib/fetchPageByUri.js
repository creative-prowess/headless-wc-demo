// components/lib/fetchPageUri.js

export async function fetchPageByUri(uri) {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          pageBy(uri: "${uri}") {
            id
            flexibleSections {
              sections {
                __typename
                ... on FlexibleSectionsSectionsFullWidthYoutubeVideoLayout {
  youtubeVideoId
  posterImageOptional {
    node {
      sourceUrl
      altText
    }
  }
}
        ... on FlexibleSectionsSectionsHeroSectionLayout {
          heroBgImage { node { sourceUrl altText } }
          heroOverlay { enable color opacity }
          heroHeading
          heroSubheading
          heroContent
          heroCta { text url style }
          heroExtraImage { node { sourceUrl altText } }
        }
        ... on FlexibleSectionsSectionsTwoColumnTextLayout {
          leftText
          rightText
        }
... on FlexibleSectionsSectionsProductCardSliderLayout {
  products {
    node {
      id
      name
      slug
      price
      salePrice
      image {
        sourceUrl
        altText
      }
      categories {
        nodes { name }
      }
      rating
      variations {
        nodes {
          id
          price
          stockStatus
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
      stockStatus
    }
  }
  slidesPerView
  arrowPlacement
}
              }
            }
          }
        }
      `
    })
  });
  const json = await res.json();
  return json?.data?.pageBy || null;
}
