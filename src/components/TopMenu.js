import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import { auth } from "../firebase/config";
import { AuthContext } from "./../Context/AuthProvider";

const TopMenu = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to="/">Zennomi</Link>
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Trang chủ</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/titles">Danh sách</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/title/add">Thêm mới</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              {user.uid ? (
                <Button
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Đăng xuất
                </Button>
              ) : (
                <NavLink>
                  <Link to="/login">Đăng nhập</Link>
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
