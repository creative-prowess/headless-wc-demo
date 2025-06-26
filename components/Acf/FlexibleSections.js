// components/Acf/FlexibleSections.js

import HeroSection from './HeroSection'
import ResponsiveYoutubeEmbed from './ResponsiveYoutubeEmbed'
import ProductCardSlider from './ProductCardSlider'
import Tabs from './Tabs'
import Accordion from './Accordion'

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
              <div key={idx} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-16 px-4 sm:px-0">
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

   case 'FlexibleSectionsSectionsTabsSectionLayout':
            return (
              <Tabs
                key={idx}
                layout={section.tabLayout}
                tabs={section.tabs.map(tab => ({
                  label: tab.tabLabel,
                  content: <div dangerouslySetInnerHTML={{ __html: tab.tabContent }} />
                }))}
              />
            );
case 'FlexibleSectionsSectionsAccordionSectionLayout':
  return (
    <Accordion
      key={idx}
      items={section.items.map(item => ({
        label: item.itemLabel,
        content: <div dangerouslySetInnerHTML={{ __html: item.itemContent }} />
      }))}
      defaultOpenIndex={0}
    />
  );
          default:
            return null;
        }
      })}
    </>
  );
}
