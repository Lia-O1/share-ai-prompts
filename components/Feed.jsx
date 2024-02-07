"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-12 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
        />
      </form>
      {filteredPosts.length > 0 ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <div className="text-lg text-gray-600 sm:text-xl max-w-2xl mt-12">
          No prompts found
        </div>
      )}
    </section>
  );
};

export default Feed;
