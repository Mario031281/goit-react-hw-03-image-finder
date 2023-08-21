import React from 'react';
import {
  SearchForm,
  SearchFormButton,
  Searchbar,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
export const SearchBar = ({ onSubmit }) => {
  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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
