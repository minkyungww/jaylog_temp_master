import React from "react";

const WriteLayout = ({ children }) => {
  return (
    <div
      className="bg-light"
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      {children}
    </div>
  );
};

export default WriteLayout;
