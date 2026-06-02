import Image from 'next/image';
import styles from './page.module.scss';
import GoogleLogo from '../../../../public/google_logo.svg';
import IncludeLogo from '../../../../public/include.svg';

export default function SignIn() {
  return (
    <div className={styles.page}>
      <div className={styles.signInBox}>
        <Image src={IncludeLogo} alt="Include logo" />
        <h1>Welcome</h1>
        <p>Sign In to use #include Marketplace</p>
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
