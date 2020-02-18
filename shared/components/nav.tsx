import { FC, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import settings from "../../core/settings";
import { useAPI } from "../hooks";
import { useRouter } from "next/router";

export const Navigation: FC = () => {
  const api = useAPI();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = async () => {
    await api.session.logout()
    router.push("/")
  }

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/" className="uppercase">
        {settings.app.name}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/items">Items</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/orders">Orders</NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <NavLink>
              <i className="fa fa-user mx-2" />
              {api.session.user?.name}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="pointer" onClick={logout}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <style jsx>{`
        .pointer {
          cursor: pointer;
        }
      `}</style>
    </Navbar>
  );
};

export default Navigation;
