import { PlanOptionsAdditional, PlanOptionsBase } from "../types/plan";

export const libPlanOptions: Record<PlanOptionsBase, string> = {
  "potentially dangerous numbers marking":
    "Маркування потенційно небезпечних номерів",
  "number complaints": "Можливість зробити скаргу на номери",
  "active fraud prevention during a call": "Активний захист підчас дзвінка",
  "fraud protection": "Захист від шахраїв",
  "anti-boring protection": "Захист від надокучання",
  "ad protection": "Захист від реклами",
};
export const libPlanOptionsAdditional: Record<PlanOptionsAdditional, string> = {
  "phone theft protection": "Захист від викрадення телефону",
};
