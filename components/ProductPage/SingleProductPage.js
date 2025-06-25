// /components/ProductPage/SingleProductPage.js
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductVariants from './ProductVariants'
import AddToCartForm from './AddToCartForm'
import ProductTabs from './ProductTabs'
import ProductBumps from './ProductBumps'
import RelatedProducts from './RelatedProducts'

export default function SingleProductPage({ product, loading, error }) {
    console.log('🔍 Product received in page:', product)
  if (loading) {
    return <div className="max-w-screen-xl mx-auto px-4 py-24 text-center text-muted">Loading product...</div>
  }

if (error || !product) {
  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <h1 className="text-2xl font-bold text-red-600">Product not found or unavailable</h1>
      <p className="text-gray-600 mt-4">Please check the URL or return to the shop.</p>
    </div>
  );
}
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
  <ProductGallery
  images={[
    {
      src: product.image?.sourceUrl,
      alt: product.image?.altText || product.name,
    }
  ]}
/>

        <div>
          <ProductInfo product={product} />
          <div className="mt-6">
            <ProductVariants product={product} />
          </div>
          <AddToCartForm product={product} />
        </div>
      </div>

      <div className="mt-12">
        <ProductTabs
          description={product.description}
          specs={product.specs}
          reviews={product.reviews}
        />
      </div>

      <ProductBumps bumps={product.bumps} />

      <RelatedProducts related={product.related} />
    </div>
  )
}
