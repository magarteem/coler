import styles from "./showMore.module.scss";
import { Button } from "../../ui/button/Button";
import { Arrow } from "@/public/images";
import cn from "classnames";

interface Props {
  showMoreInfo: boolean;
  setShowMoreInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowMore = ({ showMoreInfo, setShowMoreInfo }: Props) => {
  const toggleShowMore = () => setShowMoreInfo((prev) => !prev);

  return (
    <Button
      icon={
        <Arrow
          className={cn(styles.iconArrow, {
            [styles.rotate]: showMoreInfo,
          })}
          width={16}
          height={16}
        />
      }
      type="button"
      variant="ghost"
      classNameContainer={styles.customStyleBtn}
      onClick={toggleShowMore}
    >
      {showMoreInfo ? "Приховати" : "Більше інформації"}
    </Button>
  );
};
