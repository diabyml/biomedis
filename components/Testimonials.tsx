"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";

// Import CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  .slick-slide {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
  .slick-slide.slick-active {
    opacity: 1;
  }
`;

export default function Testimonials() {
  const sliderRef = React.useRef<Slider>(null);
  const { testimonials, isLoading, error } = useTestimonials({
    featuredOnly: true,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-12"></div>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que disent nos clients et partenaires
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <StyledSlider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="px-4 transition-opacity duration-300 ease-in-out"
              >
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="mb-4">
                    <Image
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto object-cover"
                    />
                  </div>
                  <blockquote className="text-xl italic mb-4">
                    {testimonial.quote}
                  </blockquote>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.designation}</p>
                  <p className="text-gray-500">{testimonial.company}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </StyledSlider>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="text-center mt-12">
          <p className="mb-4 text-lg">
            Rejoignez notre liste croissante de clients satisfaits
          </p>
          <Button asChild>
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
