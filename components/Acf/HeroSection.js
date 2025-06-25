// components/acf/HeroSection.js

import Image from "next/image";
import clsx from "clsx";

export default function HeroSection({ data }) {
  if (!data) return null;

  const {
    heroBgImage,
    heroOverlay,
    heroHeading,
    heroSubheading,
    heroContent,
    heroCta,
    heroExtraImage,
  } = data;

  // Safely extract images from the node
  const bgImage = heroBgImage?.node;
  const extraImage = heroExtraImage?.node;

  // Overlay logic
  const overlayStyles =
    heroOverlay?.enable && heroOverlay?.color
      ? {
          backgroundColor: heroOverlay.color,
          opacity: heroOverlay.opacity ?? 0.5,
        }
      : null;

  return (
    <section className="relative w-full min-h-[450px] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      {bgImage?.sourceUrl && (
        <Image
          src={bgImage.sourceUrl}
          alt={bgImage.altText || heroHeading || ""}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center absolute inset-0 z-0"
        />
      )}

      {/* Overlay */}
      {heroOverlay?.enable && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={overlayStyles}
          aria-hidden="true"
        />
      )}

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Optional Extra Image (Logo, product, etc.) */}
        {extraImage?.sourceUrl && (
          <div className="mb-6 w-32 h-32 mx-auto relative">
            <Image
              src={extraImage.sourceUrl}
              alt={extraImage.altText || ""}
              fill
              className="object-contain object-center"
              priority={false}
              sizes="128px"
            />
          </div>
        )}

        {/* Main Headings */}
        {heroHeading && (
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-lg">
            {heroHeading}
          </h1>
        )}
        {heroSubheading && (
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white drop-shadow">
            {heroSubheading}
          </h2>
        )}
        {heroContent && (
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {heroContent}
          </p>
        )}

        {/* CTA Button */}
        {heroCta?.text && heroCta?.url && (
          <a
            href={heroCta.url}
            className={clsx(
              "inline-block px-7 py-3 rounded-full font-bold text-lg transition",
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
