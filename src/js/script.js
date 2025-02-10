"use strict";

// Connecting vendors (plugins)
import "./_vendor";

// Functions
import { modals, swiperInit, updateTimer } from "./functions/";

// Components
// import { formValidation } from "./components/";

window.addEventListener("DOMContentLoaded", () => {
  swiperInit();
  updateTimer();
  modals();
});
