import styles from "./tariffs.module.scss";
import { TariffsContent } from "@/app/widgets/tafiffsContent/TariffsContent";
import { getPlanList } from "@/app/shared/api/getPlanList";

export default async function Tariffs() {
  const { response, status, error } = await getPlanList();

  if (error) return <p>ERROR</p>;
  if (!response?.length) return <p>Loading</p>;

  console.log("data", response);

  return (
    <section className={styles.pageSectionsLayout}>
      <p className={styles.free}>Безкоштовна пробна версія 7 днів*</p>

      <TariffsContent data={response} />

      <div className={styles.newClient}>* Тільки для нових клієнтів</div>
    </section>
  );
}
