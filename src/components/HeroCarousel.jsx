import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Relaxing Facials",
      description:
        "Rejuvenate your skin with our customized facial treatments.",
      buttonText: "Book Now",
      bgColor: "bg-pink-300/50",
      imgSrc: "/images/facial.jpg",
    },
    {
      title: "Smooth & Flawless Waxing",
      description:
        "Say goodbye to unwanted hair with our gentle waxing services.",
      buttonText: "See Services",
      bgColor: "bg-pink-300/50",
      imgSrc: "/images/wax.jpg",
    },
    {
      title: "Lash Extensions",
      description: "Enhance your natural beauty with stunning lash extensions.",
      buttonText: "Get Gorgeous Lashes",
      bgColor: "bg-pink-300/50",
      imgSrc: "/images/eyelash.jpg",
    },
  ];

  return (
    <div className="w-2/3 h-[500px] border-2 border-white">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20} // Reduced spacing for a tighter layout
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`flex flex-col md:flex-row items-center h-full p-6 md:p-12 text-white ${slide.bgColor}`}
            >
              {/* Left Side - Text Content */}
              <div className="w-full md:w-1/2 text-center px-4">
                <h1 className="text-2xl md:text-4xl font-bold">
                  {slide.title}
                </h1>
                <p className="mt-3 text-base md:text-lg">{slide.description}</p>
                <button className="mt-5 px-6 py-2 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-300 transition">
                  {slide.buttonText}
                </button>
              </div>

              {/* Right Side - Service Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={slide.imgSrc}
                  alt={slide.title}
                  className="w-[75%] md:w-[55%] max-h-[280px] md:max-h-[350px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
