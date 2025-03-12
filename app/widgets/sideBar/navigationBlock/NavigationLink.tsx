import { LinkElement } from "@/app/shared/ui/link/LinkElement";
import styles from "./navigationBlock.module.scss";
import { RouteNames } from "@/app/shared/types/RouteNames";
import { Profile, Subscription, Tariffs } from "@/public/images";

interface Props {
  showSideBar?: () => void;
}
export const NavigationBlock = ({ showSideBar }: Props) => {
  return (
    <div className={styles.navigationBlock}>
      <LinkElement to={RouteNames.HOME} onClick={showSideBar} variant="md">
        <Profile width={24} height={24} />
        <span>Профайл</span>
      </LinkElement>

      <LinkElement
        to={RouteNames.SUBSCRIPTION}
        onClick={showSideBar}
        variant="md"
      >
        <Subscription width={24} height={24} />
        <span>Підписка</span>
      </LinkElement>

      <LinkElement to={RouteNames.TARIFFS} onClick={showSideBar} variant="md">
        <Tariffs width={24} height={24} />
        <span>Тарифи</span>
      </LinkElement>
    </div>
  );
};
