import { BlockColorLayout } from "../shared/layouts/blockColorLayout/BlockColorLayout";
import styles from "./profile.module.scss";
import { PageSectionsLayout } from "../shared/layouts/pageSectionsLayout/PageSectionsLayout";
import { Camera } from "@/public/images";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { formatUaPhone } from "../shared/helpers/formatUaPhone";

export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <PageSectionsLayout>
      <BlockColorLayout>
        <div className={styles.profileInfo}>
          <div className={styles.circle}>
            <Camera height={24} width={24} />
          </div>
          <div className={styles.contact}>
            <p className={styles.phone}>Номер телефону</p>
            <p className={styles.phoneNumber}>
              {/*//@ts-ignore*/}
              {formatUaPhone(`${session?.phone}`)}
            </p>
          </div>
        </div>
      </BlockColorLayout>
    </PageSectionsLayout>
  );
}
