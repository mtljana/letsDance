import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import LogoutButton from "./LogOut";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <Wrapper>
      <StyledLink to="/">
        <h1>Lets Dance!</h1>
      </StyledLink>

      <Nav>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
        {isAuthenticated && (
          <StyledNavLink to="/profile">Profile</StyledNavLink>
        )}
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #171515;
  height: 110px;
  padding: var(--padding-page) 18px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  h1 {
    color: white;
  }
`;
const StyledNavLink = styled(NavLink)`
  background: var(--color-selective-yellow);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-alabama-crimson);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
  }
`;
export default Header;
