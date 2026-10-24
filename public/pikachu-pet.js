// pikachu-pet.js
// Adapted from Oneko.js: https://github.com/adryd325/oneko.js

(function pikachuPet() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Prevent duplicate initialization
  if (document.getElementById("pikachu-pet")) return;

  const script = document.currentScript;

  const SPRITE = script?.dataset.sprite || "/pets/pikachu.png";
  const SIZE = parseInt(script?.dataset.size || "56", 10);

  const COLS = 8;
  const ROWS = 4;
  const SPEED = 10;

  const WAKE_DURATION = 8;

  // -----------------------------------------
  // SPRITE FRAMES
  // -----------------------------------------

  const spriteSets = {
    idle: [[0, 0]],

    alert: [[7, 0]],

    tired: [[4, 0]],

    // One frame only: no rotation while sleeping
    sleeping: [[5, 0]],

    scratchSelf: [
      [2, 0],
      [3, 0],
    ],

    scratchWallN: [
      [0, 1],
      [1, 1],
    ],

    scratchWallS: [
      [0, 3],
      [1, 3],
    ],

    scratchWallE: [
      [2, 3],
      [3, 3],
    ],

    scratchWallW: [
      [2, 2],
      [3, 2],
    ],

    N: [
      [0, 2],
      [1, 2],
    ],

    NE: [
      [6, 1],
      [7, 1],
    ],

    E: [
      [5, 1],
      [4, 1],
    ],

    SE: [
      [2, 1],
      [3, 1],
    ],

    S: [
      [4, 3],
      [5, 3],
    ],

    SW: [
      [6, 3],
      [7, 3],
    ],

    W: [
      [4, 2],
      [5, 2],
    ],

    NW: [
      [6, 2],
      [7, 2],
    ],
  };

  // -----------------------------------------
  // ELEMENTS
  // -----------------------------------------

  const el = document.createElement("div");
  const tooltip = document.createElement("div");

  // -----------------------------------------
  // STATE
  // -----------------------------------------

  let posX = 80;
  let posY = 80;

  let mouseX = 0;
  let mouseY = 0;

  let frameCount = 0;

  let idleTime = 0;
  let idleAnimation = null;
  let idleFrame = 0;

  let lastTs = 0;

  let forcedSleep = false;
  let sleepFrame = 0;

  let wakeTimer = 0;

  // -----------------------------------------
  // SPRITE HANDLING
  // -----------------------------------------

  function setSprite(name, frame = 0) {
    const set = spriteSets[name];

    if (!set) return;

    const [col, row] = set[frame % set.length];

    el.style.backgroundPosition = `${-col * SIZE}px ${-row * SIZE}px`;
  }

  function resetIdle() {
    idleAnimation = null;
    idleFrame = 0;
  }

  // -----------------------------------------
  // LOCAL STORAGE
  // -----------------------------------------

  function saveState() {
    try {
      localStorage.setItem(
        "pikachu-pet",
        JSON.stringify({
          posX,
          posY,
          forcedSleep,
        }),
      );
    } catch {
      // Ignore storage errors
    }
  }

  // -----------------------------------------
  // TOOLTIP
  // -----------------------------------------

  function showTooltip() {
    if (!forcedSleep) return;

    const rect = el.getBoundingClientRect();

    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 8}px`;
    tooltip.style.transform = "translate(-50%, -100%)";

    tooltip.style.opacity = "1";
    tooltip.style.visibility = "visible";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
    tooltip.style.visibility = "hidden";
  }

  // -----------------------------------------
  // SLEEP ANIMATION
  // -----------------------------------------

  function sleepLoop() {
    if (sleepFrame < 8) {
      setSprite("tired", 0);
    } else {
      // Fixed sleeping pose
      setSprite("sleeping", 0);
    }

    sleepFrame++;
  }

  // -----------------------------------------
  // PUT PIKACHU TO SLEEP
  // -----------------------------------------

  function goToSleep() {
    forcedSleep = true;

    sleepFrame = 0;
    wakeTimer = 0;
    idleTime = 0;

    resetIdle();
    hideTooltip();

    setSprite("tired", 0);

    saveState();
  }

  // -----------------------------------------
  // WAKE UP PIKACHU
  // -----------------------------------------

  function wakeUp() {
    if (!forcedSleep) return;

    forcedSleep = false;

    sleepFrame = 0;
    idleTime = 0;

    resetIdle();
    hideTooltip();

    // Display surprised pose briefly
    wakeTimer = WAKE_DURATION;

    setSprite("alert", 0);

    saveState();
  }

  // -----------------------------------------
  // CLICK HANDLER
  // -----------------------------------------

  function handleClick(event) {
    event.stopPropagation();

    if (forcedSleep) {
      wakeUp();
    } else {
      goToSleep();
    }
  }

  // -----------------------------------------
  // RANDOM IDLE ANIMATIONS
  // -----------------------------------------

  function idle() {
    idleTime++;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation === null
    ) {
      const options = ["sleeping", "scratchSelf"];

      if (posX < SIZE) options.push("scratchWallW");

      if (posY < SIZE) options.push("scratchWallN");

      if (posX > window.innerWidth - SIZE) {
        options.push("scratchWallE");
      }

      if (posY > window.innerHeight - SIZE) {
        options.push("scratchWallS");
      }

      idleAnimation = options[Math.floor(Math.random() * options.length)];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleFrame < 8) {
          setSprite("tired", 0);
          break;
        }

        setSprite("sleeping", 0);

        if (idleFrame > 192) resetIdle();

        break;

      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleFrame);

        if (idleFrame > 9) resetIdle();

        break;

      default:
        setSprite("idle", 0);
        return;
    }

    idleFrame++;
  }

  // -----------------------------------------
  // MAIN ANIMATION
  // -----------------------------------------

  function frame() {
    // Manually sleeping
    if (forcedSleep) {
      sleepLoop();
      return;
    }

    // Show wake-up expression before moving
    if (wakeTimer > 0) {
      setSprite("alert", 0);
      wakeTimer--;
      return;
    }

    frameCount++;

    const dx = posX - mouseX;
    const dy = posY - mouseY;

    const dist = Math.hypot(dx, dy);

    // Stop near the cursor
    if (dist < SPEED || dist < SIZE * 1.5) {
      idle();
      return;
    }

    resetIdle();

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7) - 1;
      return;
    }

    let dir = "";

    dir += dy / dist > 0.5 ? "N" : "";
    dir += dy / dist < -0.5 ? "S" : "";

    dir += dx / dist > 0.5 ? "W" : "";
    dir += dx / dist < -0.5 ? "E" : "";

    setSprite(dir, frameCount);

    posX -= (dx / dist) * SPEED;
    posY -= (dy / dist) * SPEED;

    // Keep Pikachu inside the viewport
    posX = Math.min(Math.max(SIZE / 2, posX), window.innerWidth - SIZE / 2);

    posY = Math.min(Math.max(SIZE / 2, posY), window.innerHeight - SIZE / 2);

    el.style.left = `${posX - SIZE / 2}px`;
    el.style.top = `${posY - SIZE / 2}px`;
  }

  // -----------------------------------------
  // ANIMATION LOOP
  // -----------------------------------------

  function tick(timestamp) {
    if (!el.isConnected) return;

    if (timestamp - lastTs > 100) {
      lastTs = timestamp;
      frame();
    }

    requestAnimationFrame(tick);
  }

  // -----------------------------------------
  // INITIALIZATION
  // -----------------------------------------

  function init() {
    if (document.getElementById("pikachu-pet")) return;

    // Restore saved position and sleep state
    try {
      const saved = JSON.parse(localStorage.getItem("pikachu-pet"));

      if (saved) {
        posX = saved.posX ?? posX;
        posY = saved.posY ?? posY;
        forcedSleep = !!saved.forcedSleep;
      }
    } catch {
      // Ignore storage errors
    }

    // Pikachu element
    el.id = "pikachu-pet";
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Pikachu cursor pet");
    el.setAttribute("tabindex", "0");

    Object.assign(el.style, {
      width: `${SIZE}px`,
      height: `${SIZE}px`,

      position: "fixed",

      pointerEvents: "auto",
      cursor: "pointer",

      left: `${posX - SIZE / 2}px`,
      top: `${posY - SIZE / 2}px`,

      zIndex: "2147483646",

      backgroundImage: `url("${SPRITE}")`,
      backgroundSize: `${COLS * SIZE}px ${ROWS * SIZE}px`,
      backgroundRepeat: "no-repeat",

      imageRendering: "pixelated",

      userSelect: "none",
    });

    // Tooltip — same styling as your Radix tooltip
    tooltip.id = "pikachu-tooltip";
    tooltip.textContent = "Wake up Pikachu ⚡";

    tooltip.className =
      "pointer-events-none fixed z-[2147483647] rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md transition-opacity duration-200";

    Object.assign(tooltip.style, {
      opacity: "0",
      visibility: "hidden",
      whiteSpace: "nowrap",
    });

    document.body.appendChild(el);
    document.body.appendChild(tooltip);

    setSprite(forcedSleep ? "sleeping" : "idle", 0);

    // Click Pikachu to sleep/wake
    el.addEventListener("click", handleClick);

    // Hover sleeping Pikachu to display tooltip
    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);

    // Keyboard accessibility
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick(event);
      }
    });

    // Follow cursor
    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    window.addEventListener("beforeunload", saveState);

    requestAnimationFrame(tick);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  }
})();
