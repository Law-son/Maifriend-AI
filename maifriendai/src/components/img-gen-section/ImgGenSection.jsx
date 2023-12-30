import React, { useState, useCallback } from "react";

const ImgGenSection = () => {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitData = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before the request
      const response = await fetch("http://localhost:3000/getImageResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the request, whether it succeeds or fails
    }
  }, [description]); // Include description as a dependency

  const onSubmit = (event) => {
    event.preventDefault();
    submitData();
    setDescription("");
  };

  return (
    <section className="bg-primaryDark pt-16 text-mintGreen">
      <h1 className="text-3xl text-center font-bold leadi md:text-4xl">
        <span className="text-deepBlue">MaiFriend</span> AI can also generate
        images. Try it out.
      </h1>
      <div className="flex flex-col mt-5 md:flex-row">
        <div
          id="generate"
          className="flex flex-1 flex-col ml-11 m-10 px-2 py-5 rounded-lg bg-lightBlue md:px-10"
        >
          <div className="my-5 mx-5 rounded-lg">
            <form onSubmit={onSubmit}>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                id="description"
                name="description"
                rows="3"
                className="block w-full rounded-md border-0 py-1.5 text-bold text-primaryDark shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your description here..."
              ></textarea>
              <button
                type="submit"
                className="px-8 py-3 mt-5 w-full text-lg font-semibold rounded bg-deepBlue text-white"
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-1 flex-col mr-11 m-10 px-10 py-5 rounded-lg bg-mintGreen">
          <h1 className="text-xl font-bold mb-5 leadi text-primaryDark md:text-2xl">
            Image goes here...
          </h1>
          <img src={!response ? '' : response.success} id="imageArea" alt="" />
        </div>
      </div>
    </section>
  );
};

export default ImgGenSection;
