import { states } from "./states.js";
import { enterFocusMode, exitFocusMode } from "./focus-mode.js";
import { renderText, renderValueSwitcher } from "./render.js";
import {resetTraining} from "./training.js";

import "./handler.js";

document.addEventListener('mousemove', function () {
    if (states.test.isStarted && !states.test.isFinished) {
        exitFocusMode();
        clearTimeout(states.ui.settingsTimeoutId);

        states.ui.settingsTimeoutId = setTimeout(function () {
            enterFocusMode();
        }, 2000);
    }
});

resetTraining();
renderText();
renderValueSwitcher();