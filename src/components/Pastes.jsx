import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card.jsx";

const Pastes = () => {
  const [searchVal, setSearchVal] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  function handleInput(e){
    setSearchVal(e.target.value)
  }



  return (
    <div className="w-full flex flex-col items-center mt-5">
      <input
        type="text"
        name="input"
        id="" placeholder="search"
        className="searchbar w-[60%]"
        onChange={handleInput}
      />
      <div className="w-[60%] p-5 rounded-lg gap-[15px] flex flex-col  mt-5 bg-[#1b1b1e] ">
        {searchVal == ""
          ? pastes.map((paste) => {
              return <Card title={paste.title} desc={paste.content} id={paste.id} createdAt = {paste.createdAt}/>;
            })
          : filteredData.map((paste) => {
            return <div>{paste.title}</div>;
          })
          
          }
      </div>
    </div>
  );
};

export default Pastes;
