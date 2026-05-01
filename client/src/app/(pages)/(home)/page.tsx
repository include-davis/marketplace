import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
import MessagesGrid from "@/app/(pages)/(chat)/(components)/messagesgrid/messagesgrid";

export default function Home() {
  return (
    <>
    <MessagesGrid/>
    </>
  );
}
