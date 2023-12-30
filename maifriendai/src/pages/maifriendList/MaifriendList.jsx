import React from "react";
import MaifriendComponents from "../../components/personalized-models/MaifriendComponents";
import { useState, useEffect } from "react";

const MaifriendList = () => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/getFriends");
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
    <main className="bg-primaryDark py-16 px-5">
      <div className="container mx-auto">
        <div className="header-text flex flex-col mb-8">
          <h1 className="font-bold text-3xl text-mintGreen text-center mb-3">
            Explore our long list of{" "}
            <span className="text-deepBlue">Maifriends</span>
          </h1>
          <p className="text-white font-semibold text-center">
            You can start a chat by clicking on a Maifriend
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-1 gap-y-4 sm:gap-x-0">
          {items.map((item) => (
            <MaifriendComponents key={item.itemId} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MaifriendList;
