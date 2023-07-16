import { PullStateInstance } from "@/src/pullstate.core";
import { KyInstance } from "ky/distribution/types/ky";
import { getUserByToken } from "../../api/account.api";
import { AccountStoreType } from "./AccountStore";


export const getUserInfo = async (stateInstance: PullStateInstance, api: KyInstance) => {
  const user = await getUserByToken(api);
  stateInstance.stores.AccountStore.update((s: AccountStoreType) => {
    s.user = user;
  });

};
