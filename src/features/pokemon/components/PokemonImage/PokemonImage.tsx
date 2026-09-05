import { useState } from 'react'

import { cn } from '../../../../shared/utils/cn'

interface PokemonImageProps {
  alt: string
  className?: string
  fallbackClassName?: string
  imageClassName?: string
  placeholderClassName?: string
  priority?: boolean
  src: string
}

export function PokemonImage({
  alt,
  className,
  fallbackClassName,
  imageClassName,
  placeholderClassName,
  priority = false,
  src,
}: PokemonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <span
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {!isLoaded && !hasError ? (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-white to-[#f6f6f6]',
            placeholderClassName
          )}
        >
          <span className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_20%,rgb(255_255_255_/_0.72)_45%,transparent_70%)]" />
          <img
            alt=""
            className={cn(
              'absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 opacity-45',
              fallbackClassName
            )}
            draggable={false}
            src="/pokeball-placeholder.svg"
          />
        </span>
      ) : null}

      {hasError ? (
        <img
          alt={`${alt} görseli bulunamadı`}
          className={cn('relative size-20 opacity-70', fallbackClassName)}
          draggable={false}
          src="/pokeball-placeholder.svg"
        />
      ) : (
        <img
          alt={alt}
          className={cn(
            'relative opacity-0 transition duration-300',
            isLoaded && 'opacity-100',
            imageClassName
          )}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          height="256"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          src={src}
          width="256"
        />
      )}
    </span>
  )
}
