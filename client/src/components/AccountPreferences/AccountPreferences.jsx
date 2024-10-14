import Modal from "../IconModal/IconModal"
import { useState } from "react";

function AccountPreferences() {

    //modal stuff
    const [showModal, setShowModal] = useState(false);
    //opens modal
    const handleOpenModal = () => {
        setShowModal(true);
    };
    //close modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

  return (
    <div>
                <button className="nav-container">
                    <div className="nav-img"><img src="/icons/profile.svg" alt="profile icon" /></div>
                    <div className="nav-name">Account Preferences</div>
                </button>
                <div className="profile-pic"></div>
                <button className="middle-change-btn" onClick={handleOpenModal}>
                    <img src="/icons/img.svg" alt="picture icon" />
                    Change
                </button>
                <button className="middle-remove-btn">
                    <img src="/icons/trash.svg" alt="trash icon" />
                    Remove
                </button>
                <div className="spacer"></div>
                <div className="middle-username-title">First name</div>
                <input className="middle-username-box"></input>

                <div className="middle-username-title">Last name</div>
                <input className="middle-username-box"></input>

                <div className="middle-username-title">Current position</div>
                <input className="middle-username-box"></input>

                <div className="middle-cancel-btn">Cancel</div>
                <div className="middle-update-btn">Update</div>

                <div className="middle-des-title">Description</div>
                <textarea className="middle-des-box"></textarea>
                
                {/* This is here so that its rendered when the page is rendered*/}
                <Modal show={showModal} onClose={handleCloseModal}>
                    <div className="icons-container">
                        <img className="profile-pic" src="/icons/icon1.svg" alt="adult 1 icon" />
                        <img className="profile-pic" src="/icons/icon2.svg" alt="adult 2 icon" />
                        <img className="profile-pic" src="/icons/icon4.svg" alt="adult 3 icon" />
                        <img className="profile-pic" src="/icons/icon3.svg" alt="adult 4 icon" />
                    </div>
                    <div className="icons-container">
                        <img className="profile-pic" src="/icons/icon5.svg" alt="kid icon" />
                        <img className="profile-pic" src="/icons/icon6.svg" alt="kid icon" />
                        <img className="profile-pic" src="/icons/icon7.svg" alt="kid icon" />
                        <img className="profile-pic" src="/icons/icon8.svg" alt="kid icon" />
                    </div>
                    <div className="modal-btn-wrapper">
                        <button className="modal-cancel-btn">Cancel</button>
                        <button className="modal-update-btn">Update</button>
                    </div>
                </Modal>
    </div>
  )
}

export default AccountPreferences
