import aiAvatar from "../../assets/ai_avatar.png";

import HorizontalSlider from "./HorizontalSlider";
import CreateModal from "./CreateModal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PersonalizedModels = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/getNewFriends");
        if (!response.ok) {
          console.error(`Failed to fetch data. Status: ${response.status}`);
          setFetchedData([]); // Set an empty array on error
          return;
        }
        const data = await response.json();
        setFetchedData(Array.isArray(data.success) ? data.success : []); // Access the success property
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        setFetchedData([]); // Set an empty array on error
      }
    }

    fetchData();
  }, []);

  const items = fetchedData.map((item) => ({
    itemId: item._id,
    name: item.name,
    imageLink: item.imageLink,
    role: item.role,
    onClick: () => {},
    selected: false,
  }));
  

  return (
    <section className="bg-primaryDark pt-16 pb-10 mx-10 text-mintGreen">
      <h1 className="text-3xl text-center font-bold leadi md:text-4xl">
        Interact with a <span className="text-deepBlue">MaiFriend</span> or
        create your own.
      </h1>
      <span className="bg-deepBlue my-4 h-10 px-4 py-2 flex justify-between">
        <p className="font-medium text-lg text-white leading-snug">
          Popular Maifriends
        </p>
        <Link
          to="maifriend-list"
          className="text-primaryDark font-bold text-md"
        >
          View All
        </Link>
      </span>
      <div>
        <HorizontalSlider items={items} />
      </div>
      <div className="flex justify-center items-center my-10">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-deepBlue text-white rounded-lg py-4 px-4 font-bold"
        >
          Create Your Own Maifriend
        </button>
      </div>
      <div className="my-6"></div>
      <CreateModal openModal={openModal} setOpenModal={setOpenModal} />
    </section>
  );
};

export default PersonalizedModels;
