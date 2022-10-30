import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react';
import Calendar from '../../../components/Calendar';
import Card from '../../../components/Card';
import { useAppDispatch } from '../../../hooks/selectorHooks';
import { setList } from '../../../redux/list/slice';
import styles from './List.module.scss';
import { useSelector } from 'react-redux';
import { selectList } from '../../../redux/list/selector';
import arrowPrevPage from '../../../assets/images/arrow-page-prev.svg';
import Image from 'next/image';
import Link from 'next/link';

interface ListItem {
  id: number;
  date: Date;
  address: string;
  person: string;
  prof: string;
  imgUrl: string;
}

interface ListContainerProps {
  list: Array<ListItem>;
}

interface ListProps extends ListContainerProps {}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await axios.get(`https://61a54a844c822c0017042179.mockapi.io/cards`);
    const list = data;
    return {
      props: { list },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { list: [] },
    };
  }
};

const ListContainer = ({ list }: ListContainerProps) => {
  const dispatch = useAppDispatch();

  const { list: listItems } = useSelector(selectList);

  React.useEffect(() => {
    dispatch(setList({ list: list }));
  }, []);

  return (
    <div className={styles.gridCard}>
      {listItems.length !== 0 ? (
        listItems.map(({ id, date, address, person, prof, imgUrl }) => (
          <Card
            id={id}
            key={id}
            date={date}
            address={address}
            person={person}
            prof={prof}
            imgUrl={imgUrl}
          />
        ))
      ) : (
        <p>У вас нет записей</p>
      )}
    </div>
  );
};

const CalendarContainer = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className={styles.calendarContainer}>
      <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDate(date)} />
    </div>
  );
};

/* Разделение на Контейнеры, можно было лучше подругому это обозвать. Но это позваляетт освободить компоненты от зависимости
от других пропсов и стейтов, что позволяет избавиться от ререндера
*/

const List = ({ list }: ListProps) => {
  return (
    <div className={styles.recordsContainer}>
      <p>
        <Link href="/profile" style={{ marginRight: '14px' }}>
          <Image width={18} height={13.5} src={arrowPrevPage} alt="Img prev page" />
        </Link>
        Мои записи
      </p>
      <div className={styles.recordsFlexContain}>
        <ListContainer list={list} />
        <CalendarContainer />
      </div>
    </div>
  );
};

const ListPage = ({ list }: ListContainerProps) => {
  return <List list={list} />;
};

export default ListPage;
