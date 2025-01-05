'use client'; // Make sure the page is treated as a client-side component

import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
import dynamic from "next/dynamic";

// Dynamically import components that rely on client-side APIs
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), { ssr: false });
const AboutSection = dynamic(() => import("./components/homepage/about"), { ssr: false });
const Blog = dynamic(() => import("./components/homepage/blog"), { ssr: false });
const ContactSection = dynamic(() => import("./components/homepage/contact"), { ssr: false });
const Education = dynamic(() => import("./components/homepage/education"), { ssr: false });
const Experience = dynamic(() => import("./components/homepage/experience"), { ssr: false });
const Projects = dynamic(() => import("./components/homepage/projects"), { ssr: false });
const Skills = dynamic(() => import("./components/homepage/skills"), { ssr: false });

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
      setBlogs(filtered);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
