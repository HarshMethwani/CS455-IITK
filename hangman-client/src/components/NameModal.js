// src/components/NameModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types'; // Import PropTypes
import './NameModal.css'; 

Modal.setAppElement('#root'); 

const NameModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enter Username"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Enter Your Name</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Start Game</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

// Define prop types
NameModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NameModal;
