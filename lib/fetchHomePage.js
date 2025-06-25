import Accordion from "@/components/Acf/Accordion";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export async function fetchHomePage() {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          pageBy(uri: "/") {
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
 // console.log(JSON.stringify(json, null, 2));
  return json?.data?.pageBy || null;
}