import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayouts() {
  return (
    <div className="app-shell">
              <header className="app-header">
                <div className="app-header__inner">
                  <div className="brand">
                    <h1 className="brand__title">Zero Trust Client</h1>
                    <p className="brand__subtitle">Users management</p>
                  </div>
                </div>
              </header>
              <main className="container">
                <Outlet />
              </main>
        </div>
  );
}

export default GuestLayouts;
