'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import Option from '../Option/Option';
import { useAuth } from '@/app/_context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <Link href="/">
          <Image
            src="/Navbar/Hashtag.svg"
            alt="Include"
            width={41}
            height={42}
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles.searchBarSection}>
        <SearchBar />
      </div>
      <div className={styles.menuSection}>
        <Option
          src="/Navbar/material-symbols-light_sell-outline.svg"
          label="Sell"
          href="/sell/active"
        />
        <Option src="/Navbar/famicons_bag-outline.svg" label="Buy" href="/" />
        <Option src="/Navbar/line-md_chat.svg" label="Chat" href="/chat" />
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
          <Image
            src="/Navbar/chevron.svg"
            alt="Menu"
            width={30}
            height={30}
            className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
          />
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown} id="account-dropdown">
            <Link
              className={styles.dropdownItem}
              id="dropdown-about"
              href="/about"
              onClick={() => setDropdownOpen(false)}
            >
              About
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className={styles.dropdownItem}
                id="dropdown-logout"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/sign-in"
                className={styles.dropdownLink}
                onClick={() => setDropdownOpen(false)}
              >
                <button className={styles.dropdownItem} id="dropdown-signin">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
