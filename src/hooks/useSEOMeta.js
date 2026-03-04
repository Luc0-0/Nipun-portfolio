import { useEffect } from 'react';

/**
 * Hook to set SEO meta tags for a page
 * @param {Object} config - SEO configuration
 * @param {string} config.title - Page title (also used for og:title)
 * @param {string} config.description - Page description (also used for og:description)
 * @param {string} config.keywords - Comma-separated keywords
 * @param {string} [config.ogImage] - OpenGraph image URL
 * @param {string} [config.ogUrl] - OpenGraph URL (canonical)
 * @param {string} [config.canonical] - Canonical URL
 * @param {string} [config.type] - Schema.org @type (for structured data)
 */
export const useSEOMeta = (config) => {
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      ogImage = 'https://www.nipun.space/images/Model.jpg',
      ogUrl = window.location.href,
      canonical,
      robots = 'index, follow',
      type = 'WebPage'
    } = config;

    // Set page title
    document.title = title;

    // Helper to set/update meta tag
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard meta tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', robots);

    // OpenGraph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', ogUrl, true);
    setMeta('og:type', 'website', true);

    // Twitter Card
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:card', 'summary_large_image');

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    return () => {
      // Cleanup on unmount (restore defaults if needed)
      document.title = 'Nipun Sujesh — AI Engineer & Full-Stack Developer';
    };
  }, [config]);
};
