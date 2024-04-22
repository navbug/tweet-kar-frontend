import axios from "axios";
import { API_BASE_URL } from "../../config";

export const CONFIG_OBJ = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export const getUserInfo = async (userId) => {
  return axios
    .get(`${API_BASE_URL}/user/${userId}`)
    .then((result) => {
      if (result.status == 200) {
        return result.data.user;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const getUserTweets = async (userId) => {
  return axios
    .get(`${API_BASE_URL}/user/${userId}/tweets`)
    .then((result) => {
      if (result.status == 200) {
        return result.data;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const followUser = async (userId) => {
  return axios
    .post(`${API_BASE_URL}/user/${userId}/follow`, {}, CONFIG_OBJ)
    .then((result) => {
      if (result.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const unfollowUser = async (userId) => {
  return axios
    .post(`${API_BASE_URL}/user/${userId}/unfollow`, {}, CONFIG_OBJ)
    .then((result) => {
      if (result.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const updateProfilePicture = async (userId, formData) => {
  return axios
    .post(`${API_BASE_URL}/user/${userId}/uploadProfilePic`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const updateUserDetails = async (userId, userDetails) => {
  return axios
    .put(`${API_BASE_URL}/user/${userId}`, userDetails, CONFIG_OBJ)
    .then((result) => {
      if (result.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const getTweets = async () => {
  return axios
    .get(`${API_BASE_URL}/tweet`)
    .then((result) => {
      if (result.status == 200) {
        return result.data;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const getTweet = async (id) => {
  return axios
    .get(`${API_BASE_URL}/tweet/${id}`)
    .then((result) => {
      if (result.status == 200) {
        return result.data;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const likeTweet = async (id) => {
  return axios
    .post(`${API_BASE_URL}/tweet/${id}/like`, {}, CONFIG_OBJ)
    .then((result) => {
      if (result.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const dislikeTweet = async (id) => {
  return axios
    .post(`${API_BASE_URL}/tweet/${id}/dislike`, {}, CONFIG_OBJ)
    .then((result) => {
      if (result.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const createTweet = async (data) => {
  return axios
    .post(`${API_BASE_URL}/tweet`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((result) => {
      if (result.status == 201) {
        return true;
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export const deleteTweet = async (tweetId) => {
  return axios
    .delete(`${API_BASE_URL}/tweet/${tweetId}`, CONFIG_OBJ)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

export const postReply = async (tweetId, content) => {
  return axios
    .post(`${API_BASE_URL}/tweet/${tweetId}/reply`, content, CONFIG_OBJ)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
        console.error("Error message:", error.message);
    });
};

export const retweet = async (tweetId) => {
  return axios
    .post(`${API_BASE_URL}/tweet/${tweetId}/retweet`, {}, CONFIG_OBJ)
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};
