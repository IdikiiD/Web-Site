import { createAction } from "typesafe-actions";

export const clickSignInButton = createAction("[user] Click Sign In Button")();

export const notifyUserIsSignedUp = createAction("Notify User In Signed Up")<{WMID:string, profitInPercent: number}>();
