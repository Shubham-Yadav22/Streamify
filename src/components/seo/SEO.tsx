import { Helmet } from 'react-helmet-async';
import { memo, useMemo } from 'react';

const DEFAULT_TITLE = 'Streamify - Discover Your Next Favorite TV Show';
const DEFAULT_DESCRIPTION =
  'Discover trending, popular, and top-rated TV shows. Browse episodes, search for your favorites, and find your next binge-worthy series.';
const DEFAULT_IMAGE = '/og-image.png';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = memo(function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
}: SEOProps) {
  const finalUrl =
    url ??
    (typeof window !== "undefined" ? window.location.href : "");

  const fullTitle = useMemo(() => {
    return title === DEFAULT_TITLE ? title : `${title} | Streamify`;
  }, [title]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={finalUrl} />
    </Helmet>
  );
});
