import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext } from "react";

export function Header() {
  const { user, login, logout } = useContext(AuthContext);

  function handleOnLoginClicked() {
    login();
  }

  function handleOnLogoutClicked() {
    logout();
  }

  return (
    <header>
      {user ? (
        <>
          <button className="mr-2">Save</button>
          <button className="mr-2">Load</button>

          <span className="mr-2">User: {user.email}</span>
          <button onClick={handleOnLogoutClicked}>Logout</button>
        </>
      ) : (
        <button onClick={handleOnLoginClicked}>Login</button>
      )}
    </header>
  );
}
