import { useEffect } from "react";
import type { ArticleEntry } from "@/data/articles";

interface ArticleHeadProps {
  article: ArticleEntry;
}

const ArticleHead = ({ article }: ArticleHeadProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${article.title} | Lauri Hänninen (Hanninen)`;

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = `${article.summary.slice(0, 155)}… By Lauri Hänninen, Product Marketing Lead.`;
    document.head.appendChild(meta);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `https://laurihanninen.com/articles/${article.slug}`;
    document.head.appendChild(canonical);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = `${article.title} | Lauri Hänninen`;
    document.head.appendChild(ogTitle);

    const ogDesc = document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    ogDesc.content = article.description;
    document.head.appendChild(ogDesc);

    const ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    ogUrl.content = `https://laurihanninen.com/articles/${article.slug}`;
    document.head.appendChild(ogUrl);

    const ogType = document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    ogType.content = "article";
    document.head.appendChild(ogType);

    const ogSiteName = document.createElement("meta");
    ogSiteName.setAttribute("property", "og:site_name");
    ogSiteName.content = "Lauri Hänninen";
    document.head.appendChild(ogSiteName);

    const ogImageEls: HTMLMetaElement[] = [];
    if (article.coverImage) {
      const ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      ogImage.content = `https://laurihanninen.com${article.coverImage}`;
      document.head.appendChild(ogImage);
      ogImageEls.push(ogImage);

      const ogImageW = document.createElement("meta");
      ogImageW.setAttribute("property", "og:image:width");
      ogImageW.content = "1200";
      document.head.appendChild(ogImageW);
      ogImageEls.push(ogImageW);

      const ogImageH = document.createElement("meta");
      ogImageH.setAttribute("property", "og:image:height");
      ogImageH.content = "630";
      document.head.appendChild(ogImageH);
      ogImageEls.push(ogImageH);
    }

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.date + "-01",
      author: {
        "@type": "Person",
        "@id": "https://laurihanninen.com/#person",
        name: "Lauri Hänninen",
        alternateName: ["Lauri Hanninen", "Lauri Haenninen"],
        url: "https://laurihanninen.com",
      },
      publisher: {
        "@type": "Organization",
        name: article.publication,
      },
      url: `https://laurihanninen.com/articles/${article.slug}`,
      mainEntityOfPage: `https://laurihanninen.com/articles/${article.slug}`,
      ...(article.coverImage
        ? { image: `https://laurihanninen.com${article.coverImage}` }
        : {}),
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
      document.head.removeChild(canonical);
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDesc);
      document.head.removeChild(ogUrl);
      document.head.removeChild(ogType);
      document.head.removeChild(ogSiteName);
      ogImageEls.forEach((el) => document.head.removeChild(el));
      document.head.removeChild(jsonLd);
    };
  }, [article]);

  return null;
};

export default ArticleHead;
