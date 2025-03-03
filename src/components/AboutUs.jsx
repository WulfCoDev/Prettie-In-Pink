const AboutUs = () => {
  return (
    <div className="w-2/3 p-8 text-center bg-pink-300/50 border-2 border-white">
      <h2 className="text-3xl font-bold">Your Glow, My Passion</h2>
      <p className="text-lg mt-4">
        At Prettie In Pink, we believe self-care is self-love.
      </p>
      <div className="mt-6 flex justify-center">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md shadow-black max-w-sm text-center">
          <img
            src="/images/lena.JPG"
            alt="Esthetician"
            className="w-32 h-32 mx-auto rounded-full shadow-md shadow-black"
          />
          <h3 className="text-xl font-semibold mt-4">Lena Velasquez</h3>
          <p className="text-gray-700">Licensed Esthetician</p>
          <p className="mt-2 text-sm">
            Specializing in facials, waxing, and lash extensions, I am dedicated
            to helping you achieve radiant skin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
