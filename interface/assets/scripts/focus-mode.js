const settingsPanel = document.getElementById( 'settings-panel');
const counterElement = document.getElementById('counter');
export const generateElement = document.getElementById('generate');

export const enterFocusMode = () => {
    settingsPanel.classList.add('focus-mode');
    generateElement.classList.add('focus-mode');
    counterElement.classList.remove('hidden');
}

export const exitFocusMode = () => {
    settingsPanel.classList.remove('focus-mode');
    generateElement.classList.remove('focus-mode');
    counterElement.classList.add('hidden');
}

