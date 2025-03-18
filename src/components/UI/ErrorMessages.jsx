import React from "react";
import styled from "styled-components";

export default function ErrorMessages({ children }) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
}
const StyledErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;
