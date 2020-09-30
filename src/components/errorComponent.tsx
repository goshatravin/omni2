import React from 'react';
import Styled from 'styled-components';

const Error = Styled.p`
  color: tomato;
  font-size: 0.75rem;
  padding-top: 0.5rem;
  ::before {
    display: inline;
    content: "⚠ ";
  }
`;
const Empty = Styled.div`
  height: 20px;
`;
type IError = {
  error: any;
};

const ErrorComponent: React.FC<IError> = ({ error }) => {
  if (!error) {
    return <Empty />;
  }
  return <Error>{error ? error.message || error.description : ''}</Error>;
};

export default ErrorComponent;
