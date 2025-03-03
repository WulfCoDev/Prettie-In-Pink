import { logout } from "wasp/client/auth";

const LogoutButton = () => {
  return <button onClick={logout}>Logout</button>;
};
export default LogoutButton;
