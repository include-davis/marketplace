import { Dispatch, SetStateAction } from 'react';
import CreatePostDropdown from '../CreatePostDropdown/CreatePostDropdown';
import styles from './Preview.module.scss';
import CreateStaticPostDropdown from '../CreateStaticPostDropdown/CreateStaticPostDropdown';
import Image from 'next/image';

function TextField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
}) {
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
          className={styles.textFieldBox}
          readOnly
        />
      </div>
    </div>
  );
}

function DimensionField({
  dimensions,
}: {
  dimensions: { length: string; width: string; height: string };
}) {
  return (
    <div className={styles.field}>
      <label>Item Dimensions (in meters)</label>
      <div className={styles.dimensionRow}>
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.length}
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.width}
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.height}
          className={styles.dimensionSquare}
        />
      </div>
    </div>
  );
}

export default function Preview({
  setShowPreview,
  title,
  desc,
  category,
  materialProperty,
  condition,
  dimensions,
  price,
}: {
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  title: string;
  desc: string;
  category: string;
  materialProperty: string;
  condition: string;
  dimensions: { length: string; width: string; height: string };
  price: string;
}) {
  return (
    <div className={styles.preview}>
      <div className={styles.previewBackground} />
      <div className={styles.previewPanelContainer}>
        <div className={styles.previewPanel}>
          <div className={styles.title}>
            <h2>List an item</h2>
          </div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Details</h2>
            <div>
              <TextField
                label="Title"
                name="Title"
                placeholder="Text"
                value={title}
              />
            </div>
            <div className={styles.textAreaField}>
              <label htmlFor="Description">
                Description <span className={styles.requiredSymbol}>*</span>
              </label>
              <textarea
                rows={8}
                placeholder="Give a brief description"
                className={styles.textAreaBox}
                value={desc}
                readOnly
              ></textarea>
            </div>
            <div className={styles.twoColumn}>
              <div className={styles.dropdownField}>
                <label>
                  Category <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreateStaticPostDropdown value={category} />
              </div>
              <div className={styles.dropdownField}>
                <label>
                  Material Property{' '}
                  <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreateStaticPostDropdown value={materialProperty} />
              </div>
            </div>
            <div className={styles.halfWidth}>
              <div className={styles.dropdownField}>
                <label>
                  Condition <span className={styles.requiredSymbol}>*</span>
                </label>
                <CreateStaticPostDropdown value={condition} />
              </div>
            </div>
            <DimensionField dimensions={dimensions} />
            <div className={styles.priceWidth}>
              <TextField
                label="Price"
                name="Price"
                type="number"
                placeholder="Add price"
                value={price}
              />
            </div>
          </section>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.draftButton}
              onClick={() => {
                setShowPreview(false);
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'auto', // 'auto' ensures an instant jump instead of smooth scrolling
                });
              }}
            >
              Go Back
            </button>
            <button type="submit" className={styles.previewButton}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
