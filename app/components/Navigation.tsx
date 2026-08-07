"use client";

import Link from "next/link";

interface NavigationProps {
  currentPage: "home" | "pillows" | "linens" | "pads";
  language: "ar" | "en";
  onLanguageChange: () => void;
}

export default function Navigation({ currentPage, language, onLanguageChange }: NavigationProps) {
  const isArabic = language === "ar";
  const labels = {
    ar: { home: "المراتب", pillows: "الوسائد", linens: "المفروشات", pads: "لباد المراتب", contact: "تواصل" },
    en: { home: "Mattresses", pillows: "Pillows", linens: "Linens", pads: "Pads", contact: "Contact" },
  };

  const links = [
    { href: "/", label: labels[language].home, active: currentPage === "home" },
    { href: "/pillows", label: labels[language].pillows, active: currentPage === "pillows" },
    { href: "/linens", label: labels[language].linens, active: currentPage === "linens" },
    { href: "/pads", label: labels[language].pads, active: currentPage === "pads" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className={`max-w-7xl mx-auto px-4 py-4 flex items-center ${isArabic ? "flex-row-reverse" : ""}`}>
        <Link href="/" className="flex-shrink-0">
          <img src="/hoven-logo-white.png" alt="HOVEN" className="h-14 w-auto" />
        </Link>
        <nav className={`flex items-center gap-8 text-white ${isArabic ? "flex-row-reverse" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                link.active ? "opacity-100 font-medium" : "opacity-70 hover:opacity-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="#contact" className="hover:opacity-80 transition text-sm">
            {labels[language].contact}
          </a>
          <button
            onClick={onLanguageChange}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition text-sm"
            aria-label="Change language"
          >
            {isArabic ? "EN" : "ع"}
          </button>
        </nav>
      </div>
    </header>
  );
}
