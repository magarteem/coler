import styles from "./tariffs.module.scss";
import { TariffsContent } from "@/app/widgets/tafiffsContent/TariffsContent";
import { getMyPlan } from "@/app/shared/api/getMyPlan";
import { getAllPlanList } from "@/app/shared/api/getAllPlanList";

export default async function Tariffs() {
  const { response, status, error } = await getAllPlanList();
  const { response: myPlan } = await getMyPlan();

  if (error) return <p>ERROR</p>;
  if (!response?.length || !myPlan) return <p>Loading</p>;

  return (
    <section className={styles.pageSectionsLayout}>
      <p className={styles.free}>Безкоштовна пробна версія 7 днів*</p>

      <TariffsContent data={response} myPlan={myPlan} />

      <div className={styles.newClient}>* Тільки для нових клієнтів</div>
    </section>
  );
}
