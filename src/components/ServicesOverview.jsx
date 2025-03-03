const ServicesOverview = () => {
  return (
    <div className="p-8 w-2/3 bg-pink-300/50 text-center border-2 border-white">
      <h2 className="text-3xl font-bold">Luxury Treatments for Every You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow-md rounded-lg shadow-black">
          <h3 className="text-xl font-semibold">Facials</h3>
          <p>Deep nourishment for glowing skin</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg shadow-black">
          <h3 className="text-xl font-semibold">Waxing</h3>
          <p>Smooth, hair-free skin with gentle care</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg shadow-black">
          <h3 className="text-xl font-semibold">Lashes</h3>
          <p>Enhance your natural beauty</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
