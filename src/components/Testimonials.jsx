import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="p-8 w-2/3 text-center border-2 bg-pink-300/50 border-white">
      <h2 className="text-3xl font-bold">What Our Clients Say</h2>
      <div className="flex justify-around space-x-4">
        <div className="mt-6">
          <div className="p-4 border rounded-lg border-white shadow-md shadow-black bg-white w-fit">
            <p>"Best facial experience ever! My skin is glowing!"</p>
            <div className="flex justify-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p>-Lily</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 border rounded-lg border-white shadow-md shadow-black bg-white w-fit">
            <p>"Had the most relaxing time of my life! Lena's the best!"</p>
            <div className="flex justify-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p>-Lydia</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 border rounded-lg border-white shadow-md shadow-black bg-white w-fit">
            <p>
              "My skin has never felt so smooth. Will definately be coming
              back."
            </p>
            <div className="flex justify-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p>-Christian</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
