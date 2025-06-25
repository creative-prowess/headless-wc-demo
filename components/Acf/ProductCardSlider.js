import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import ProductCard from '@/components/ProductCard'
import { fetchHomePage } from "@/lib/fetchHomePage"

function Arrow({ direction, onClick, disabled, className = "" }) {
  // direction = 'left' or 'right'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? "Previous products" : "Next products"}
      className={`bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center
        border border-gray-200 hover:bg-gray-100 transition
        ${disabled ? "opacity-40 cursor-not-allowed" : "opacity-100"}
        ${className}
      `}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Use explicit left/right SVG */}
      {direction === 'left' ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export default function ProductCardSlider({
  products,
  slidesPerView = 5,
  showArrows = "side", // "side" or "top"
  className = ""
}) {
  const [current, setCurrent] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: slidesPerView, spacing: 24 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: Math.max(1, slidesPerView - 1), spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 8 } }
    },
    slideChanged(slider) {
      setCurrent(slider.track.details.rel)
    }
  })

  // Always show arrows for testing; add logic if you want conditional arrows.
  const leftDisabled = current === 0
  const rightDisabled = current >= products.length - slidesPerView

  return (
    <div className={`relative w-full ${className}`}>
      {showArrows === "side" && (
        <>
          <Arrow
            direction="left"
            onClick={() => instanceRef.current?.prev()}
            disabled={leftDisabled}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
          />
          <Arrow
            direction="right"
            onClick={() => instanceRef.current?.next()}
            disabled={rightDisabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
          />
        </>
      )}
      {showArrows === "top" && (
        <div className="absolute w-full flex justify-between px-4 top-0 z-10 pointer-events-none">
          <Arrow
            direction="left"
            onClick={() => instanceRef.current?.prev()}
            disabled={leftDisabled}
            className="pointer-events-auto"
          />
          <Arrow
            direction="right"
            onClick={() => instanceRef.current?.next()}
            disabled={rightDisabled}
            className="pointer-events-auto"
          />
        </div>
      )}

      <div ref={sliderRef} className="keen-slider py-2">
        {products.map((product, idx) => (
          <div className="keen-slider__slide" key={product.id || idx}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}