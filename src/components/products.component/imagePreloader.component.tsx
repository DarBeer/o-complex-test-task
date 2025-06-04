'use client'
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export function ImagePreloader(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${props.className}`}>
        {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 
                            to-gray-300 bg-[length:200%_100%] animate-gradient-shift" />
        )}
        <Image {...props}
               onLoadingComplete={() => setIsLoading(false)}
               className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
    </div>
  );
}