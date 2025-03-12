import { useState } from "react";
import styles from "./infoBlockTariff.module.scss";
import cn from "classnames";
import { ShowMore } from "@/app/shared/components/showMore/ShowMore";
import { Title } from "@/app/shared/ui/title/Title";

interface Props {
  textTitle?: string;
  fzTitle?: number;
}
export const InfoBlockTariff = ({ textTitle, fzTitle }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className={styles.successPromoCode}>
      {textTitle && <Title text={textTitle} fs={fzTitle} fw={600} />}

      <div className={styles.info}>
        <div className={styles.gridPosition}>
          <p className={styles.title}>Назва тарифу</p>
          <p className={styles.title}>Цінау</p>
          <p className={styles.text}>Початковий</p>
          <p className={styles.text}>20 грн/міс</p>
          <p className={styles.title}>Дата оформлення</p>
          <p className={styles.title}>Дата наступної оплати</p>
          <p className={styles.text}>10.01.2025</p>
          <p className={styles.text}>10.02.2025</p>
        </div>

        <div
          className={cn(styles.gridShow, {
            [styles.noShow]: !showMoreInfo,
          })}
        >
          <div className={cn(styles.line)} />
          <div className={cn(styles.gridPosition)}>
            <p className={styles.title}>Тариф включає</p>
            <p className={styles.title}>Сума компенсації</p>
            <p className={styles.text}>
              <span className={styles.itemText}>Захист від шахраїв</span>
              <span className={styles.itemText}>Захист від надокучання</span>
              <span className={styles.itemText}>Захист від реклами</span>
            </p>
            <p className={styles.text}>15 000 грн</p>
            <p className={styles.title}>Додатково</p>
            <p className={styles.title}>Сума компенсації</p>
            <p className={styles.text}>Захист від викрадення телефону</p>
            <p className={styles.text}>15 000 грн</p>
          </div>
        </div>

        <ShowMore
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </div>
    </div>
  );
};
