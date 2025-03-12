import { BlockColorLayout } from "@/app/shared/layouts/blockColorLayout/BlockColorLayout";
import styles from "./subscription.module.scss";
import Link from "next/link";
import cn from "classnames";
import { TagStatusSubscription } from "@/app/shared/components/tags/tagStatusSubscription/TagStatusSubscription";
import { PageSectionsLayout } from "@/app/shared/layouts/pageSectionsLayout/PageSectionsLayout";

const auth = true;
const otherColorBlock = true;

export default function Subscription() {
  if (!auth) {
    return (
      <p className={styles.textCreateSub}>
        Активної підписки немає. Щоб придбати підписку{" "}
        <Link href="#" className={styles.createSubscription}>
          натисніть тут
        </Link>
      </p>
    );
  }

  return (
    <PageSectionsLayout>
      <BlockColorLayout
        classNamesContainer={cn(styles.positionContent, {
          [styles.otherColorBlock]: otherColorBlock,
        })}
      >
        <div className={cn(styles.gridPosition)}>
          <TagStatusSubscription type="active" />
          <p />
          <p className={styles.title}>Назва тарифу</p>
          <p className={styles.title}>Цінау</p>
          <p className={styles.text}>Початковий</p>
          <p className={styles.text}>20 грн/міс</p>
        </div>

        <div className={cn(styles.gridPosition)}>
          <p className={cn(styles.title, styles.tariffEnableTitle)}>
            Тариф включає
          </p>
          <p className={styles.text}>
            Маркування потенційно небезпечних номерів
          </p>
          <p className={styles.text}>Можливість зробити скаргу на номери</p>
          <p className={styles.text}>Активний захист підчас дзвінка</p>
        </div>

        <div className={cn(styles.gridPosition)}>
          <p className={styles.title}>Додатково</p>
          <p className={styles.title}>Сума компенсації</p>
          <p className={styles.text}>Захист від викрадення телефону</p>
          <p className={styles.text}>15 000 грн</p>
        </div>

        <div className={cn(styles.gridPosition)}>
          <p className={styles.title}>Дата оформлення</p>
          <p className={styles.title}>Дата наступної оплати</p>
          <p className={styles.text}>10.01.2025</p>
          <p className={styles.text}>10.02.2025</p>
        </div>
      </BlockColorLayout>
    </PageSectionsLayout>
  );
}
