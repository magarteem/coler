import { MainContentLayout } from "../shared/layouts/mainContentLayout/MainContentLayout";
import { Header } from "../widgets/header/Header";
import { SideBar } from "../widgets/sideBar/SideBar";

type Props = {
  children: React.ReactNode;
};
export default function ProfileLayout({ children }: Props) {
  return (
    <main className="gridMainLayout">
      <SideBar />
      <MainContentLayout>
        <Header />
        {children}
      </MainContentLayout>
    </main>
  );
}
