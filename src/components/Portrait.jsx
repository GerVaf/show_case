export default function Portrait({ priority = false, className = '', imgClassName = '', sizes = '(min-width: 1024px) 420px, 100vw' }) {
  return (
    <picture className={`block overflow-hidden bg-ink ${className}`}>
      <source
        type="image/avif"
        srcSet="/images/thant-zin-min-560.avif 560w, /images/thant-zin-min-1120.avif 1120w"
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet="/images/thant-zin-min-560.webp 560w, /images/thant-zin-min-1120.webp 1120w"
        sizes={sizes}
      />
      <img
        className={`h-full w-full object-cover grayscale ${imgClassName}`}
        src="/images/thant-zin-min-560.webp"
        width="1120"
        height="1400"
        alt="Black-and-white portrait of Thant Zin Min"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
