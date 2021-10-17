import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { closeErrorModal } from "../../redux/weatherSlice";

export default function ErrorModal() {
  const dispatch = useDispatch();
  const errorModal = useSelector((state) => state.weatherSlice.errorModal);
  const darkMode = useSelector((state) => state.weatherSlice.darkMode);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: darkMode ? "black" : "white",
      color: darkMode ? "white" : "black",
    },
  };
  return (
    <Modal
      isOpen={errorModal.open}
      onRequestClose={() => dispatch(closeErrorModal())}
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>{errorModal.text}</h2>
    </Modal>
  );
}
