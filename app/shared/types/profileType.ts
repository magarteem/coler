interface ActiveSubscriptionsType {
  id: number;
  userId: number;
  planId: number;
  active: true;
  paymentType: string;
  startDate: number;
  endDate: number;
  durationMonth: number;
}

export interface UserType {
  acessToken: string;
  refreshToken: string;
  activeSubscriptions: ActiveSubscriptionsType[] | [];
}
