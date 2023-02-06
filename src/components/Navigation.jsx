import React from "react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { href: "/", name: "Home" },
  { href: "search", name: "Search" },
  { href: "anime", name: "Anime" },
];

function NavigationItem({ href, name }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `px-2 transition duration-200 ${
          isActive ? "text-primary" : "text-gray-300"
        }`
      }
    >
      {name}
    </NavLink>
  );
}
//isActive ? "text-[#348fff]" : "text-slate-200"
export default function Navigation() {
  return (
    <div className="w-full top-0 absolute h-16">
      <div className="flex flex-row justify-between w-full max-w-4xl items-center mx-auto h-full p-2">
        <div>aniwatch</div>
        <div className="flex flex-row items-center">
          {navigationItems.map((item) => (
            <NavigationItem {...item} key={item.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
