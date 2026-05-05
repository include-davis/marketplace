"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterDropdown from '../(home)/_components/FilterDropdown/FilterDropdown';

function TextField({ label, name, type = "text", prefix, placeholder }: { label: string; name: string; type?: string;  prefix?: string, placeholder?: string}) {
    const [value, setValue] = useState("");
    
    return (
      <div className={styles.field}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.inputWrapper}>
          {prefix && <span>{prefix}</span>}
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    );
};

function DimensionField() {
  const [dimensions, setDimensions] = useState({
    length: "", width: "", height: "",
  });
  
  const handleChange = (field: "length" | "width" | "height", value: string) => {
    setDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  return (
    <div className={styles.field}>
      <label>Item Dimensions (in meters)</label>
      <div className={styles.dimensionRow}>
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.length}
          onChange={(e) => handleChange('length', e.target.value)}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={24} height={24} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.width}
          onChange={(e) => handleChange('width', e.target.value)}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={24} height={24} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.height}
          onChange={(e) => handleChange('height', e.target.value)}
        />
      </div>
    </div>
  );
}

export default function CreatePostPage() {
    return (
      <main>
        <Link href="/home">Back</Link>
        <form>
          <div>
            <h2>List an item</h2>
          </div>
          <div>
            <h2>Product Details</h2>
            <div>
              <h3>Title</h3>
              <TextField label="Title" name="Title" placeholder="Text" />
            </div>
            <div>
              <h3>Description</h3>
              <TextField
                label="Description"
                name="Description"
                placeholder="Text"
              />
            </div>
            <div>
              <div>
                <h3>Category</h3>
                <FilterDropdown label="Text" options={['meow', 'woof']} />
              </div>
              <div>
                <h3>Material Property</h3>
                <FilterDropdown label="Text" options={['idk', 'hi']} />
              </div>
            </div>
            <div>
              <h3>Condition</h3>
              <FilterDropdown label="Text" options={['bad', 'mid', 'good']} />
            </div>
            <DimensionField />
            <TextField
              label="Price"
              name="Price"
              type="number"
              prefix="$"
              placeholder="Add price"
            />
          </div>
          <button>Save as draft</button>
          <button>See Preview</button>
        </form>
      </main>
    );
}

