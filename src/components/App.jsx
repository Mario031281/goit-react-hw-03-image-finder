import React from 'react';
import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Btn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyled';
import { StyledApp } from './App.styled';
export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 0,
    loading: false,
  };
  changeQuery = newQuery => {
    try {
      this.setState({
        query: `${Date.now()}/${newQuery}`,
        images: [],
        page: 1,
        topic: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    const { query, page } = this.state;
    const images = await fetchImages(query, page);
    try {
      this.setState({ images });
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const slashIndex = this.state.query.indexOf('/');
      if (slashIndex !== -1) {
        const newQueryPart = this.state.query.slice(slashIndex + 1);

        fetchImages(newQueryPart, this.state.page)
          .then(data => {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));
          })
          .catch(error => {
            console.error('Помилка при завантаженні зображень:', error);
          });
      }
    }
  }

  handleLoadMore = () => {
    try {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { images, isLoading, page, totalPages } = this.state;
    return (
      <StyledApp>
        <SearchBar
          onSubmit={evt => {
            evt.preventDefault();
            const queryValue = evt.target.elements.query.value.trim();

            if (queryValue === '') {
              alert(`Enter the search data`);
              return;
            }

            this.changeQuery(queryValue);

            evt.target.reset();
          }}
        ></SearchBar>

        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 120,
              textAlign: 'center',
              fontSize: 28,
            }}
          >
            Image gallery is empty...
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Btn onClick={this.handleLoadMore} />
        )}

        <GlobalStyle />
      </StyledApp>
    );
  }
}
