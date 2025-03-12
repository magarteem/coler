import { getServerSession } from "next-auth";
import { AuthLayout } from "../shared/layouts/authLayout/AuthLayout";
import { BlockColorLayout } from "../shared/layouts/blockColorLayout/BlockColorLayout";
import styles from "./auth.module.scss";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
export default async function AuthLayoutPages({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!!session?.accessToken) redirect("/");

  return (
    <AuthLayout>
      <BlockColorLayout classNamesContainer={styles.customStyles}>
        {children}
      </BlockColorLayout>
    </AuthLayout>
  );
}
