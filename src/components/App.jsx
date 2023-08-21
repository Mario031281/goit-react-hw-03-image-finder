import React from 'react';
import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Btn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyled';
import { StyledApp } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalImages: 0,
    isLoading: false,
    error: null,
  };
  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,

      totalImages: 0,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
        .then(data => {
          if (data.hits.length < 0) {
            Notify.failure('No results .');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalImages: data.totalHits,
          }));
        })
        .catch(error => {
          console.error('Помилка при завантаженні зображень:', error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, page, totalImages } = this.state;
    return (
      <StyledApp>
        <SearchBar onSubmit={this.changeQuery} />

        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              fontSize: 28,
              padding: 120,
              textAlign: 'center',
            }}
          >
            Image gallery is empty...
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalImages !== page && !isLoading && (
          <Btn onClick={this.handleLoadMore} />
        )}

        <GlobalStyle />
      </StyledApp>
    );
  }
}
