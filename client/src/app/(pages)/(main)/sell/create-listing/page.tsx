'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import CreatePostDropdown from './_components/CreatePostDropdown/CreatePostDropdown';
import usePost from '@/app/_hooks/usePost';
import usePostImage from '@/app/_hooks/usePostImage';
import Preview from './_components/Preview/Preview';

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
  const [showPreview, setShowPreview] = useState(false);

  // Image state — keep both raw Files (for upload) and blob URLs (for preview)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const uploadedImages = useRef<string[]>([]);

  // Form field state (lifted from child components)
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [materialProperty, setMaterialProperty] = useState('');
  const [condition, setCondition] = useState('');
  const listingId = useRef<string | null>(null);
  const { postResource, pending, error } = usePost('/listings');
  const {
    postImage,
    pending: imageUploadPending,
    error: imageUploadError,
  } = usePostImage();
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

  const handleUploadImages = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert('Please add at least one image before previewing.');
      return;
    }

    try {
      const folder = listingId.current
        ? `listings/${listingId.current}`
        : `listings`;

      const newUploadedImages = [];

      for (const file of imageFiles) {
        const res = await postImage(file, folder);
        newUploadedImages.push(res.data.url);
      }

      uploadedImages.current = newUploadedImages;
    } catch (err) {
      console.error('Submit error:', err);
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleSubmitDraft = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listingResponse = await postResource({
      title,
      desc,
      price,
      category,
      materialProperty,
      condition,
      images: [],
      status: 'drafts',
    });

    listingId.current = listingResponse.data;
  };

  const handleAddImages = async () => {
    if (!listingId.current) {
      throw new Error('Invalid listing ID. Could not add images');
    }
    const addImageResponse = await postResource(
      { images: uploadedImages.current },
      `${listingId.current}/images`,
    );

    alert(`Listing ${title} has successfully been saved.`);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <Link href="/sell/active" className={styles.back}>
            <Image src={'/back_arrow.svg'} alt="<" width={32} height={32} />
            <div className={styles.backLink}>Back</div>
          </Link>
          <form
            className={styles.form}
            onSubmit={async (e) => {
              await handleSubmitDraft(e);
              await handleUploadImages(e);
              handleAddImages();
            }}
          >
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
                  <Image
                    src={'/frame.svg'}
                    alt="Photo"
                    width={32}
                    height={32}
                  />
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
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
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
                    options={[
                      'New',
                      'Like new',
                      'Good',
                      'Fair',
                      'Poor',
                      'Other',
                    ]}
                    onChange={setCondition}
                  />
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
              <button type="submit" className={styles.draftButton}>
                Save as draft
              </button>
              <button
                type="button"
                className={styles.previewButton}
                onClick={() => {
                  setShowPreview(true);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto', // 'auto' ensures an instant jump instead of smooth scrolling
                  });
                }}
              >
                See Preview
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPreview && (
        <Preview
          setShowPreview={setShowPreview}
          title={title}
          previewUrls={previewUrls}
          desc={desc}
          category={category}
          materialProperty={materialProperty}
          condition={condition}
          dimensions={dimensions}
          price={price}
        />
      )}
    </main>
  );
}
