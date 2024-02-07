"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = ({ searchParams }) => {
  const [myPosts, setMyPosts] = useState([]);
  const id = searchParams.id;
  const username = searchParams.username;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      if (!response.ok) {
        console.error("Failed to fetch posts");
        setMyPosts([]);
        return;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error("Server did not return an array");
        setMyPosts([]);
        return;
      }
      setMyPosts(data);
    };
    if (id) fetchPosts();
  }, [id]);

  return (
    <Profile
      name={username}
      description={`Welcome to ${username} profile page`}
      data={myPosts}
      pronoun={username}
    />
  );
};

export default MyProfile;
