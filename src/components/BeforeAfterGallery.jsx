import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const BeforeAfterGallery = () => {
  const images = [
    { before: "/images/b1.png", after: "/images/a1.png" },
    { before: "/images/b2.png", after: "/images/a2.png" },
    { before: "/images/b3.png", after: "/images/a3.png" },
  ];

  return (
    <section className="py-12 bg-gray-100 w-2/3">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Before & After Gallery
        </h2>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          className="w-full max-w-lg mx-auto"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center space-x-4">
              <img
                className="w-full rounded-lg shadow-md"
                src={image.before}
                alt="Before treatment"
              />
              <img
                className="w-full rounded-lg shadow-md mt-4"
                src={image.after}
                alt="After treatment"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
