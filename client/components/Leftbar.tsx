import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { TbAlignBoxLeftStretch } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { CgMoreO } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";

interface Menuitem {
  name: string;
  icon: React.ReactNode;
  functional: boolean;
  redirect?: string;
}

const sidebar_menu_items: Menuitem[] = [
  { name: "Home", icon: <GoHome />, functional: true, redirect: "/home" },
  { name: "Explore", icon: <IoIosSearch />, functional: false },
  { name: "Notifications", icon: <HiOutlineBell />, functional: false },
  { name: "Messages", icon: <HiOutlineEnvelope />, functional: false },
  { name: "Grok", icon: <TbAlignBoxLeftStretch />, functional: false },
  { name: "Communities", icon: <BsPeople />, functional: false },
  { name: "Premium", icon: <FaXTwitter />, functional: false },
  { name: "Profile", icon: <FiUser />, functional: true, redirect: "/profile" },
  { name: "More", icon: <CgMoreO />, functional: true },
];

const Sidebar = () => {
  return (
    <div className="w-full h-screen max-h-screen text-gray-200 py-2 flex flex-col gap-2 justify-between overflow-y-scroll hidescrollbar">
      <div className="h-14 flex items-center justify-start px-1">
        <Link
          href="/home"
          className="text-3xl p-3 rounded-full hover:bg-gray-900 transition-all"
        >
          <FaXTwitter />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {sidebar_menu_items.map((item) => (
          <Link
            href={item.redirect || ""}
            key={item.name}
            className={`flex gap-4 w-fit rounded-full p-2 px-4 py-2 text-2xl items-center justify-start hover:bg-gray-900 ${
              item.functional ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <span className="">{item.icon}</span>
            <span className="text-lg tracking-wider">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex w-full">
        <button className="p-3 w-full mr-4 text-lg font-bold tracking-wider bg-sky-600 hover:bg-sky-700 rounded-full">
          Post
        </button>
      </div>
      <div className="flex gap-3 px-4 py-2 items-center justify-between rounded-full mr-4 hover:bg-gray-900 cursor-pointer">
        <span className="text-4xl">
          <FaRegCircleUser />
        </span>
        <div className="flex flex-col flex-1 font-bold tracking-wide text-gray-300">
          <p className="h-fit text-sm">UserName</p>
          <p className="h-fit text-xs">user@145</p>
        </div>
        <span className="text-2xl cursor-pointer">
          <IoIosMore />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
