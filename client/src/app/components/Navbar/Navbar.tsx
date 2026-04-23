"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { SearchBar } from "../SearchBar";
import { Option } from "../Option";
import Image from "next/image";

export function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (<div>
        <div className={styles.container}>
            <div className={styles.logoSection}>
                <Image src="/Hashtag.svg" alt="Include" width={41} height={42} className={styles.logo} />
            </div>
            <div className={styles.searchBarSection}>
                <SearchBar />
            </div>
            <div className={styles.menuSection}>
                <Option src="/material-symbols-light_sell-outline.svg" label="Sell" />
                <Option src="/famicons_bag-outline.svg" label="Buy" />
                <Option src="/line-md_chat.svg" label="Chat" />

            </div>
            <div className={styles.accountSection} ref={dropdownRef}>
                <Image src="/userIcon.svg" alt="Menu" width={100} height={100} className={styles.accountIcon} />
                <button
                    className={styles.chevronButton}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-label="Account menu"
                    id="account-menu-toggle"
                >
                    <svg
                        className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className={styles.dropdown} id="account-dropdown">
                        <button className={styles.dropdownItem} id="dropdown-about">About</button>
                        <button className={styles.dropdownItem} id="dropdown-logout">Logout</button>
                    </div>
                )}
            </div>
        </div>
    </div>)
}