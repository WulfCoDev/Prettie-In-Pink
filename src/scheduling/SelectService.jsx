import { Services } from "wasp/client/crud";

const SelectService = ({ selectedServices, setSelectedServices }) => {
  const { data: services, isLoading, error } = Services.getAll.useQuery();

  const handleServiceClick = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.find((s) => s.id === service.id);
      return isSelected
        ? prev.filter((s) => s.id !== service.id) // Remove if already selected
        : [...prev, service]; // Add if not selected
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="border p-4 rounded-md bg-white shadow-md">
      <label className="block text-lg mb-2">Choose a Service:</label>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const isSelected = selectedServices.find((s) => s.id === service.id);
          return (
            <div
              key={service.id}
              className={`p-4 border rounded-md cursor-pointer ${
                isSelected ? "bg-pink-500 text-white" : "bg-pink-200"
              }`}
              onClick={() => handleServiceClick(service)}
            >
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p>{service.description}</p>
              <p>
                ${service.price} | {service.lengthMinutes} mins
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectService;
