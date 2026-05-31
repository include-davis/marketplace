'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080';

function TextField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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
          onChange={(e) => onChange(e.target.value)}
          className={styles.textFieldBox}
        />
      </div>
    </div>
  );
}

function DimensionField({
  dimensions,
  onChange,
}: {
  dimensions: { length: string; width: string; height: string };
  onChange: (field: 'length' | 'width' | 'height', value: string) => void;
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
          onChange={(e) => onChange('length', e.target.value)}
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.width}
          onChange={(e) => onChange('width', e.target.value)}
          className={styles.dimensionSquare}
        />
        <Image src={'/dimensions_x.svg'} alt="x" width={32} height={32} />
        <input
          type="number"
          inputMode="decimal"
          placeholder="#"
          value={dimensions.height}
          onChange={(e) => onChange('height', e.target.value)}
          className={styles.dimensionSquare}
        />
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image state — keep both raw Files (for upload) and blob URLs (for preview)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Form field state (lifted from child components)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const handleUploadClick = () => {
    if (imageFiles.length < 5) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = 5 - imageFiles.length;
    const newFiles = Array.from(files).slice(0, remaining);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);

    e.target.value = '';
  };

  const handleRemoveImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDimensionChange = (
    field: 'length' | 'width' | 'height',
    value: string,
  ) => {
    setDimensions((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create the listing via POST /listings (no images yet)
      const listingBody = {
        title,
        desc: description,
        price: Number(price),
        category: '',
        stock: 1,
      };

      const listingRes = await fetch(`${API_BASE}/listings`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingBody),
      });

      const listingCt = listingRes.headers.get('content-type') ?? '';
      if (!listingCt.includes('application/json')) {
        throw new Error(`Failed to create listing (${listingRes.status})`);
      }
      const listingData = await listingRes.json();
      if (!listingRes.ok || !listingData.success) {
        throw new Error(listingData.message ?? 'Failed to create listing');
      }

      const listingId = listingData.data;
      console.log('Listing created with id:', listingId);

      // 2. Upload each image into a folder named after the listing ID
      const uploadedImages: { url: string; publicId: string }[] = [];

      for (const file of imageFiles) {
        const form = new FormData();
        form.append('file', file);
        form.append('folder', `listings/${listingId}`);

        const res = await fetch(`${API_BASE}/images/upload`, {
          method: 'POST',
          credentials: 'include',
          body: form,
        });

        const contentType = res.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
          throw new Error(`Image upload failed (${res.status})`);
        }
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message ?? 'Image upload failed');
        }
        uploadedImages.push(data.data);
      }

      console.log('All images uploaded:', uploadedImages);

      // 3. Update the listing with the uploaded image URLs
      if (uploadedImages.length > 0) {
        const updateRes = await fetch(`${API_BASE}/listings/${listingId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...listingBody, images: uploadedImages }),
        });

        const updateCt = updateRes.headers.get('content-type') ?? '';
        if (!updateCt.includes('application/json')) {
          throw new Error(
            `Failed to update listing with images (${updateRes.status})`,
          );
        }
        const updateData = await updateRes.json();
        if (!updateRes.ok || !updateData.success) {
          throw new Error(
            updateData.message ?? 'Failed to attach images to listing',
          );
        }
      }

      alert(`Listing created successfully! ID: ${listingId}`);

      // TODO: router.push(`/listing/${listingId}`) once preview page exists
    } catch (err) {
      console.error('Submit error:', err);
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContainer}>
        <Link href="/home" className={styles.back}>
          <Image src={'/back_arrow.svg'} alt="<" width={32} height={32} />
          <div className={styles.backLink}>Back</div>
        </Link>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            {previewUrls.length === 0 ? (
              <div className={styles.uploadArea}>
                <Image src={'/frame.svg'} alt="Photo" width={32} height={32} />
                <h2>Add up to 5 photos</h2>
                <p>Drag or drop</p>
              </div>
            ) : (
              <div className={styles.imagePreviewGrid}>
                {previewUrls.map((src, index) => (
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
                {previewUrls.length < 5 && (
                  <div className={styles.addMorePlaceholder}>
                    <span>+</span>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Details</h2>

            <div>
              <TextField
                label="Title"
                name="Title"
                placeholder="Text"
                value={title}
                onChange={setTitle}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            <DimensionField
              dimensions={dimensions}
              onChange={handleDimensionChange}
            />

            <div className={styles.priceWidth}>
              <TextField
                label="Price"
                name="Price"
                type="number"
                placeholder="Add price"
                value={price}
                onChange={setPrice}
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
