import { getMyPlan } from "../shared/api/getMyPlan";
import { MainContentLayout } from "../shared/layouts/mainContentLayout/MainContentLayout";
import { Header } from "../widgets/header/Header";
import { SideBar } from "../widgets/sideBar/SideBar";

type Props = {
  children: React.ReactNode;
};
export default async function ProfileLayout({ children }: Props) {
  const { response, error, status } = await getMyPlan();

  return (
    <main className="gridMainLayout">
      <SideBar />
      <MainContentLayout>
        <Header myPlan={response} />
        {children}
      </MainContentLayout>
    </main>
  );
}
