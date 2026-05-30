import Image from 'next/image';
import styles from './page.module.scss';
import GoogleLogo from '../../../../public/google_logo.svg';

export default function SignIn() {
  return (
    <div className={styles.page}>
      <div className={styles.signInBox}>
        <h1>Sign in</h1>
        <a
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
          className={styles.googleLink}
        >
          <button className={styles.googleButton}>
            <Image src={GoogleLogo} alt="Google" />
            Sign in with Google
          </button>
        </a>
      </div>
    </div>
  );
}
