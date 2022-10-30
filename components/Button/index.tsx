import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  onClickButton?: () => void;
}

const Button = ({ onClickButton, children, width = '100%' }: ButtonProps) => {
  return (
    <button onClick={onClickButton} style={{ width: width }} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
