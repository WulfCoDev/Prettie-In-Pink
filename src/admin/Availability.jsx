import AdminDashboard from "./AdminDashboard";
import { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Availability } from "wasp/client/crud";

const AvailabilityPanel = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelecteday] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00"); // 5:00 PM

  const {
    data: availability,
    isLoading,
    error,
  } = Availability.getAll.useQuery();
  const createAvailability = Availability.create.useAction();
  const updateAvailability = Availability.update.useAction();
  const deleteAvailability = Availability.delete.useAction();

  const handleOpenAddForm = () => {
    setIsOpen(!isOpen);
  };

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(
      parseInt(start.split(":")[0]),
      parseInt(start.split(":")[1]),
      0,
      0
    );

    const endTime = new Date();
    endTime.setHours(
      parseInt(end.split(":")[0]),
      parseInt(end.split(":")[1]),
      0,
      0
    );

    while (currentTime <= endTime) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours % 12 || 12}:${
        minutes === 0 ? "00" : minutes
      } ${period}`;
      slots.push(formattedTime);
      currentTime.setHours(currentTime.getHours() + 1);
    }
    return slots;
  };

  const handleSubmitMultipleAvailabilities = async (e) => {
    e.preventDefault();

    // Generate time slots based on the selected start and end times
    const timeSlots = generateTimeSlots(startTime, endTime);

    try {
      // Loop through and create availability entries for each time slot
      for (const time of timeSlots) {
        await createAvailability({
          date: selectedDate.toISOString().split("T")[0],
          time: time,
        });
      }

      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 1000);
    } catch (error) {
      console.error("Error creating multiple availabilities:", error);
    }
  };

  const handleCreateAvailability = async (e) => {
    e.preventDefault();

    // Combine selected date and time into a single Date object
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const availabilityDateTime = new Date(selectedDate);
    availabilityDateTime.setHours(hours, minutes, 0, 0); // Set selected time

    // Convert to 12-hour format with AM/PM
    let formattedTime = availabilityDateTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Set to true for 12-hour format
    });

    try {
      await createAvailability({
        date: selectedDate.toISOString().split("T")[0],
        time: formattedTime, // Save the time in 12-hour format
      });

      setIsNotificationVisible(true);

      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 1000); // 1000 ms = 1 second

      // Reset form and close modal
      setSelectedDate(new Date());
      setSelectedTime("10:00");
    } catch (error) {
      console.error("Error creating availability:", error);
    }
  };

  const handleDelete = (availabilityId) => {
    if (window.confirm("Are you sure you want to delete this date and time?")) {
      deleteAvailability({ id: availabilityId });
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
      <h1 className="text-2xl font-bold">Availability</h1>
      <p>View and Set Availability Here.</p>
      <button
        className="bg-pink-200 p-2 rounded-md"
        onClick={handleOpenAddForm}
      >
        {isOpen ? "Close" : "Add Availability"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-fit">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Set Availability</h2>
              <button onClick={handleOpenAddForm}>Close</button>
            </div>

            {/* Flex container to display the forms side by side */}
            <div className="flex space-x-6">
              {/* Single Availability Form */}
              <form
                className="flex flex-col space-y-6 w-1/2"
                onSubmit={handleCreateAvailability}
              >
                <div className="flex flex-col space-y-2">
                  <label className="block font-medium">Select Time:</label>
                  <TimePicker
                    onChange={setSelectedTime}
                    value={selectedTime}
                    className="border rounded-md p-2 w-full text-lg"
                    clockClassName="text-lg"
                    disableClock={true}
                  />
                  <p className="text-gray-700 font-semibold">
                    Selected Time: {selectedTime}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="block font-medium">Select Date:</label>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="border rounded-md p-2 w-full"
                    tileClassName={({ date, view }) =>
                      view === "month" &&
                      date.toDateString() === selectedDate.toDateString()
                        ? "bg-blue-500 text-white rounded-full font-bold"
                        : "text-black"
                    }
                  />
                  <p className="text-gray-700 font-semibold">
                    Selected Date: {selectedDate.toDateString()}
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleOpenAddForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>

              {/* Multiple Availability Form */}
              <form
                onSubmit={handleSubmitMultipleAvailabilities}
                className="flex flex-col space-y-6 w-1/2"
              >
                <div className="flex flex-col space-y-2">
                  <label className="block font-medium">Start Time:</label>
                  <TimePicker
                    onChange={setStartTime}
                    value={startTime}
                    className="border rounded-md p-2 w-full text-lg"
                    clockClassName="text-lg"
                    disableClock={true}
                  />
                  <label className="block font-medium">End Time:</label>
                  <TimePicker
                    onChange={setEndTime}
                    value={endTime}
                    className="border rounded-md p-2 w-full text-lg"
                    clockClassName="text-lg"
                    disableClock={true}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="block font-medium">Select Date:</label>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="border rounded-md p-2 w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Multiple Availabilities
                </button>
              </form>
            </div>
          </div>

          {isNotificationVisible && (
            <div className="notification">
              <p>Availability successfully created!</p>
            </div>
          )}

          <style jsx>{`
            .notification {
              position: fixed;
              top: 20px;
              right: 20px;
              background-color: green;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              z-index: 9999;
              opacity: 1;
              transition: opacity 0.3s ease-in-out;
            }
          `}</style>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">Time Slots</h1>
        <p>Manage all time slots here.</p>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((availability, index) => (
              <tr key={availability.id}>
                <td>{availability.date}</td>
                <td>{availability.time}</td>
                <td>
                  <button
                    onClick={() => handleDelete(availability.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminDashboard>
  );
};

export default AvailabilityPanel;
