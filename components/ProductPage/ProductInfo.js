// /components/ProductPage/ProductInfo.js
export default function ProductInfo({ product }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {product.name}
      </h1>

      {product.price && (
        <div className="text-2xl font-semibold text-brand">
          {product.price}
        </div>
      )}

      <div className="text-sm text-muted">
        {product.sku && <span>SKU: {product.sku}</span>}
        {product.stockStatus && (
          <span className="ml-4">
            {product.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
          </span>
        )}
      </div>

      {product.shortDescription && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
      )}
    </div>
  )
}
