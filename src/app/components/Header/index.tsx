import { AuthContext } from "@/app/contexts/AuthContext";
import { PeopleTableContext } from "@/app/contexts/PeopleTableContext";
import { useContext } from "react";

export function Header() {
  const { user, login, logout } = useContext(AuthContext);
  const { saveCurrentColumnState, loadPreviousColumnState } =
    useContext(PeopleTableContext);

  function handleOnLoginClicked() {
    login();
  }

  function handleOnLogoutClicked() {
    logout();
  }

  function handleOnSaveClicked() {
    saveCurrentColumnState();
  }

  function handleOnLoadClicked() {
    loadPreviousColumnState();
  }

  return (
    <header>
      {user ? (
        <>
          <button className="mr-2" onClick={handleOnSaveClicked}>
            Save
          </button>
          <button className="mr-2" onClick={handleOnLoadClicked}>
            Load
          </button>

          <span className="mr-2">User: {user.email}</span>
          <button onClick={handleOnLogoutClicked}>Logout</button>
        </>
      ) : (
        <button onClick={handleOnLoginClicked}>Login</button>
      )}
    </header>
  );
}
