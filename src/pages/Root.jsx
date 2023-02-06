import React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="">
      root<Link to="/anime">hi</Link>
    </div>
  );
}
