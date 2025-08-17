import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '', ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`max-w-full h-auto ${className}`}
      {...props}
    />
  );
}
