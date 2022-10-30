import Image from 'next/image';
import styles from './ElectronCard.module.scss';
import electronCardIamge from '../../assets/images/electron-card-image.svg';

const ElectronCard = () => {
  return (
    <div className={styles.electronCardContainer}>
      <div className={styles.imageContainer}>
        <Image width={50} height={50} src={electronCardIamge} alt="img card" />
      </div>
      <div className={styles.textGroup}>
        <h1>Результаты анализов</h1>
        <p>Вы можете узнать здесь результаты своих анализов</p>
      </div>
    </div>
  );
};

export default ElectronCard;
