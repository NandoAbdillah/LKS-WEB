import { Outlet } from "react-router-dom";

const VotingBridge = () => {
  return (
    <div className="mt-0 pt-5 bg-body-tertiary min-vh-100 ">
      <Outlet />
    </div>
  );
};

export default VotingBridge;
