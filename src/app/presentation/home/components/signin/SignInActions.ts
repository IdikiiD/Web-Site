import { createAction } from "typesafe-actions";

export const clickSignUpButton = createAction("[user] Click Sign Up Button")();

export const notifyUserIsSignedIn = createAction("Notify User Is Signed In")<{WMID:string, profitInPercent: number}>();
