'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

function TextField({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUploadClick = () => {
    if (uploadedImages.length < 5) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = 5 - uploadedImages.length;
    const newFiles = Array.from(files).slice(0, remaining);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setUploadedImages((prev) => [...prev, ...newUrls]);

    e.target.value = '';
  };

  const handleRemoveImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setUploadedImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
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
          <section
            className={styles.uploadPhotosSection}
            onClick={handleUploadClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUploadClick();
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {uploadedImages.length === 0 ? (
              <div className={styles.uploadArea}>
                <Image src={'/frame.svg'} alt="Photo" width={32} height={32} />
                <h2>Add up to 5 photos</h2>
                <p>Drag or drop</p>
              </div>
            ) : (
              <div className={styles.imagePreviewGrid}>
                {uploadedImages.map((src, index) => (
                  <div key={src} className={styles.imagePreviewItem}>
                    <img
                      src={src}
                      alt={`Upload ${index + 1}`}
                      className={styles.imagePreview}
                    />
                    <button
                      type="button"
                      className={styles.removeImageButton}
                      onClick={(e) => handleRemoveImage(e, index)}
                      aria-label={`Remove image ${index + 1}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

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
                <div></div>
              </div>
              <div className={styles.dropdownField}>
                <label>
                  Material Property{' '}
                  <span className={styles.requiredSymbol}>*</span>
                </label>
                <div></div>
              </div>
            </div>

            <div className={styles.halfWidth}>
              <div className={styles.dropdownField}>
                <label>
                  Condition <span className={styles.requiredSymbol}>*</span>
                </label>
                <div></div>
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
