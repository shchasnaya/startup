import Menu from "../menu/Menu";
import Tabs from "./tabs/Tabs";
import Modal from "../modal/Modal";
import {useState} from "react";

const Profile = () => {

  return (
    <div className={"container"}>
      <Menu/>
      <Tabs/>
    </div>
  );
};

export default Profile;