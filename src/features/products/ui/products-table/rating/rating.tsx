import styles from './rating.module.scss';

interface RatingProps {
  rating: number;
}

const GOOD_RATING = 3.5;

export const Rating = ({ rating }: RatingProps) => {
  return (
    <p className={styles.ratingText}>
      <span className={rating < GOOD_RATING ? styles.lowRatingText : ''}>
        {rating.toFixed(1)}
      </span>
      /5
    </p>
  );
};
