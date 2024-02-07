import PromptCard from "./PromptCard";

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="description text-left">{description}</p>
      {data.length > 0 ? (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        <div className="text-lg text-gray-600 sm:text-xl max-w-2xl mt-10">
          You haven't created any prompts yet
        </div>
      )}
    </section>
  );
};

export default Profile;
