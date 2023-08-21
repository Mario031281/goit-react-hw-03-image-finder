import { FaSearch } from 'react-icons/fa';
import React from 'react';
import {
  SearchForm,
  SearchFormButton,
  Searchbar,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const queryValue = evt.target.elements.query.value.trim();

    if (queryValue === '') {
      alert(`Enter the search data`);
      return;
    }

    onSubmit(queryValue);

    evt.target.reset();
  };
  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <FaSearch />
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};
