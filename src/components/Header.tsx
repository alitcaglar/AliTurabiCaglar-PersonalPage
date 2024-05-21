"use client";

import { DiAtom } from "react-icons/di";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  interface NavLink {
    title: string;
    path: string;
  }

  const generatePath = (title: string): string => {
    return "/" + title.toLowerCase().replace(/\s+/g, "-");
  };

  const pathname = usePathname();

  // path only lowercase!!!
  const navLinks: NavLink[] = [
    { title: "My Projects", path: "/my-projects" },
    { title: "About Me", path: "/about-me" },
    { title: "News", path: "/news" },
    { title: "Contact", path: "/contact" },
  ];
  // path only lowercase!!!

  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <header className="flex justify-between backdrop-blur-sm fixed top-0 left-0 right-0">
        <Link
          href="/"
          className="flex items-center m-2 ml-3 text-lime-600 dark:text-lime-400 hover:text-teal-600 dark:hover:text-teal-400 hover:transition hover:duration-300"
        >
          <p className="text-6xl drop-shadow-md">
            <DiAtom />
          </p>
          <span className="p-3 font-bold drop-shadow-md">
            Ali Turabi Caglar.
          </span>
          <span className="sm:hidden font-bold opacity-40 text-lime-600">
            {pathname.replaceAll("-", " ")}
          </span>
        </Link>
        <nav className="flex items-center">
          <button
            onClick={() => setOpenNav(!openNav)}
            className={
              "sm:hidden text-3xl mr-4 transition duration-300" +
              (openNav ? " text-teal-500" : " text-lime-800")
            }
          >
            <CiMenuBurger />
          </button>
          <ul
            className={
              "sm:flex items-center mr-3" +
              (openNav
                ? "left-4 fixed top-[73px] right-0 px-8 drop-shadow-lg bg-slate-200 dark:bg-slate-800 bg-opacity-90 rounded-lg w-full"
                : " hidden")
            }
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;
              return (
                <li
                  className={
                    isActive
                      ? "p-2 font-semibold bg-gradient-to-r from-teal-500 to-lime-500 bg-clip-text text-transparent text-center "
                      : "p-2 font-semibold text-slate-500  hover:bg-gradient-to-r hover:from-teal-500 hover:to-lime-500 hover:bg-clip-text hover:text-transparent hover:transition hover:ease-in-out hover:duration-300 text-center hover:drop-shadow-md"
                  }
                  key={index}
                >
                  <Link href={link.path} onClick={() => setOpenNav(false)}>
                    {link.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </header>
      <div className="fixed top-[71px] w-full bg-gradient-to-l from-transparent via-teal-500 to-transparent h-[2px] bg-contain"></div>
    </>
  );
}
