"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useGetCurrentUserDetails } from "@hooks/user";
import PostCard from "@components/PostCard";
import { graphqlClient } from "@clients/api";
import {
  FollowUserMutation,
  UnFollowUserMutation,
} from "@graphql/mutation/user";
import X3Layout from "@components/X3Layout";
import { getUserDataQuery } from "@graphql/query/user";

import Loader from "@components/Loader";
import { User } from "@types";
import EditProfilePopup from "@components/EditProfilePopup";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  const [profileData, setProfileData] = useState({} as User);
  const { user } = useGetCurrentUserDetails();
  const [activeTab, setActiveTab] = useState("Post");
  const [followState, setFollowState] = useState(false);
  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  //fetches user data by id
  const fetchData = async () => {
    const { getUserData } = await graphqlClient.request(getUserDataQuery, {
      getUserDataId: params.id,
    });
    setProfileData(getUserData as User);
  };

  //to check if the user is following the profile owner or no
  const amIFollowing = useMemo(() => {
    const following = profileData?.followers?.find(
      (item) => item?.id === user?.id
    );
    setFollowState(following ? true : false);
    return following ? true : false;
  }, [profileData]);

  //to follow or unfollow the profile owner
  const handleFollowUnfollow = async (
    followingId: string,
    followerId: string
  ) => {
    followState
      ? await graphqlClient.request(UnFollowUserMutation, {
          to: followingId,
        })
      : await graphqlClient.request(FollowUserMutation, {
          to: followingId,
        });
    !followState
      ? setProfileData((e) => {
          e.followers?.find((e) => (e ? e.id == followerId : ""))
            ? ""
            : e.followers?.push(user as User);
          return e;
        })
      : setProfileData((e) => {
          const newList = e.followers?.filter((e) =>
            e ? e.id != followerId : null
          );
          e.followers = newList;
          return e;
        });
    setFollowState((e) => !e);
  };

  return (
    <X3Layout
      children={
        !profileData.id || !user ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-col h-full max-h-screen overflow-y-scroll hidescrollbar relative">
            <div className="flex w-full p-2 py-1 pl-4 justify-start items-center gap-6 glass_bg border-b-[0.5px] border-slate-700">
              <span
                className="text-xl cursor-pointer rounded-full p-2 hover:bg-gray-900"
                onClick={() => {
                  router.back();
                }}
              >
                <GoArrowLeft />
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wide">
                  {profileData.firstName.slice(0, 1).toUpperCase() +
                    profileData.firstName.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {profileData?.posts?.length || 0} posts
                </span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col max-h-full overflow-y-scroll hidescrollbar">
              <div className="w-full flex flex-col relative pb-2">
                <div className="w-full h-48 bg-neutral-900">
                  <Image
                    src={`/assets/${Math.floor(Math.random() * 5 + 1)}.jpg`}
                    width={1200}
                    height={800}
                    alt="cover_img"
                    className="w-full h-48 object-cover p-1 rounded-lg"
                  />
                </div>
                <Image
                  src={profileData?.profileImgUrl}
                  width={1000}
                  height={1000}
                  alt="profile_img"
                  className="size-28 rounded-full object-contain -mt-16 ml-4 border-4 border-black"
                />
                {params.id === user.id ? (
                  <div
                    className="w-fit p-[5px] px-4 rounded-full border-[0.5px] border-slate-500 absolute right-6 bottom-2 cursor-pointer tracking-wide hover:bg-slate-900"
                    onClick={() => setEditProfilePopup(true)}
                  >
                    Edit profile
                  </div>
                ) : (
                  <div
                    className={`w-28 text-center p-[5px] px-4 rounded-full border-[0.5px] font-semibold absolute right-6 bottom-2 cursor-pointer tracking-wide ${
                      amIFollowing ? "" : ""
                    } ${
                      followState
                        ? "bg-black border-red-700 text-red-700"
                        : "bg-white text-black hover:bg-gray-200 "
                    }`}
                    onClick={() => {
                      handleFollowUnfollow(profileData.id, user.id);
                    }}
                  >
                    {followState ? "Unfollow" : "Follow"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 p-2 pl-4">
                <div className="flex flex-col mb-1">
                  <span className="font-bold text-xl tracking-wide">
                    {profileData?.firstName.slice(0, 1).toUpperCase() +
                      profileData?.firstName.slice(1)}
                  </span>
                  <span className="tracking-wide text-sm text-gray-500">
                    @{user?.userName}
                  </span>
                </div>
                <div className="flex gap-4 font-thin text-sm tracking-wider text-gray-400">
                  <span className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-lg" />{" "}
                    <span>{user?.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <HiMiniCalendarDays className="text-lg" />{" "}
                    <span>
                      Joined{" "}
                      {new Date(parseInt(profileData.createdAt))
                        .toString()
                        .slice(4, 7) +
                        " " +
                        new Date(parseInt(profileData.createdAt))
                          .toString()
                          .slice(11, 15)}
                    </span>
                  </span>
                </div>
                <div className="flex gap-4 font-thin text-sm tracking-wider">
                  <span className="text-sm text-slate-400">
                    <span className="text-white font-bold">
                      {profileData?.following?.length || 0}
                    </span>{" "}
                    Following
                  </span>
                  <span className="text-sm text-slate-400">
                    <span className="text-white font-bold">
                      {profileData?.followers?.length || 0}
                    </span>{" "}
                    Followers
                  </span>
                </div>
              </div>
              <div className="w-full flex font-bold border-slate-700 border-b-[0.5px] cursor-pointer sticky top-0 z-20 glass_bg">
                <div
                  className="flex-1 flex justify-center items-center hover:bg-gray-950"
                  onClick={() => {
                    setActiveTab("Post");
                  }}
                >
                  <button className="p-2 pb-3 pt-5 text-sm tracking-wide self-end">
                    Posts
                    <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3"></div>
                  </button>
                </div>

                <div
                  className="flex-1 flex justify-center items-center hover:bg-gray-950"
                  onClick={() => {
                    setActiveTab("Media");
                  }}
                >
                  <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                    Media
                    <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                  </button>
                </div>
                <div
                  className="flex-1 flex justify-center items-center hover:bg-gray-950"
                  onClick={() => {
                    setActiveTab("Likes");
                  }}
                >
                  <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                    Likes
                    <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col">
                {profileData.posts ? (
                  profileData.posts.length > 0 ? (
                    profileData.posts.map((post: any) => {
                      const data = {
                        ...post,
                        author: {
                          id: profileData?.id,
                          firstName: profileData?.firstName,
                          lastName: profileData?.lastName,
                          userName: profileData?.userName,
                          profileImgUrl: profileData?.profileImgUrl,
                        },
                      };
                      return <PostCard key={post.id} data={data} />;
                    })
                  ) : (
                    <div className="w-full flex justify-center items-center text-slate-500 mt-10 text-lg tracking-wide font-bold">
                      No Posts
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            {editProfilePopup ? (
              <EditProfilePopup setEditProfilePopup={setEditProfilePopup} />
            ) : (
              ""
            )}
          </div>
        )
      }
    />
  );
};

export default page;
