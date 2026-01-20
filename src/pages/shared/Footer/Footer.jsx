import { Facebook, Linkedin, Mail, Zap } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center p-10 bg-base-100 text-base-content border-t border-base-300">
      <aside>
        <div className="flex gap-1 items-center justify-center">
          <Zap className="w-10 h-10 text-primary" />
          <p className="font-bold text-2xl">ContestHub</p>
        </div>
        <p className="font-medium mt-2">
          Providing reliable contest hosting since 2024
        </p>
        <p className="mt-1 text-sm opacity-70">
          Copyright © {new Date().getFullYear()} ContestHub
        </p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-7 h-7" />
          </a>

          
          <a
            href="mailto:support@contesthub.com"
            className="hover:text-primary transition-colors flex items-center gap-2 text-base font-medium"
            aria-label="Email support"
          >
            <Mail className="w-7 h-7" />
            <span>support@contesthub.com</span>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
