import axios from "axios";

const FetchChannelPost = async (page = 100, name) => {
  return await axios.get(`/api/forum/channel/${name}/post/${page}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};

export default FetchChannelPost;
