import { defineUserSignupFields } from "wasp/server/auth";

export const userSignupFields = defineUserSignupFields({
  firstName: async (data) => {
    const firstName = data.firstName?.trim();
    if (!firstName || firstName.length < 2) {
      throw new Error("First name must be at least 2 characters long.");
    }
    return firstName;
  },

  lastName: async (data) => {
    const lastName = data.lastName?.trim();
    if (!lastName || lastName.length < 2) {
      throw new Error("Last name must be at least 2 characters long.");
    }
    return lastName;
  },

  phoneNumber: async (data) => {
    const phoneNumber = data.phoneNumber?.trim();
    if (!phoneNumber || !/^\d{10,15}$/.test(phoneNumber)) {
      throw new Error("Phone number must be between 10-15 digits.");
    }
    return phoneNumber;
  },

  email: async (data) => {
    const email = data.email?.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    return email;
  },
});
