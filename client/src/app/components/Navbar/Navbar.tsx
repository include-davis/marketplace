"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { Option } from "../Option/Option";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image
            src="/Navbar/Hashtag.svg"
            alt="Include"
            width={41}
            height={42}
            className={styles.logo}
          />
        </div>
        <div className={styles.searchBarSection}>
          <SearchBar />
        </div>
        <div className={styles.menuSection}>
          <Option src="/Navbar/material-symbols-light_sell-outline.svg" label="Sell" />
          <Option src="/Navbar/famicons_bag-outline.svg" label="Buy" />
          <Option src="/Navbar/line-md_chat.svg" label="Chat" />
        </div>
        <div className={styles.accountSection} ref={dropdownRef}>
          <button
            className={styles.chevronButton}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="Account menu"
            id="account-menu-toggle"
          >
            <Image
              src="/Navbar/userIcon.svg"
              alt="Menu"
              width={100}
              height={100}
              className={styles.accountIcon}
            />
            <svg
              className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdown} id="account-dropdown">
              <button className={styles.dropdownItem} id="dropdown-about">
                About
              </button>
              <button className={styles.dropdownItem} id="dropdown-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
