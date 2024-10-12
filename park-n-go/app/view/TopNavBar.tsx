import { Navbar } from "flowbite-react";
import { Component } from "react";
export default function TopNavBar() {
  return (
    <div className="w-full">
      <Navbar fluid rounded>
      <a href="/dashboard"><Navbar.Brand>
        <img
          src="/ParkNGo_Icon.png"
          className="mr-3 h-6 sm:h-9"
          alt="ParkNGo Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ParkNGo
        </span>
      </Navbar.Brand></a>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/dashboard">Home</Navbar.Link>
        <Navbar.Link href="/search">Search</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        {/* <Navbar.Link href="/navbars">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}