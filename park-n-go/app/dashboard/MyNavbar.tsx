// Flowbite components
import Image from "next/image";
import { Navbar } from "flowbite-react";

function Mynavbar(){
    return <Navbar fluid rounded>
    <Navbar.Brand>
        <img
        src="/ParkNGo_Icon.png"
        className="mr-3 h-6 sm:h-9"
        alt="ParkNGo Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        ParkNGo
        </span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
        <Navbar.Link href="/navbars" active>
        Home
        </Navbar.Link>
        <Navbar.Link href="/search">Search</Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        {/* <Navbar.Link href="/navbars">Contact</Navbar.Link> */}
    </Navbar.Collapse>
    </Navbar>

}

export default Mynavbar;