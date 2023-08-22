import React from 'react';
import { ImageModal } from 'components/Modal/Modal';
import { ImgGalleryItem, ImgGalleryItemImage } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { image } = this.props;

    return (
      <ImgGalleryItem>
        <ImgGalleryItemImage
          onClick={this.openModal}
          src={image.webformatURL}
          alt={image.tags}
        />

        <ImageModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          image={{ tags: image.tags, largeImageURL: image.largeImageURL }}
        />
      </ImgGalleryItem>
    );
  }
}
