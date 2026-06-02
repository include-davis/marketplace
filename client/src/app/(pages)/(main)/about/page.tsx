import AboutCard from './_components/AboutCard/AboutCard';
import styles from './page.module.scss';

const ABOUT_CONTENT = [
  {
    header: 'About #include',
    content:
      '#include is a student-run organization at UC Davis that builds websites and mobile apps for local organizations in the Sacramento and Davis community. Our mission is to design and develop for social good while helping clients grow technologically. Through our projects, students gain real-world experience that strengthens their design, technical, teamwork, and communication skills—resulting in impressive products for our clients and standout portfolio pieces for our members.',
  },
  {
    header: 'Our Mission',
    content:
      'Our mission is to create a simple, central marketplace where UC Davis clubs can easily access and share the resources they need. #include designed this space to help organizations find equipment, borrow or sell items, make quick funding, and test components before committing to a purchase.',
  },
];

export default function About() {
  return (
    <div className={styles.page}>
      {ABOUT_CONTENT.map((card) => (
        <AboutCard
          key={card.header}
          header={card.header}
          content={card.content}
        />
      ))}
    </div>
  );
}
