import React from 'react';
import { LoadBtn } from './Button.styled';

export const Btn = ({ onClick }) => {
  return (
    <div>
      <LoadBtn onClick={onClick}>Load more</LoadBtn>
    </div>
  );
};
