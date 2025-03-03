import AdminDashboard from "./AdminDashboard";
import { Services } from "wasp/client/crud";
import { useState } from "react";

const ServicesPanel = () => {
  const { data: services, isLoading, error } = Services.getAll.useQuery();
  const createService = Services.create.useAction();
  const updateService = Services.update.useAction();
  const deleteService = Services.delete.useAction();
  const [newService, setNewService] = useState({
    title: "",
    price: "",
    lengthMinutes: "",
    description: "",
    category: "Facial",
  });
  const [editingService, setEditingService] = useState(null);
  const categoryOptions = ["Facial", "Eyelash", "Wax", "Other"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new service submission
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) return;

    createService({
      title: newService.title,
      price: Number(newService.price),
      lengthMinutes: Number(newService.lengthMinutes),
      description: newService.description,
      category: newService.category,
    });

    setNewService({
      title: "",
      price: "",
      lengthMinutes: "",
      description: "",
      category: "Facial",
    });
  };

  // Handle edit button click
  const handleEditClick = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  // Handle update submission
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingService) return;

    updateService({
      id: editingService.id,
      title: newService.title,
      price: Number(newService.price),
      lengthMinutes: Number(newService.lengthMinutes),
      description: newService.description,
      category: newService.category,
    });

    setEditingService(null);
    setNewService({
      title: "",
      price: "",
      lengthMinutes: "",
      description: "",
      category: "Facial",
    });
  };

  const handleDelete = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService({ id: serviceId });
    }
  };

  if (isLoading)
    return (
      <AdminDashboard>
        <p>Loading...</p>
      </AdminDashboard>
    );
  if (error)
    return (
      <AdminDashboard>
        <p>Error: {error.message}</p>
      </AdminDashboard>
    );

  return (
    <AdminDashboard>
      <div>
        <h1>Services</h1>

        {/* Form for adding/editing services */}
        <form
          onSubmit={editingService ? handleUpdate : handleCreate}
          className="space-y-4 space-x-4 *:p-2 *:rounded-md"
        >
          <input
            type="text"
            name="title"
            placeholder="Service Title"
            value={newService.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newService.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="lengthMinutes"
            placeholder="Duration (minutes)"
            value={newService.lengthMinutes}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newService.description}
            onChange={handleChange}
          />
          <select
            name="category"
            value={newService.category}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-slate-600 p-2 rounded-md text-white"
          >
            {editingService ? "Update Service" : "Add Service"}
          </button>
        </form>

        {/* List of Services */}
        <ul>
          {services.map((service) => (
            <li key={service.id} className="m-2">
              <div className="bg-white rounded-md flex flex-col w-64 p-2">
                <p>
                  {service.title} -{" "}
                  <span className="text-sm text-gray-400">
                    {service.category}
                  </span>
                </p>
                <p className="inline-block">
                  ${service.price} | {service.lengthMinutes} min
                </p>
                <p>{service.description}</p>
                <div>
                  <button
                    onClick={() => handleEditClick(service)}
                    className="bg-slate-600 p-1 m-2 rounded-md text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-600 p-1 m-2 rounded-md text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminDashboard>
  );
};

export default ServicesPanel;
