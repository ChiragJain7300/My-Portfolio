"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Loader } from "@/components/ui/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />
          <Hero />
          <ScrollReveal>
            <Grid />
          </ScrollReveal>
          <ScrollReveal>
            <RecentProjects />
          </ScrollReveal>
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
          <ScrollReveal>
            <Approach />
          </ScrollReveal>
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </div>
      </main>
    </>
  );
};

export default Home;
