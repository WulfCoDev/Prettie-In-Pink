import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className=" p-8 w-2/3 bg-map bg-cover bg-no-repeat bg-center text-center flex justify-center border-2 border-white">
      <div className="bg-pink-300/60 p-4 w-fit rounded-lg">
        <h2 className="text-3xl font-bold">
          Sign Up for Free & Book Your Glow
        </h2>
        <p className="mt-2">In-home appointments only</p>
        <p className="mt-2">Inland Empire Area</p>
        <div className="flex justify-center mt-4 text-pink-500">
          <FaMapMarkerAlt size={30} />
        </div>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Contact;
