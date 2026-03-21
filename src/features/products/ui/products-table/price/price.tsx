import styles from './price.module.scss';

interface PriceProps {
  value: number;
}

export const Price = ({ value }: PriceProps) => {
  return (
    <p className={styles.priceText}>
      {value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
    </p>
  );
};
