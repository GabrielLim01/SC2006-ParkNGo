// React/Next.js components
// import Image from "next/image";

// Flowbite components
// import { Navbar } from "flowbite-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Layout code goes in here */}
      {/* <Navbar fluid rounded>
        <Navbar.Brand>
          <Image
            src="/images/ParkNGo_Icon.png"
            height={144}
            width={144}
            alt="ParkNGo Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-8">
            <h1 font-size="20">ParkNGo</h1>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Map</Navbar.Link>
        </Navbar.Collapse>
      </Navbar> */}
      {/* <body h-screen bg-gradient-to-b
        from-green-200
        to-green-500> */}
        <div className="md:pl-20 pr-20">{children}</div>
      {/* </body> */}
    </section>
  );
}

/*
Original layout

  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
*/