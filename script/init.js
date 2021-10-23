const canvas = document.getElementById('canvas');
const gameWrapper = document.querySelector('.game-wrapper');
const gameWindow = gameWrapper.querySelector('.game-window');

const gameScoreNode = gameWrapper.querySelector('.score .current .text');
const highScoreNode = gameWrapper.querySelector('.score .highscore .text');

const menuBtns = document.querySelectorAll('button[data-menu]');
const gameControlBtns = document.querySelectorAll('#game-controls button');

const overlays = gameWindow.querySelector('.menu-overlay');
const overlayStart = overlays.querySelector('[data-overlay="start"]');
const overlayControls = overlays.querySelector('[data-overlay="controls"]');
const pauseFocusBtn = overlays.querySelector('[data-overlay="playPause"] button.focus');
const btnsStart = overlays.querySelectorAll('.new-game');
const btnsDiffChange = overlays.querySelectorAll('.change-diff');
const btnsToggleOverlay = overlays.querySelectorAll('.toggle-overlay');

const controlsKeyGroups = overlayControls.querySelectorAll('[data-key-group]');
const controlsAddBtns = overlayControls.querySelectorAll('.add-key-btn');

const keyControl = new KeyControl(gameWindow, true);

const keyButton = (function() {
  const button = document.createElement('button');
  button.type = 'button';
  const container = document.createElement('div');
  container.classList.add('container');

  button.appendChild(container);
  return button;
})();

let highscore = 0;


for (const l of btnsDiffChange) l.addEventListener('click', changeDifficulty);
for (const l of btnsStart) l.addEventListener('click', newGame);
for (const l of btnsToggleOverlay) l.addEventListener('click', toggleParentOverlay);
for (const l of menuBtns) l.addEventListener('click', handleMenu);
for (const l of controlsAddBtns) l.addEventListener('click', addControlsKeyBtn);

window.addEventListener('DOMContentLoaded', function() {
  snake.addEvent('gameOver', gameOver);
  snake.addEvent('score', handleScore);

  for (const keyActionGroup of controlsKeyGroups) {
    const actionProps = keyControl.actions.keydown[keyActionGroup.dataset.keyGroup];
    if (actionProps) {
      actionProps.keys.forEach((key, i) => {
        insertNewKeyButton(key, false, keyActionGroup);
      })
    }
  }
});


keyControl.addTag('arrow-controls', {
  fn: arrowKeyPress
});

keyControl.registerActions({
  'confirm': {
    keys: [0],
    gamepadTimeout: 200,
    fn: () => document.activeElement.click()
  },
  'tabNext': {
    keys: [1],
    gamepadTimeout: 200,
    fn: () => focusElementInTabIndex(1)
  },
  'tabPrevious': {
    keys: [2],
    gamepadTimeout: 200,
    fn: () => focusElementInTabIndex(-1)
  }
});

keyControl.registerAction('pauseUp', {
  event: 'keyup',
  keys: ['{Space}'],
  fn: () => pauseFocusBtn.focus()
});

keyControl.registerActions({
  playPause: {
    keys: ['{Space}'],
    fn: (e, name) => handleMenu(e, name, true)
  },
  restart: {
    keys: ['{KeyR}'],
    fn: handleMenu
  }
});

keyControl.registerActions({
  left: {
    keys: [14, '{KeyA}', 'ArrowLeft'],
    tags: ['arrow-controls']
  },
  right: {
    keys: [15, '{KeyD}', 'ArrowRight'],
    tags: ['arrow-controls']
  },
  up: {
    keys: [12, '{KeyW}', 'ArrowUp'],
    tags: ['arrow-controls']
  },
  down: {
    keys: [13, '{KeyS}', 'ArrowDown'],
    tags: ['arrow-controls']
  }
});