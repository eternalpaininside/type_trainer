import { states } from "./objects.js";
import { enterFocusMode, exitFocusMode } from "./focus-mode.js";
import { renderText, renderValueSwitcher } from "./render.js";
import "./handler.js";

document.addEventListener('mousemove', function () {
    if (states.isStarted && !states.isFinished) {
        exitFocusMode();
        clearTimeout(states.settingsTimeoutId);

        states.settingsTimeoutId = setTimeout(function () {
            enterFocusMode();
        }, 2000);
    }
});

renderText();
renderValueSwitcher();