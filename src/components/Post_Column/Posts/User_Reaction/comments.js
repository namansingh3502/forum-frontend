import React from "react";

export default function Comments(props) {
  const user = props.data.user;
  return (
    <div className="flex py-1" key={props.data.id}>
      <img
        src={`${props.data.user.user_image}`}
        className="rounded-full h-12 w-12 mt-2 outline outline-offset-2 outline-2 outline-gray-400"
        alt={"user"}
      />
      <div className="bg-slate-600 bg-opacity-30 text-slate-200 w-fit ml-4 px-2 py-1 text-white border-none focus:ring-0 h-full rounded-lg overflow-auto">
        <div className="text-md flex flex-wrap">
          <span className={"font-medium"}>{user.full_name}</span>
          <span className={"ml-2 font-light"}>@{user.username}</span>
        </div>
        <p className={"text-md mt-1"}>{props.data.body}</p>
      </div>
    </div>
  );
}
