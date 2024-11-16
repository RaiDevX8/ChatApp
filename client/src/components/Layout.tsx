import type { PropsWithChildren } from "react";
import { Github,Linkedin } from "lucide-react"; 

import Header from "./Header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
      <div className="container flex items-center justify-center gap-6 mx-auto px-4 text-center text-gray-200">
        <p className="mb-2"></p>
        <a
          href="https://github.com/RaiDevX8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-200 hover:text-gray-100 transition-colors duration-300"
        >
          <Github className="mr-2" size={24} /> 
          GitHub
        </a>
        <a className="inline-flex items-center text-gray-200 hover:text-gray-100 transition-colors duration-300"
         href="https://www.linkedin.com/in/charan-rai2024"
         target="_blank"
         rel="noopener noreferrer">
          <Linkedin className="mr-2" size={24}/>
          Linkedin
        </a>
      </div>
    </footer>
    </div>
  );
}