'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';

interface CloudinaryImage {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export default function ImageGalleryPage() {
  const params = useParams();
  const id = params.id as string;

  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:4000/images/${id}`);
        const json = await res.json();
        if (json.success) {
          setImages(json.data);
        } else {
          setError(json.message || 'Failed to load images.');
        }
      } catch {
        setError('Could not connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // --- Loading state ---
  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Loading images&hellip;</h1>
          <p className={styles.subtitle}>Folder: {id}</p>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
            </div>
          ))}
        </div>
      </main>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </main>
    );
  }

  // --- Empty state ---
  if (images.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>No images found</h1>
          <p className={styles.subtitle}>
            There are no images in folder &ldquo;{id}&rdquo;.
          </p>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📷</div>
          <p>This folder appears to be empty.</p>
        </div>
      </main>
    );
  }

  // --- Gallery ---
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Image Gallery</h1>
        <p className={styles.subtitle}>
          Folder: <span className={styles.folderId}>{id}</span> &mdash;{' '}
          {images.length} image{images.length !== 1 && 's'}
        </p>
      </div>

      <div className={styles.grid}>
        {images.map((img, i) => (
          <button
            key={img.publicId}
            className={styles.card}
            onClick={() => openLightbox(i)}
            type="button"
            aria-label={`View image ${i + 1}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={img.secureUrl}
                alt={img.publicId}
                width={img.width}
                height={img.height}
                className={styles.image}
                sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>View</span>
              </div>
            </div>
            <div className={styles.cardMeta}>
              <span className={styles.format}>{img.format.toUpperCase()}</span>
              <span className={styles.dimensions}>
                {img.width} × {img.height}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div className={styles.lightboxImageContainer}>
              <Image
                src={images[lightboxIndex].secureUrl}
                alt={images[lightboxIndex].publicId}
                width={images[lightboxIndex].width}
                height={images[lightboxIndex].height}
                className={styles.lightboxImage}
                sizes="90vw"
                priority
              />
            </div>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              ›
            </button>

            <div className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
