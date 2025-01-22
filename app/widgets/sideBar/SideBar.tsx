import Image from "next/image";
import styles from "./sideBar.module.scss";
import Logo from "@/images/logo.svg?url";
import Logos from "@/images/logo.svg?svgr";

export const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <div>
        <Image width={100} height={100} src={Logo} alt="logo" />
        <p>ШахрайСтоп</p>
        <div style={{ width: "100px", backgroundColor: "red", height: "60px" }}>
          <Logos title="Logo" className={styles.s} />
        </div>
        <Logos height={10} title="Logo" />
      </div>
    </aside>
  );
};
