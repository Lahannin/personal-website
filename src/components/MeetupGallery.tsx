import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import meetup1 from "@/assets/meetup-1.jpg";
import meetup2 from "@/assets/meetup-2.jpg";
import meetup3 from "@/assets/meetup-3.jpg";
import meetup4 from "@/assets/meetup-4.jpg";
import meetup5 from "@/assets/meetup-5.jpg";
import meetup6 from "@/assets/meetup-6.jpg";
import meetup7 from "@/assets/meetup-7.jpg";

const photos = [
  { src: meetup1, alt: "Product Marketing Alliance Prague meetup dinner" },
  { src: meetup2, alt: "PMA Prague Christmas meetup" },
  { src: meetup3, alt: "Product marketing community gathering in Prague" },
  { src: meetup4, alt: "PMA Prague meetup group photo" },
  { src: meetup5, alt: "Product marketing dinner meetup" },
  { src: meetup6, alt: "PMA Prague community dinner event" },
  { src: meetup7, alt: "PMA Prague meetup at a café" },
];

const MeetupGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="meetups" aria-labelledby="meetups-heading" className="py-24 md:py-32 relative z-10 bg-secondary/30">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">COMMUNITY</span>
            <h2 id="meetups-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Meetups I've <span className="text-gradient">Organized</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Building the product marketing community in Prague, one meetup at a time.
            </p>
          </motion.div>

          {/* Masonry-style gallery */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="rounded-xl overflow-hidden border border-border shadow-md group-hover:shadow-xl group-hover:border-primary/30 transition-all duration-300">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-background hover:text-primary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={photos[selectedPhoto].src}
            alt={photos[selectedPhoto].alt}
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
};

export default MeetupGallery;
