import Image from 'next/image';
import styles from './Sidebar.module.scss';
import Button from '../../components/Button';
import {
  NavImageKnow,
  NavItemCompany,
  NavItemMessage,
  NavItemTests,
  NavImageProfile,
} from '../../components/NavImage';
import Link from 'next/link';

const Sidebar = () => {
  

  return (
    <aside className={styles.container}>
      <div>
        <p>Логотип</p>
      </div>
      <nav>
        <ul>
          <li>
            <NavImageProfile />
            <Link href="/profile">Профиль</Link>
          </li>
          <li>
            <NavItemCompany />
            <a href="">Врачи и клиники</a>
          </li>
          <li>
            <NavItemMessage />
            <a href="">Сообщения</a>
          </li>
          <li>
            <NavItemTests />
            <a href="">Тестирование</a>
          </li>
          <li>
            <NavImageKnow />
            <a href="">Полезно знать</a>
          </li>
        </ul>
      </nav>
      <div className={styles.buttonContainer}>
        <Button>Подать заявку</Button>
      </div>
    </aside>
  );
};

export default Sidebar;
