// components/Acf/HeroSection.js

import Image from "next/image";
import clsx from "clsx";

function hexToRgba(color, alpha = 1) {
  if (!color) return null;
  if (color.startsWith("rgba")) return color;
  if (color.startsWith("rgb")) return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);

  let hex = color.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HeroSection({ data }) {
  if (!data) return null;

  const {
    heroHeading,
    heroHeadingOptions = {},
    heroSubheading,
    heroSubheadingOptions = {},
    heroContent,
    heroContentOptions = {},
    heroCta,
    heroExtraImage,
    backgroundImage,
    backgroundColor,
    backgroundBlendMode,
    backgroundAttachment,
    backgroundRepeat,
    backgroundSize,
    backgroundPositionX,
    backgroundPositionY,
    heroOverlay,
    contentMaxWidth,
  } = data;

  const extraImage = heroExtraImage?.node;

  let overlayGradient = null;
  if (heroOverlay?.enable) {
    const {
      style: rawType,
      angle,
      color1,
      color1Stop,
      color2,
      color2Stop,
      opacity
    } = heroOverlay;

    const style = Array.isArray(rawType) ? rawType[0] : rawType;
    const alpha = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);

    const rgba1 = color1 ? hexToRgba(color1, alpha) : null;
    const rgba2 = color2 ? hexToRgba(color2, alpha) : null;

    if (style === "solid" && rgba1) {
      overlayGradient = `linear-gradient(${rgba1}, ${rgba1})`;
    } else if (style?.includes("gradient") && rgba1 && rgba2) {
      const angleStr = angle ? `${angle}deg, ` : '';
      const stop1 = color1Stop ? ` ${color1Stop}` : '';
      const stop2 = color2Stop ? ` ${color2Stop}` : '';
      overlayGradient = `${style}(${angleStr}${rgba1}${stop1}, ${rgba2}${stop2})`;
    }
  }

  const HeadingTag = heroHeadingOptions.tag?.[0] || "h1";
  const headingSize = heroHeadingOptions.fontSize || "text-4xl md:text-5xl";
  const headingAlign = heroHeadingOptions.textAlign?.[0] || "text-center";
  const headingWeight = heroHeadingOptions.fontWeight?.[0] || "font-extrabold";
  const headingMaxWidth = heroHeadingOptions.maxWidth || "max-w-3xl";


const headingExtraClass = typeof heroHeadingOptions.extraclass === 'string'
  ? heroHeadingOptions.extraclass.trim().split(/\s+/)
  : [];

const subheadingExtraClass = typeof heroSubheadingOptions.extraclass === 'string'
  ? heroSubheadingOptions.extraclass.trim().split(/\s+/)
  : [];

const contentExtraClass = typeof heroContentOptions.extraclass === 'string'
  ? heroContentOptions.extraclass.trim().split(/\s+/)
  : [];

  const SubheadingTag = heroSubheadingOptions.tag?.[0] || "h2";
  const subheadingSize = heroSubheadingOptions.fontSize || "text-xl md:text-2xl";
  const subheadingAlign = heroSubheadingOptions.textAlign?.[0] || "text-center";
  const subheadingWeight = heroSubheadingOptions.fontWeight?.[0] || "font-semibold";
  const subheadingMaxWidth = heroSubheadingOptions.maxWidth || "max-w-2xl";

  const ContentTag = heroContentOptions.tag?.[0] || "p";
  const contentSize = heroContentOptions.fontSize || "text-base md:text-lg";
  const contentAlign = heroContentOptions.textAlign?.[0] || "text-center";
  const contentWeight = heroContentOptions.fontWeight?.[0] || "font-normal";


  const headingClassNames = clsx(
  headingSize || "text-custom-60",
  headingAlign || "text-center",
  headingWeight || "font-extrabold",
  headingMaxWidth || "max-w-4xl",
  headingExtraClass, // can be string or array, be sure it's passed correctly
  "tracking-tight text-white drop-shadow-lg"
);

  return (
    <section
      className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden px-4 hero-overlay"
      style={{
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage?.node?.sourceUrl
          ? `url(${backgroundImage.node.sourceUrl})`
          : undefined,
        backgroundBlendMode: Array.isArray(backgroundBlendMode)
          ? backgroundBlendMode.join(", ")
          : backgroundBlendMode || undefined,
        backgroundAttachment: Array.isArray(backgroundAttachment)
          ? backgroundAttachment.join(", ")
          : backgroundAttachment || undefined,
        backgroundRepeat: Array.isArray(backgroundRepeat)
          ? backgroundRepeat.join(", ")
          : backgroundRepeat || undefined,
        backgroundSize: Array.isArray(backgroundSize)
          ? backgroundSize.join(", ")
          : backgroundSize || undefined,
        backgroundPosition: `${backgroundPositionX || "center"} ${backgroundPositionY || "center"}`,
        "--hero-overlay-gradient": overlayGradient
      }}
    >
      <div className={clsx("relative z-20 w-full mx-auto px-6 py-32 text-center flex flex-col items-center", contentMaxWidth)}>
        {extraImage?.sourceUrl && (
          <div className="mb-6 w-32  h-32 mx-auto relative">
            <Image
              src={extraImage.sourceUrl}
              alt={extraImage.altText || ""}
              fill
              className="object-contain object-center"
              priority
              sizes="128px"
            />
          </div>
        )}



        {heroHeading && (
<HeadingTag className={headingClassNames}>
  {heroHeading}
</HeadingTag>
        )}

        {heroSubheading && (
<SubheadingTag className={clsx(subheadingSize, subheadingAlign, subheadingWeight, subheadingMaxWidth, subheadingExtraClass, " text-white drop-shadow")}>
  {heroSubheading}
</SubheadingTag>
        )}

        {heroContent && (
          <ContentTag className={clsx(contentSize, contentAlign, contentWeight, contentMaxWidth, contentExtraClass, "text-white/90 mb-6 mx-auto")}> {heroContent} </ContentTag>
        )}

        {heroCta?.text && heroCta?.url && (
          <a
            href={heroCta.url}
            className={clsx(
              "inline-block px-7 py-3 rounded font-bold uppercase text-lg mt-8 text-white transition bg-accent",
              heroCta.style === "primary" &&
                "bg-blue-700 text-white hover:bg-blue-800 shadow-lg",
              heroCta.style === "secondary" &&
                "bg-white text-blue-700 border border-blue-700 hover:bg-blue-50",
              heroCta.style === "ghost" &&
                "bg-transparent border border-white text-white hover:bg-white hover:text-blue-700"
            )}
          >
            {heroCta.text}
          </a>
        )}
      </div>
    </section>
  );
}
