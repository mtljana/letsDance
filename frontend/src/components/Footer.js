import React from "react";
import styled from "styled-components";

const Footer = () => (
  <Wrapper>
    <Text>Lets Dance! </Text>
  </Wrapper>
);

const Wrapper = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;

  height: 50px;
  background: #171515;
  width: 100vw;
`;
const Text = styled.p`
  color: var(--color-alabama-crimson);
  font-family: var(--font-heading);
  font-size: 36px;
  text-align: center;
  margin: 12px 0 0 24px;
  color: #ffffff;
`;
export default Footer;
