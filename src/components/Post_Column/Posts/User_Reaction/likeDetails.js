import React from "react";

export default function LikeDetails(props) {
  const liked = props.Liked;
  const likedList = props.UserLiked;
  const length = props.UserLiked.length
  return (
    <div className="text-md ml-2 py-0.5">
      <p>
        {
          length > 0 ? "Post liked by ":
            ""
        }
        {
          length === 1 ?
            (liked ? "You" : likedList[0].username) + " "
          :""
        }
        {
          length === 2 ?
            liked ? "You and " + likedList[0].username
            :
            likedList[0].username + " and 1 other"
          :""
        }
        {
          length > 2 ?
            liked ? "You, " + likedList[0].username + " and " + JSON.stringify(length-2) +" other"
            :
            likedList[0].username + " and " + JSON.stringify(length-1) +" other"
          :""
        }
      </p>
    </div>
  );
}