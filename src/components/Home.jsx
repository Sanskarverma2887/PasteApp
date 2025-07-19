import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/slice/pasteSlice";
import toast from "react-hot-toast";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const pasteId = searchParams.get("pasteId");

  function handleSubmit() {
    console.log(title+' '+value)
    if (!title.trim() || !value.trim()) {
      toast.error("Title or content is required!");
      return;
    }
    const paste = {
      title: title,
      content: value,
      id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPaste(paste));
    } else {
      // create
      dispatch(addToPaste(paste));
    }

    setSearchParams({});
    setTitle("");
    setValue("");
  }

  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId !== null) {
      const myPaste = allPastes.find((paste) => {
        return paste.id == pasteId;
      });
      if(myPaste){
        setTitle(myPaste.title);
        setValue(myPaste.content);
      }
    }
  }, [pasteId]);

  return (
    <>
      <div className="w-full flex flex-row justify-center mt-5">
        <div className="w-[60%] grid grid-cols-3 gap-x-2">
          <input
            type="text"
            name=""
            placeholder="enter title here"
            className="searchbar"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="paste-btn" onClick={handleSubmit}>
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
          <div className="col-span-3 mt-5">
            <textarea
              name=""
              id="text-area"
              rows={10}
              placeholder="enter content"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
