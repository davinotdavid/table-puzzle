"use client";

import { AuthContext } from "@/app/contexts/AuthContext";
import { PeopleTableContext } from "@/app/contexts/PeopleTableContext";
import { useContext } from "react";

export function Header() {
  const { user, login, logout } = useContext(AuthContext);
  const { saveCurrentColumnState, loadPreviousColumnState, resetColumnState } =
    useContext(PeopleTableContext);

  function handleOnLoginClicked() {
    login();
  }

  function handleOnLogoutClicked() {
    resetColumnState();
    logout();
  }

  function handleOnSaveClicked() {
    saveCurrentColumnState();
  }

  function handleOnLoadClicked() {
    loadPreviousColumnState();
  }

  return (
    <header className="p-4 flex items-center justify-end">
      {user ? (
        <>
          <button
            className="px-5 py-2 border-2 border-slate-400 border-solid rounded mr-2"
            onClick={handleOnSaveClicked}
          >
            Save
          </button>
          <button
            className="px-5 py-2 border-2 border-slate-400 border-solid rounded mr-2"
            onClick={handleOnLoadClicked}
          >
            Load
          </button>

          <span className="mx-8">User: {user.email}</span>
          <button
            className="px-5 py-2 border-2 border-slate-400 border-solid rounded"
            onClick={handleOnLogoutClicked}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="px-5 py-2 border-2 border-slate-400 border-solid rounded"
          onClick={handleOnLoginClicked}
        >
          Login
        </button>
      )}
    </header>
  );
}
