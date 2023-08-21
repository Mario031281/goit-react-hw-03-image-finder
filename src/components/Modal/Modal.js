import React, { Component } from 'react';
import Modal from 'react-modal';
// import { ModalStyled } from './Modal.styled';
export const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    zIndex: 100001,
  },
};
Modal.setAppElement('#root');
export class ImageModal extends Component {
  state = { isOpen: false };
  render() {
    const { isOpen, onRequestClose, image } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <img src={image.largeImageURL} alt={image.tags} />
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={onRequestClose}
        />
      </Modal>
    );
  }
}
