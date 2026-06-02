import FaqDropdown from './_components/FaqDropdown/FaqDropdown';
import styles from './page.module.scss';

const FAQs = [
  {
    header: 'What if the seller or buyer does not show up?',
    content:
      'If someone does not show up, try contacting them through the app to reschedule. Since the app only facilitates communication, users are responsible for coordinating and honoring their own exchange arrangements.',
  },
  {
    header: 'How is money sent?',
    content:
      'Payment for an item is arranged directly between you and the seller. The app only facilitates communication and does not handle transactions or payments.',
  },
  {
    header: 'How is an item given?',
    content:
      'Items are exchanged in-person based on whatever arrangement you make with the seller.',
  },
  {
    header: 'Is there a recommended spot for item exchange?',
    content:
      'Any location on campus works for an exchange. Popular spots include the MU and the Silo.',
  },
];

export default function Faq() {
  return (
    <div className={styles.page}>
      <div className={styles.faqSection}>
        {FAQs.map((faq) => (
          <FaqDropdown header={faq.header} key={faq.header}>
            {faq.content}
          </FaqDropdown>
        ))}
      </div>
      <div className={styles.privacyPolicySection}>
        <h1>Terms and Services</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
