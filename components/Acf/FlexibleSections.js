// components/Acf/FlexibleSections.js

import HeroSection from './HeroSection'
import ResponsiveYoutubeEmbed from './ResponsiveYoutubeEmbed'
import ProductCardSlider from './ProductCardSlider'

export default function FlexibleSections({ sections }) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, idx) => {
        switch (section.__typename) {
          case 'FlexibleSectionsSectionsHeroSectionLayout':
            return <HeroSection key={idx} data={section} />;
          case 'FlexibleSectionsSectionsTwoColumnTextLayout':
            return (
              <div key={idx} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-16 px-4">
                <div dangerouslySetInnerHTML={{ __html: section.leftText }} />
                <div dangerouslySetInnerHTML={{ __html: section.rightText }} />
              </div>
            );
case 'FlexibleSectionsSectionsFullWidthYoutubeVideoLayout':
  return (
    <ResponsiveYoutubeEmbed
      key={idx}
      youtubeId={section.youtubeVideoId}
      poster={section.posterImageOptional?.node}
    />
  );
case 'FlexibleSectionsSectionsProductCardSliderLayout':
  return (
    <ProductCardSlider
  key={idx}
  products={section.products?.nodes || []}
    />
  );
          default:
            return null;
        }
      })}
    </>
  );
}
