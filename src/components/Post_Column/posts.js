import React, { Component } from "react";

import axios from "axios";

import UserReaction from "./post/User_Reaction/userReaction";
import PostText from "./post/postText";
import UserDetails from "./post/userDetails";
import ChannelTags from "./post/channelTags";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostLoadStatus: "NotLoaded",
      PostData: [],
    };
  }

  loadPost() {
    const Token = localStorage.getItem("Token");

    axios
      .get("https://campus-forum-naman.herokuapp.com/forum/posts", {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        console.log(response.status)
        console.log(response.data)
        if (response.status === 200) {
          this.setState({
            PostData: response.data,
            LoadStatus: "Loaded",
          });
        } else {
          this.setState({
            LoadStatus: "NotLoaded",
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.loadPost();
  }

  render() {
    const Post = this.state.PostData;

    return (
      <div>
        {Post.map((item, index) => {
          return (
            <div
              className="p-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto mt-4"
              key={Post[index].post_data.id}
            >
              <UserDetails
                username={Post[index].username}
                user_id={Post[index].user_id}
              />
              <ChannelTags channel_list={Post[index].post_data.channel_name} />
              <PostText text={Post[index].post_data.body} />
              {/* <PostImage/>  */}
              <UserReaction post={Post[index].post_data.id} />
            </div>
          );
        })}
      </div>
    );
  }
}
