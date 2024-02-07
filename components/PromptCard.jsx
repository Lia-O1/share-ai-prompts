"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PromptCard = ({
  post,
  handleTagClick,
  handleProfileClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center content-center gap-5">
        <div className="flex flex-1 justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full object-contain cursor-pointer"
            onClick={() =>
              handleProfileClick &&
              handleProfileClick(post.creator._id, post.creator.username)
            }
          />
          <div className="flex">
            <h3
              className="font-satoshi font-semibold text-gray-900 cursor-pointer"
              onClick={() =>
                handleProfileClick &&
                handleProfileClick(post.creator._id, post.creator.username)
              }
            >
              {post.creator.username}
            </h3>
          </div>
        </div>
        <div className="copy_btn flex items-center" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={20}
            height={20}
            alt="Copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-2 flex-between gap-4 border-t border-gray-200 pt-3">
          <button
            className="font-inter font-semibold text-sm green_gradient cursor-pointer p-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-inter font-semibold text-sm orange_gradient cursor-pointer p-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
