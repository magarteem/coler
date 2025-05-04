import { PageSectionsLayout } from "@/app/shared/layouts/pageSectionsLayout/PageSectionsLayout";
import { getMyPlan } from "@/app/shared/api/getMyPlan";
import { NoSubscriptions } from "@/app/shared/components/noSubscriptions/NoSubscriptions";
import { MyPlanLayout } from "@/app/widgets/myPlan/MyPlanLayout";
import { getAllPlanList } from "@/app/shared/api/getAllPlanList";

export default async function Subscription() {
  const { response, error, status } = await getMyPlan();
  const { response: dataPlan } = await getAllPlanList();

  if (error) {
    console.log("Subscription error", error);
    return <p>ERROR</p>;
  }
  if (!response?.length) {
    return <NoSubscriptions />;
  }

  const plan = response[0];

  const planData = dataPlan?.find((x) => x.id === plan.planId);
  console.log("LIST PLAN", dataPlan);
  console.log("MY TARIFF", response);
  console.log("FIND PLAN ", planData);
  if (!planData) {
    return <NoSubscriptions />;
  }

  return (
    <PageSectionsLayout>
      <MyPlanLayout plan={plan} planData={planData} />
    </PageSectionsLayout>
  );
}
