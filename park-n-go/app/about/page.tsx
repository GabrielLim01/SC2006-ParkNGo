"use client";

// React/Next.js components
import Head from 'next/head';

// Layout component (to be shared across all pages)
import Layout from '../MainLayout';

export default function Dashboard() {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="bg-white min-h-screen flex-col items-center justify-between text-black">
        {/* About Us Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-7xl font-bold text-blue-700">About Us</h2>
        <p className="mt-4 text-gray-600 text-2xl">
          Skip the hunt, park in a snap!
        </p>
      </section>

      {/* Main Content Section */}
      <section className="w-full max-w-4xl mt-8">
        <div className="flex flex-col md:flex-row">
          {/* Left side content */}
          <div className="w-full md:w-1/2 text-left">
            <h3 className="text-3xl font-semibold text-gray-800">
            Say goodbye to frustration and hello to a smoother parking experience.
            </h3>
            <p className="mt-4 text-gray-600 text-lg">
            Tired of circling around endlessly to find a parking spot? 
            Our website is designed to take the stress out of parking. With real-time updates, 
            it helps you quickly locate available carparks nearby within 2km, 
            so you can focus on getting where you need to go.
            </p>
            <p className="mt-4 text-gray-600 text-lg">
            Whether you're heading to work, running errands, 
            or out for an adventure, our website makes parking easy and convenient.
            </p>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0 flex flex-row justif">
            <img
              src="/images/GantryHDB.png" 
              alt="gantryimage"
              className="ml-8 w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="/images/CarparkHDB.png" 
              alt="carparkhdb"
              className="ml-4 w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      
      </main >
    </Layout>
  );
}