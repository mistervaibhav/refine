import dayjs from "dayjs";
import { fieldDateTests } from "@refinedev/ui-tests";

import "dayjs/locale/tr.js";

import { DateField } from "./";

describe("DateField", () => {
  /**
   * Ensure the Turkish locale is registered on the same Day.js instance used by the component.
   */
  dayjs.locale("en");

  fieldDateTests.bind(this)(DateField);
});
