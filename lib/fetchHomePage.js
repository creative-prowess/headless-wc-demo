// lib/FetchHomePage.js
export async function fetchHomePage() {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          pageBy(uri: "home") {
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
  backgroundImage {
    node {
      sourceUrl
      altText
    }
  }
  backgroundColor
  backgroundPositionCustom
  backgroundPositionX
  backgroundPositionY
  backgroundAttachment
  backgroundBlendMode
  backgroundRepeat
  backgroundSize
  backgroundVideoUrl
  contentMaxWidth
  heroHeading
  heroSubheading
  heroContent    

  heroHeadingOptions {
    tag
    fontSize
    fontWeight
    maxWidth
    textAlign
    extraclass
  }

  heroSubheadingOptions {
    tag
    fontSize
    fontWeight
    maxWidth
    textAlign
    extraclass
  }

  heroContentOptions {
    tag
    fontSize
    fontWeight
    maxWidth
    textAlign
    extraclass
  }

  heroCta {
    text
    url
    style
  }

  heroExtraImage {
    node {
      sourceUrl
      altText
    }
  }

  heroOverlay {
    enable
    style
    angle
    color1
    color1Stop
    color2
    color2Stop
    opacity
  }
}

                ... on FlexibleSectionsSectionsTwoColumnTextLayout {
                  leftText
                  rightText
                }

                ... on FlexibleSectionsSectionsTabsSectionLayout {
         tabLayout
          tabs {
            tabLabel
            tabContent
          }
    }

    ... on FlexibleSectionsSectionsAccordionSectionLayout {
          items {
            itemLabel
            itemContent
          }
        }

                ... on FlexibleSectionsSectionsProductCardSliderLayout {
                  slidesPerView
                  arrowPlacement
products {
  nodes {
    __typename
    id
    ... on Product {
      name
      slug
      shortDescription
      image {
        sourceUrl
        altText
      }
    }
    ... on SimpleProduct {
      name
      slug
      shortDescription
      image {
        sourceUrl
        altText
      }
      price
      stockStatus
    }
    ... on VariableProduct {
      name
      slug
      shortDescription
      image {
        sourceUrl
        altText
      }
      price
      stockStatus
      variations(first: 50) {
        nodes {
          id
          price
          stockStatus
          attributes {
            nodes { name value }
          }
        }
      }
    }
  }
}


 }
              }
            }
          }
        }
      `
    })
  });
  const json = await res.json();
//console.log(JSON.stringify(json, null, 2));
  return json?.data?.pageBy || null;
}