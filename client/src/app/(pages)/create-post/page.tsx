'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import CreatePostDropdown from '../(home)/_components/CreatePostDropdown/CreatePostDropdown';

function TextField({
  label,
  name,
  type = 'text',
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <div className={styles.field}>
      <label htmlFor={name}>
        {label} <span className={styles.requiredSymbol}>*</span>
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className={styles.textFieldBox}
        />
      </div>
    </div>
  );
}

function DimensionField() {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const handleChange = (
    field: 'length' | 'width' | 'height',
    value: string,
  ) => {
    setDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
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
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.width}
          onChange={(e) => handleChange('width', e.target.value)}
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.height}
          onChange={(e) => handleChange('height', e.target.value)}
          className={styles.dimensionSquare}
        />
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [materialProperty, setMaterialProperty] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitListing({
      title,
      desc,
      price,
      category,
      stock: 1,
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContainer}>
        <Link href="/home" className={styles.back}>
          <Image src={'/back_arrow.svg'} alt="<" width={32} height={32} />
          <div className={styles.backLink}>Back</div>
        </Link>

        <form className={styles.form}>
          <div className={styles.title}>
            <h2>List an item</h2>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Details</h2>

            <div>
              <TextField label="Title" name="Title" placeholder="Text" />
            </div>

            <div className={styles.textAreaField}>
              <label htmlFor="Description">
                Description <span className={styles.requiredSymbol}>*</span>
              </label>
              <textarea
                rows={8}
                placeholder="Give a brief description"
                className={styles.textAreaBox}
              ></textarea>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.dropdownField}>
                <label>
                  Category <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreatePostDropdown
                  label="Choose a category"
                  placeholder="Choose a category"
                  options={[
                    'Fastening and Joining',
                    'Power Transmission',
                    'Electrical and Lightning',
                    'Fabricating',
                    'Sawing and Cutting',
                    'Other',
                  ]}
                  onChange={setCategory}
                />
              </div>
              <div className={styles.dropdownField}>
                <label>
                  Material Property{' '}
                  <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreatePostDropdown
                  label="Choose a material property"
                  placeholder="Choose a material property"
                  options={[
                    'Mechanical Property',
                    'Thermal Property',
                    'Electrical Property',
                    'Chemical Property',
                    'Other',
                  ]}
                  onChange={setMaterialProperty}
                />
              </div>
            </div>

            <div className={styles.halfWidth}>
              <div className={styles.dropdownField}>
                <label>
                  Condition <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreatePostDropdown
                  label="Choose a condition of the item"
                  placeholder="Choose a condition of the item"
                  options={['New', 'Like new', 'Good', 'Fair', 'Poor', 'Other']}
                  onChange={setCondition}
                />
              </div>
            </div>

            <DimensionField />

            <div className={styles.priceWidth}>
              <TextField
                label="Price"
                name="Price"
                type="number"
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
      </div>
    </main>
  );
}
