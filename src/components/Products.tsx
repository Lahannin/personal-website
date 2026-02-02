import { motion } from "framer-motion";
import { Monitor, Cpu, Headset, Rocket, Play } from "lucide-react";
import gooddataLogo from "@/assets/gooddata-logo.jpg";
import trezorLogo from "@/assets/trezor-logo.jpg";

interface Product {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  videoId?: string;
}

interface ProductCategory {
  title: string;
  icon: React.ReactNode;
  products: Product[];
}

const categories: ProductCategory[] = [
  {
    title: "Software",
    icon: <Monitor className="w-5 h-5" />,
    products: [
      {
        name: "GoodData Cloud",
        description: "A fully managed, API-first analytics platform combining BI, AI, and Analytics Lake. Enables businesses to build custom data applications with AI-assisted analytics.",
        url: "https://www.gooddata.com/",
        logo: gooddataLogo,
      },
      {
        name: "GoodData.CN",
        description: "Self-hosted version of GoodData Cloud. Scalable microservices architecture deployable in containers alongside data in public/private cloud or on-premises.",
        url: "https://www.gooddata.com/",
        logo: gooddataLogo,
      },
    ],
  },
  {
    title: "Hardware",
    icon: <Cpu className="w-5 h-5" />,
    products: [
      {
        name: "Trezor Safe 5",
        description: "Hardware wallet with vibrant color touchscreen and haptic feedback for everyday crypto security.",
        url: "https://trezor.io/trezor-safe-5",
        logo: trezorLogo,
      },
      {
        name: "Trezor Safe 7",
        description: "The hardware wallet that redefines crypto security forever — radically transparent, fully wireless, and quantum-ready.",
        url: "https://trezor.io/trezor-safe-7",
        logo: trezorLogo,
        videoId: "NYJHD7MNlTM",
      },
    ],
  },
  {
    title: "Services",
    icon: <Headset className="w-5 h-5" />,
    products: [
      {
        name: "Trezor Expert",
        description: "Personalized onboarding service with one-on-one video guidance for setting up your hardware wallet and learning security best practices.",
        url: "https://trezor.io/trezor-expert",
        logo: trezorLogo,
      },
    ],
  },
];

const ProductCard = ({ product, productIndex }: { product: Product; productIndex: number }) => {
  if (product.videoId) {
    // Featured product with video - spans full width
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: productIndex * 0.05 }}
        className="md:col-span-2 card-gradient border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Video embed */}
          <div className="relative aspect-video md:aspect-auto">
            <iframe
              src={`https://www.youtube.com/embed/${product.videoId}`}
              title={`${product.name} launch video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
          
          {/* Product info */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 flex flex-col justify-center"
          >
            <div className="flex items-start gap-4">
              {product.logo && (
                <img
                  src={product.logo}
                  alt={`${product.name} logo`}
                  className="w-12 h-12 rounded-lg object-contain bg-white p-1 flex-shrink-0"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Launch Video
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors mb-2">
                  {product.name}
                  <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    );
  }

  // Standard product card
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: productIndex * 0.05 }}
      className="group card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        {product.logo && (
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            className="w-12 h-12 rounded-lg object-contain bg-white p-1 flex-shrink-0"
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors mb-2">
            {product.name}
            <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              ↗
            </span>
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

const Products = () => {
  return (
    <section id="products" aria-labelledby="products-heading" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">PRODUCT LAUNCHES</span>
            <h2 id="products-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Products I've <span className="text-gradient">Launched</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Key products and features I've brought to market through strategic positioning, messaging, and go-to-market execution.
            </p>
          </motion.div>

          {/* Product categories */}
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                {/* Products grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {category.products.map((product, productIndex) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      productIndex={productIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional launches callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary/5 border border-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                Plus <span className="font-semibold text-foreground">20+ other feature launches</span> across software, hardware, and services
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Products;
