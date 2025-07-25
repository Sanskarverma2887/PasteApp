import React, { useEffect, useState } from "react";
import "./Card.css";
import { useDispatch } from "react-redux";
import { updateToPaste, removeFromPaste } from "../redux/slice/pasteSlice";
import toast from "react-hot-toast";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import dateIcon from '../assets/date.png'
const Card = (props) => {
  const desc = props.desc.length > 20 ? props.desc.slice(0,20)+'...' : props.desc;
  const title = props.title.length > 8 ? props.title.slice(0,8)+'...' : props.title;
  const dateTime = new Date(props.createdAt);
  const monthName = dateTime.toLocaleString("default",{month:'long'})
  const formattedDate =monthName + " " + dateTime.getDate() + ", " + dateTime.getFullYear();     
  const [action,setAction] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick(e, key) {
    e.stopPropagation();
    switch (key) {
      case "delete":
        dispatch(removeFromPaste(props.id));
        break;
      case "copy":
        navigator.clipboard.writeText(props.desc);
        toast.success("copied to clipboard!");
        break;
      case "share":
        const shareURL = `${window.location.origin}/view-paste?pasteId=${props.id}`;
        navigator.clipboard.writeText(shareURL);
        toast.success("link copied to clipboard!");
        break;
      case "view":
        navigate(`/view-paste?pasteId=${props.id}`);
        break;
      default:
        break;
    }
  }
  function handleMyBtn(e){
    e.stopPropagation();
    setAction(!action)
  }

  return (
    <div className={`card-container ${action ? "overlay" : ""}`} onClick={(e) => handleClick(e, "view")}>
      <h1 className={`card-title ${action ? "hide" : ""}`}>{title}</h1>
      <p className={`card-desc ${action ? "hide" : ""}`}>{desc}</p>
      <div className={`btn-tray ${action ? "unhide" : ""}`}>
        <NavLink
          to={`/?pasteId=${props.id}`}
          className="btn"
          onClick={(e) => e.stopPropagation()}
        >
          edit
          <div className="line"></div>
        </NavLink>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleClick(e, "delete")}
        >
          delete
          <div className="line"></div>
        </button>
        <NavLink
          to={`/view-paste?pasteId=${props.id}`}
          className="btn"
          onClick={(e) => e.stopPropagation()}
        >
          view
          <div className="line"></div>
        </NavLink>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleClick(e, "share")}
        >
          share
          <div className="line"></div>
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleClick(e, "copy")}
        >
          copy
          <div className="line"></div>
        </button>
      </div>
        <button className={`myBtn`} onClick={handleMyBtn}>
          {action?"return":"actions"}
        </button>
       
      <div className={`createdAt ${action ? "hide" : ""}` }>  <img src={dateIcon} alt="date icon" className="date-icon" /> {formattedDate}</div>
      <Outlet />
    </div>
  );
};

export default Card;
