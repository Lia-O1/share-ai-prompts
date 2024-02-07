"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
  return (
    <div className="mt-12 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.prompt
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        post.tag.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        post.creator.username
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchInput, posts]);

  const handleTagClick = (tag) => {
    setSearchInput(tag);
  };

  const handleProfileClick = (id, username) => {
    router.push(`/profile?id=${id}?username=${username}`);
  };

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input
          type="text"
          placeholder="Search for a word, tag or username"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
          className="search_input"
          name="search_input"
        />
      </form>
      {filteredPosts.length > 0 ? (
        <PromptCardList
          data={filteredPosts}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ) : (
        <div className="text-lg text-gray-600 sm:text-xl max-w-2xl mt-12">
          No prompts found
        </div>
      )}
    </section>
  );
};

export default Feed;
