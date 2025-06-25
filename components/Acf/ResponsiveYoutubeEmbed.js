import { useState } from 'react';
import Image from 'next/image';

export default function ResponsiveYoutubeEmbed({ youtubeId, poster }) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="w-full flex items-center justify-center my-10 p-4">
      <div className="relative w-full max-w-7xl aspect-[16/9] overflow-hidden shadow-lg mx-auto">
        {!playing ? (
          <button
            className="absolute inset-0 w-full h-full z-10 flex items-center justify-center group"
            onClick={() => setPlaying(true)}
            aria-label="Play Video"
          >
            {poster?.sourceUrl ? (
              <Image
                src={poster.sourceUrl}
                alt={poster.altText || ''}
                fill
                className="object-cover w-full h-full transition group-hover:brightness-75"
                priority={false}
                sizes="100vw"
              />
            ) : (
              <div className="bg-black/70 w-full h-full" />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 rounded-full bg-white/70 border-4 border-white/80 shadow-lg flex items-center justify-center transition group-hover:scale-105">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="22" fill="#fff" opacity="0.7" />
                  <polygon points="17,13 33,22 17,31" fill="#ff2828" />
                </svg>
              </span>
            </span>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}