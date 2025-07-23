import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card.jsx";

const Pastes = () => {
  const [searchVal, setSearchVal] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  function handleInput(e) {
    setSearchVal(e.target.value);
  }

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <input
        type="text"
        name="input"
        placeholder="search"
        className="searchbar sm:w-[60%] w-[90%]"
        onChange={handleInput}
      />
      <div className="sm:w-[60%] w-[90%] p-5 rounded-lg gap-[15px] flex flex-col mt-5 bg-[#1b1b1e]">
        {searchVal === "" ? (
          pastes.length === 0 ? (
            <p className="text-white text-center">No pastes available.</p>
          ) : (
            pastes.map((paste) => (
                <Card
                key={paste.id}
                title={paste.title}
                desc={paste.content}
                id={paste.id}
                createdAt={paste.createdAt}
              />
              
              
            ))
          )
        ) : filteredData.length === 0 ? (
          <p className="text-white text-center">No results found.</p>
        ) : (
          filteredData.map((paste) => (
            <Card
              key={paste.id}
              title={paste.title}
              desc={paste.content}
              id={paste.id}
              createdAt={paste.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Pastes;
