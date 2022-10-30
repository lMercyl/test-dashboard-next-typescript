import React from 'react';
import Card from '../../components/Card';
import ElectronCard from '../../components/ElectronCard';
import { GetStaticProps } from 'next';
import styles from './List.module.scss';
import axios from 'axios';
import Link from 'next/link';;
import { useAppDispatch } from '../../hooks/selectorHooks';
import { setList } from '../../redux/list/slice';
import { useSelector } from 'react-redux';
import { selectList } from '../../redux/list/selector';

interface ListItem {
  id: number;
  date: Date;
  address: string;
  person: string;
  prof: string;
  imgUrl: string;
}

interface ProfileProps {
  list: Array<ListItem>;
}

interface CardContainer extends ProfileProps {}

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

const CardContainer = ({ list }: CardContainer) => {
  const dispatch = useAppDispatch();

  const { list: listItems } = useSelector(selectList);

  React.useEffect(() => {
    dispatch(setList({ list: list }));
  }, []);

  return (
    <div className={styles.gridCard}>
      {listItems.length !== 0 ? (
        <>
          {listItems.length !== 0 &&
            listItems.map(({ id, date, address, person, prof, imgUrl }, index) => {
              if (index === 0 || index === 1) {
                return (
                  <Card
                    id={id}
                    key={id}
                    date={date}
                    address={address}
                    person={person}
                    prof={prof}
                    imgUrl={imgUrl}
                  />
                );
              }
            })}
          {listItems.length > 2 && (
            <p className={styles.other}>
              Еще {listItems.length - 2} записи <Link href="/profile/list">Подробнее</Link>
            </p>
          )}
        </>
      ) : (
        <p>У вас нет записей</p>
      )}
    </div>
  );
};

const ElectronCardContainer = () => {
  return (
    <div className={styles.gridElectronCard}>
      <ElectronCard />
      <ElectronCard />
      <ElectronCard />
      <ElectronCard />
    </div>
  );
};

const Profile = ({ list }: ProfileProps) => {
  return (
    <div className={styles.listContainer}>
      <p>
        Записи на прием
      </p>
      <CardContainer list={list} />
      <p>Электронная карта</p>
      <ElectronCardContainer />
    </div>
  );
};

export default Profile;
