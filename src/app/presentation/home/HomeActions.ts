import { createAction } from "typesafe-actions";

export const initHomePage = createAction("Init Home Page")();

export const clickProfileButton = createAction("[user] Click Profile Button")();

export const clickJoinButton = createAction("[user] Click Join Button")();

export const notifyCloseProfile = createAction("Notify Close Profile")();
