import type { Messages } from "../index";

import * as common from "./common";
import * as auth from "./auth";
import * as landing from "./landing";
import * as komoditas from "./komoditas";
import * as shopping from "./shopping";
import * as dashboard from "./dashboard";
import * as supplier from "./supplier";

export const id: Messages = {
  ...common.id,
  ...auth.id,
  ...landing.id,
  ...komoditas.id,
  ...shopping.id,
  ...dashboard.id,
  ...supplier.id,
};

export const en: Messages = {
  ...common.en,
  ...auth.en,
  ...landing.en,
  ...komoditas.en,
  ...shopping.en,
  ...dashboard.en,
  ...supplier.en,
};
