// https://dev.to/stephanieopala/simple-navigation-bar-in-react-js-4d5m

import React from "react";
import {FaBars} from "react-icons/fa";
import {NavLink as Link} from "react-router-dom";
import styled from "styled-components";
// import {Button} from "@mui/material";

export const Nav = styled.nav`
  background: orangered;
  height: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: 0.2rem calc((100vw - 1000px) / 2);
  padding: 5px;
  z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;

`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  //margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// export const NavBtn = styled.nav`
//   display: flex;
//   align-items: center;
//   margin-right: 24px;
//
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// export const NavBtnLink = styled(Link)`
//   border-radius: 4px;
//   background: transparent;
//   padding: 2px 5px;
//   color: #fff;
//   outline: none;
//   border: 1px solid #fff;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;
//   margin-left: 24px;
//
//   &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #fff;
//     color: #808080;
//   }
// `;

export default function Navbar({user, setUser}) {

	function handleLogoutButton() {
		setUser(null);
	}

	return (
		<>
			<Nav>
				<NavLogo to="/dashboard">
					Logo
				</NavLogo>
				<Bars/>
				<NavMenu>
					<NavLink to="/dashboard" activeStyle={{color: "black"}}>
						Dashboard
					</NavLink>
					{
						user
							?
							<>
								<NavLink to="/create-topic" activeStyle={{color: "black"}}>
									Create topic
								</NavLink>
								<NavLink to="/home" activeStyle={{color: "black"}}>
									Home
								</NavLink>
							</>
							:
							<></>
					}

					<NavLink to="/about" activeStyle={{color: "black"}}>
						About
					</NavLink>
					{
						user
							?
							<>
								{/*<NavLink to="/login" activeStyle={{color: "black"}}>*/}
								{/*	Log in*/}
								{/*</NavLink>*/}
								{/*<NavLink to="/signup" activeStyle={{color: "black"}}>*/}
								{/*	Sign up*/}
								{/*</NavLink>*/}
								<NavLink to="/" onClick={handleLogoutButton}>
									Logout
								</NavLink>
							</>
							:
							<>
								<NavLink to="/login" activeStyle={{color: "black"}}>
									Log in
								</NavLink>
								<NavLink to="/signup" activeStyle={{color: "black"}}>
									Sign up
								</NavLink>
								{/*<NavLink to="/" onClick={handleLogoutButton}>*/}
								{/*	Logout*/}
								{/*</NavLink>*/}
							</>
					}
				</NavMenu>
			</Nav>
		</>
	);
}
