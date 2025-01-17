import { Outlet } from "react-router-dom";

function layout() {
  return (
    <>
      <h2>layout</h2>
      <Outlet />
    </>
  );
}

export default layout;
