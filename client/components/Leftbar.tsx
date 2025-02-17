"use client";
import React, { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { TbAlignBoxLeftStretch } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import { CgMoreO } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";
import { useGetCurrentUserDetails } from "@hooks/user";
import Image from "next/image";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@node_modules/next/navigation";

interface Menuitem {
  name: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  functional: boolean;
  redirect?: string;
}

const Sidebar = () => {
  const { user } = useGetCurrentUserDetails();
  const queryClient = useQueryClient();
  const [path, setPath] = useState("");
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("X_token");
    toast.success("Logged Out Successfully");
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
    window.location.replace("/");
  };

  const sidebar_menu_items: Menuitem[] = [
    {
      name: "Home",
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
      functional: true,
      redirect: "/home",
    },
    { name: "Explore", icon: <IoIosSearch />, functional: false },
    { name: "Notifications", icon: <HiOutlineBell />, functional: false },
    { name: "Messages", icon: <HiOutlineEnvelope />, functional: false },
    { name: "Grok", icon: <TbAlignBoxLeftStretch />, functional: false },
    { name: "Communities", icon: <BsPeople />, functional: false },
    { name: "Premium", icon: <FaXTwitter />, functional: false },
    {
      name: "Profile",
      icon: <HiOutlineUser />,
      activeIcon: <HiUser />,
      functional: user ? true : false,
      redirect: `/user/${user ? user.id : ""}`,
    },
    { name: "More", icon: <CgMoreO />, functional: true },
  ];
  return (
    <div className="w-full h-screen max-h-screen text-gray-200 py-2 flex flex-col gap-1 overflow-y-scroll hidescrollbar">
      <div className="h-14 flex items-center justify-center sm:justify-end lg:justify-start sm:pr-4 lg:px-2">
        <Link
          href="/home"
          className="text-3xl p-3 rounded-full hover:bg-gray-900 transition-all"
        >
          <FaXTwitter />
        </Link>
      </div>
      <div className="flex flex-col gap-2 sm:pr-5 lg:pr-0 lg:gap-0 items-center sm:items-end lg:items-start lg:px-2">
        {sidebar_menu_items.map((item) => (
          <Link
            href={item.redirect || ""}
            key={item.name}
            className={`flex gap-4 w-fit rounded-full p-2 lg:px-4 text-2xl items-center justify-start hover:bg-gray-900 ${
              item.functional ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <span className="text-3xl lg:text-2xl">
              {item.redirect
                ? item.redirect === path
                  ? item.activeIcon
                  : item.icon
                : item.icon}
            </span>
            <span
              className={`text-lg text-slate-300 font-semibold ${
                item.redirect
                  ? item.redirect === path
                    ? "font-extrabold text-white"
                    : ""
                  : ""
              } tracking-wide hidden lg:inline`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-end lg:justify-start px-2">
        <button className="p-3 w-full text-lg font-bold tracking-wider bg-sky-600 hover:bg-sky-700 rounded-full justify-center hidden lg:flex">
          Post
        </button>
        <button className="p-2 mt-2 sm:mr-4 lg:mr-0 bg-sky-600 hover:bg-sky-700 rounded-full lg:hidden">
          <svg
            className="fill-current block h-6 w-6 xl:hidden"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
            </g>
          </svg>
        </button>
      </div>
      {user ? (
        <div className="w-full flex-1 flex-col self-end px-2 flex items-center sm:items-end lg:items-start justify-end">
          <div className="gap-3 w-full h-fit p-2 my-2 items-center justify-between rounded-full mr-4 bg-gray-900 cursor-pointer hidden lg:flex">
            {user.profileImgUrl ? (
              <Image
                src={user.profileImgUrl}
                alt="profile"
                width={100}
                height={100}
                className="w-10 h-10 object-contain rounded-full"
                onClick={() => router.replace(`/user/${user.id}`)}
              />
            ) : (
              <span className="text-4xl">
                <FaRegCircleUser />
              </span>
            )}
            <div className="flex flex-col flex-1 font-bold tracking-wide text-gray-300">
              <p className="h-fit text-sm">
                {user.firstName.slice(0, 1).toUpperCase() +
                  user.firstName.slice(1)}
              </p>
              <p className="h-fit text-xs lowercase">@{user?.userName}</p>
            </div>
            <span
              className="text-2xl cursor-pointer relative right-2"
              onClick={() => setShowMore(!showMore)}
            >
              <IoIosMore />

              {showMore ? (
                <div
                  className="border-2 border-gray-700 flex text-nowrap text-sm p-1 px-2 rounded-lg bg-black absolute -right-2 bottom-6 z-10"
                  onClick={handleLogOut}
                >
                  Log Out
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="sm:pr-4 lg:hidden">
            {user.profileImgUrl ? (
              <Image
                src={user.profileImgUrl}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <span className="text-4xl">
                <FaRegCircleUser />
              </span>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
