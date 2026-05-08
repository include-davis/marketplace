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
        <label htmlFor={name}>{label} <span className={styles.requiredSymbol}>*</span></label>
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
      <main className={styles.page}>
        <Link href="/home" className={styles.back}>
          <Image src={'/back_arrow.svg'} alt="<" width={32} height={32} />
          <div className={styles.backLink}>
            Back
          </div>
        </Link>

        <form className={styles.form}>
          <div className={styles.title}>
            <h2>List an item</h2>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Details</h2>

            <div>
              <h3>Title</h3>
              <TextField label="Title" name="Title" placeholder="Text" />
            </div>

            <div className={styles.textAreaField}>
              <label htmlFor="Description">
                Description <span className={styles.requiredSymbol}>*</span>
              </label>
              <textarea></textarea>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.dropdownField}>
                <label>
                  Category <span className={styles.requiredSymbol}>*</span>
                </label>
                <FilterDropdown
                  label="Text"
                  options={[
                    'Fastening and Joining',
                    'Power Transmission',
                    'Electrical and Lightning',
                    'Fabricating',
                    'Sawing and Cutting',
                    'Other',
                  ]}
                />
              </div>
              <div className={styles.dropdownField}>
                <label>
                  Material Property <span>*</span>
                </label>
                <FilterDropdown
                  label="Text"
                  options={[
                    'Mechanical Property',
                    'Thermal Property',
                    'Electrical Property',
                    'Chemical Property',
                    'Other',
                  ]}
                />
              </div>
            </div>

            <div className={styles.halfWidth}>
              <div className={styles.dropdownField}>
                <label>
                  Condition <span className={styles.requiredSymbol}>*</span>
                </label>
                <FilterDropdown
                  label="Text"
                  options={['New', 'Like new', 'Good', 'Fair', 'Poor', 'Other']}
                />
              </div>
            </div>

            <DimensionField />

            <div className={styles.priceWidth}>
              <TextField
                label="Price"
                name="Price"
                type="number"
                prefix="$"
                placeholder="Add price"
              />
            </div>
          </section>

          <div className={styles.actions}>
            <button type="button" className={styles.draftButton}>
              Save as draft
            </button>
            <button type="submit" className={styles.previewButton}>
              See Preview
            </button>
          </div>
        </form>
      </main>
    );
}

