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
    canonical.href = `https://laurihanninen.com/articles/${article.slug}/`;
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
    ogUrl.content = `https://laurihanninen.com/articles/${article.slug}/`;
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

    // Twitter Card tags
    const twitterEls: HTMLMetaElement[] = [];
    const twitterCard = document.createElement("meta");
    twitterCard.name = "twitter:card";
    twitterCard.content = article.coverImage ? "summary_large_image" : "summary";
    document.head.appendChild(twitterCard);
    twitterEls.push(twitterCard);

    const twitterTitle = document.createElement("meta");
    twitterTitle.name = "twitter:title";
    twitterTitle.content = `${article.title} | Lauri Hänninen`;
    document.head.appendChild(twitterTitle);
    twitterEls.push(twitterTitle);

    const twitterDesc = document.createElement("meta");
    twitterDesc.name = "twitter:description";
    twitterDesc.content = article.description;
    document.head.appendChild(twitterDesc);
    twitterEls.push(twitterDesc);

    const twitterSite = document.createElement("meta");
    twitterSite.name = "twitter:site";
    twitterSite.content = "@lahannin";
    document.head.appendChild(twitterSite);
    twitterEls.push(twitterSite);

    const twitterCreator = document.createElement("meta");
    twitterCreator.name = "twitter:creator";
    twitterCreator.content = "@lahannin";
    document.head.appendChild(twitterCreator);
    twitterEls.push(twitterCreator);

    if (article.coverImage) {
      const twitterImage = document.createElement("meta");
      twitterImage.name = "twitter:image";
      twitterImage.content = `https://laurihanninen.com${article.coverImage}`;
      document.head.appendChild(twitterImage);
      twitterEls.push(twitterImage);
    }

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date + "-01",
      ...(article.dateModified ? { dateModified: article.dateModified + "-01" } : {}),
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
      url: `https://laurihanninen.com/articles/${article.slug}/`,
      mainEntityOfPage: `https://laurihanninen.com/articles/${article.slug}/`,
      ...(article.coverImage
        ? { image: `https://laurihanninen.com${article.coverImage}` }
        : {}),
    });
    document.head.appendChild(jsonLd);

    const breadcrumbLd = document.createElement("script");
    breadcrumbLd.type = "application/ld+json";
    breadcrumbLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://laurihanninen.com" },
        { "@type": "ListItem", position: 2, name: "Articles", item: "https://laurihanninen.com/articles" },
        { "@type": "ListItem", position: 3, name: article.title, item: `https://laurihanninen.com/articles/${article.slug}` },
      ],
    });
    document.head.appendChild(breadcrumbLd);

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
      twitterEls.forEach((el) => document.head.removeChild(el));
      document.head.removeChild(jsonLd);
      document.head.removeChild(breadcrumbLd);
    };
  }, [article]);

  return null;
};

export default ArticleHead;
