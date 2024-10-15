// React/Next.js components
import Image from "next/image";

// Flowbite components
import { Navbar } from "flowbite-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:pl-20 pr-20">
      <Navbar fluid rounded className="bg-gradient-to-b from-blue-900 to-blue-600">
        {/* <Image
          src="/images/ParkNGo_Icon.png"
          height={100}
          width={100}
          alt="ParkNGo Logo"
        /> */}
        <span className="text-left text-3xl font-semibold dark:text-white pl-8">
          <h1>ParkNGo</h1>
          <h2 className="text-base">A carpark locator application</h2>
        </span>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/dashboard">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >Home</h1>
          </Navbar.Link>
          <Navbar.Link href="/search">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >Search</h1>
          </Navbar.Link>
          <Navbar.Link href="/about">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-4" >About</h1>
          </Navbar.Link>
          <Navbar.Link href="/contact">
            <h1 className="self-center whitespace-nowrap text-xl font-semibold text-white pr-8" >Contact</h1>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <div>{children}</div>

      {/* Animation */}
      {/* <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </section>
  );
}

/*
Original layout

  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
*/