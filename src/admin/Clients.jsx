import AdminDashboard from "./AdminDashboard";
import { Clients } from "wasp/client/crud";
import { useState } from "react";

const ClientsPanel = () => {
  const { data: clients, isLoading, error } = Clients.getAll.useQuery();

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
      <h1 className="text-2xl font-bold">Clients</h1>
      <p>Manage all registered clients here.</p>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.email}</td>
              <td>{client.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminDashboard>
  );
};

export default ClientsPanel;
