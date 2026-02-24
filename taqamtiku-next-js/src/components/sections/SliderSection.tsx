import urlFor from "@/lib/urlFor";
import { SliderSectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

interface SliderSectionProps {
  section: SliderSectionType;
}

export default function SliderSection({ section }: SliderSectionProps) {
  return (
    <section className="section__slider">
      <Carousel interval={4000} fade>
        {section.slides?.map((slide) => {
          const slideImageUrl = slide.image
            ? urlFor(slide.image)
                .size(1920, 1281)
                .fit("crop")
                .crop("center")
                .url()
            : "";
          return (
            <CarouselItem key={slide._key}>
              <div className="carousel-image-wrapper">
                <Image
                  src={slideImageUrl}
                  fill
                  priority
                  alt={slide.title}
                  className="carousel-image"
                />
              </div>
              {(slide.title || slide.description) && (
                <CarouselCaption className={slide.captionPosition}>
                  <div
                    className={`carousel-caption__wrapper ${slide.captionPosition}`}
                  >
                    {slide.title && <h3 className="vidaloka">{slide.title}</h3>}
                    {slide.description && <p>{slide.description}</p>}
                    {slide.ctaText && slide.ctaUrl && (
                      <Link className="btn btn-primary" href={slide.ctaUrl}>
                        {slide.ctaText}
                      </Link>
                    )}
                  </div>
                </CarouselCaption>
              )}
            </CarouselItem>
          );
        })}
      </Carousel>
    </section>
  );
}
