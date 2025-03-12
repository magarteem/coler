import Link from "next/link";
import { BlockColorLayout } from "../shared/layouts/blockColorLayout/BlockColorLayout";
import styles from "./profile.module.scss";
import { PageSectionsLayout } from "../shared/layouts/pageSectionsLayout/PageSectionsLayout";
import { Camera } from "@/public/images";

const auth = true;

export default function Profile() {
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
      <BlockColorLayout>
        <div className={styles.profileInfo}>
          <div className={styles.circle}>
            <Camera height={24} width={24} />
          </div>
          <div className={styles.contact}>
            <p className={styles.phone}>Номер телефону</p>
            <p className={styles.phoneNumber}>+38 (050) 987-65-43</p>
          </div>
        </div>
      </BlockColorLayout>
    </PageSectionsLayout>
  );
}
