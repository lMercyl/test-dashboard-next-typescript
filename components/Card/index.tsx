import styles from './Card.module.scss';
import Image from 'next/image';
import Button from '../Button';
import { formatDateCard } from '../../utils/helpers/card/formatDateCard';
import { useAppDispatch } from '../../hooks/selectorHooks';
import { deleteItem } from '../../redux/list/asyncActions';

interface CardProps {
  id: number;
  date: Date;
  address: string;
  person: string;
  prof: string;
  imgUrl: string;
}

const Card = ({ id, date, address, person, prof, imgUrl }: CardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.date}>{formatDateCard(new Date(date))}</h1>
      <p className={styles.address}>{address}</p>
      <div className={styles.cardGroup}>
        <div>
          <Image width={60} height={60} src={imgUrl} alt="Person" />
          <div>
            <p className={styles.subtext}>{person}</p>
            <p className={styles.subtext}>{prof}</p>
          </div>
        </div>
        <Button
          onClickButton={() => {
            dispatch(deleteItem({ id: id }));
          }}
          width="98px">
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default Card;
