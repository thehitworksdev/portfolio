import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// ============================================================
// CHARACTER STATE
// ============================================================
// Keep this in sync with the `manifest` keys in SpriteCharacter.tsx —
// import this type there instead of retyping the union.
export type CharacterState =
  | "idle_standing"
  | "idle_whistle"
  | "idle_eating_candy"
  | "offer_candy"
  | "sleep_nap"
  | "surprised"
  | "talking"
  | "thinking"
  | "greet_wave"
  | "celebration"
  | "angry"
  | "scooter_drive"
  | "run"
  | "walk"
  | "tired";

export interface RouteConfig {
  state: CharacterState;
  lines: string[];
}

export const ROUTE_LINES: Record<string, RouteConfig> = {
  "/": {
    state: "greet_wave",
    lines: [
      "Oh! A human.",
      "Welcome to THE HIT WORKS. 😎",
      "Try not to break anything.",
    ],
  },
  "/services": {
    state: "talking",
    lines: [
      "Ah, so you want us to build something.",
      "Excellent choice.",
      "What are we cooking? 👀",
    ],
  },
  "/technologies": {
    state: "thinking",
    lines: [
      "You came for the tech stack?",
      "Okay... this might get nerdy.",
      "Don't worry. We have Python. 🐍",
    ],
  },
  "/portfolio": {
    state: "talking",
    lines: [
      "You want proof we actually build things?",
      "Fair.",
      "Prepare to judge our life choices.",
    ],
  },
  "/contact": {
    state: "celebration",
    lines: [
      "WAIT.",
      "You actually found the Contact page?!",
      "Let's build something ridiculous. 🚀",
    ],
  },
  "/solutions": {
    state: "thinking",
    lines: [
      "Hmm...",
      "What problem are we destroying today?",
      "Let's find the right weapon. 🧠",
    ],
  },
  "/process": {
    state: "talking",
    lines: [
      "Want to see how we work?",
      "Step 1: Idea.",
      "Step 2: Coffee.",
      "Step 3: Somehow... production. ☕",
    ],
  },
  "/pricing": {
    state: "thinking",
    lines: [
      "Ah yes...",
      "The page everyone visits eventually.",
      "Let's talk money. 💸",
    ],
  },
  "/careers": {
    state: "talking",
    lines: [
      "Thinking about joining us?",
      "Interesting...",
      "Do you know how to survive Git conflicts? 👀",
    ],
  },
  "/faq": {
    state: "thinking",
    lines: ["Questions?", "Good.", "I have answers... probably."],
  },
  "/blog": {
    state: "talking",
    lines: [
      "Ah, the blog.",
      "Where developers pretend they have everything figured out.",
      "Enjoy. 😌",
    ],
  },
  "/case-studies": {
    state: "talking",
    lines: [
      "You want the serious stuff?",
      "Alright.",
      "Let's inspect the damage. 🔎",
    ],
  },
};

export const IDLE_TALK_LINES: string[] = [
  "Psst...",
  "You're still here?",
  "Need something built?",
  "I could build it... probably.",
  "What are you working on?",
  "Don't mind me. I'm on break.",
  "This website has snacks somewhere.",
  "Have you tried clicking things?",
  "I feel like you're watching me.",
  "Okay, this is getting awkward.",
  "You browse. I'll pretend to work.",
  "Should we build something cool?",
  "I'm technically working right now.",
  "Where were we?",
  "I forgot what I was doing.",
];

// ============================================================
// INTERACTION  FAST SCROLL
// ============================================================

export const FAST_SCROLL_LINES: string[] = [
  "HEY!",
  "Slow down! 😭",
  "I'm trying to keep up!",
  "Are you speedrunning the website?!",
  "BRO I HAVE LEGS!",
  "Okay, I officially cannot keep up.",
  "STOP SCROLLING! I'M GETTING MOTION SICK!",
];

export const SCOOTER_LINE = "Fine... I'll use my scooter. 🛵";

export const SCOOTER_LINES: string[] = [
  "Out of my way!",
  "Emergency commute!",
  "Management said we're late!",
  "This thing has TWO horsepower!",
  "WHO GAVE ME A SCOOTER?!",
  "Okay... this is actually faster.",
];

export const CANDY_LINE = "Want one? 🍬";

export const CANDY_LINES: string[] = [
  "Take one.",
  "Don't eat them all.",
  "I was saving that...",
  "Fine. You can have one.",
  "Candy break!",
];

export const TIRED_LINE = "Okay... I need a break.";

export const TIRED_LINES: string[] = [
  "My pixels hurt.",
  "I need coffee.",
  "Five minute break.",
  "Tell management I'm unavailable.",
  "I wasn't built for overtime.",
  "I'm going offline for emotional maintenance.",
];

export const WAKE_LINE = "Oh! You're back.";

export const WAKE_LINES: string[] = [
  "Oh! You're back.",
  "I was definitely working.",
  "Welcome back!",
  "You left me alone. Rude.",
  "Back already?",
  "I missed absolutely nothing.",
];

export const MOUSE_LINES: string[] = [
  "Hey! Don't poke me.",
  "I saw that.",
  "Are you testing me?",
  "Stop following me with that mouse.",
  "What are you looking at? 👀",
];

export const HOVER_LINES: string[] = [
  "Oh, you're interested.",
  "Good choice.",
  "That's actually pretty cool.",
  "Click it. I dare you.",
  "Go ahead...",
  "You know you want to.",
];

export const CLICK_LINES: string[] = [
  "HEY!",
  "You clicked me!",
  "Okay... that was personal.",
  "What did you expect to happen?",
  "I'm not a button!",
  "Stop pressing me!",
  "Okay, I kinda like that.",
];

export const SPAM_CLICK_LINES: string[] = [
  "STOP.",
  "Seriously.",
  "I SAID STOP.",
  "Why are you like this?",
  "I'm calling the developer.",
  "Okay. That's enough.",
  "I'm going to crash out of spite.",
];

export const EXIT_LINES: string[] = [
  "Leaving already?",
  "Wait!",
  "We were just getting started!",
  "You forgot something!",
  "Fine... I'll remember this.",
];

export const TOP_LINES: string[] = [
  "Back to the top?",
  "Round two!",
  "You missed something down there.",
  "Starting over, huh?",
  "The top is a nice place.",
];

export const INACTIVITY_LINES: string[] = [
  "Uhh... you still there?",
  "Did you fall asleep?",
  "Should I call someone?",
  "Hello?",
  "I'm beginning to question this friendship.",
  "Okay. I'll just stand here.",
];

export const CINEMATIC_LINES: string[] = [
  "Wait...",
  "Did you hear that?",
  "Something feels different.",
  "Okay... that was weird.",
  "I think we're being watched.",
  "Never mind.",
  "Everything is completely normal.",
];

export const SECRET_LINES: string[] = [
  "You found the secret dialogue.",
  "I wasn't supposed to say this...",
  "The developers are watching.",
  "Okay, you win.",
  "Achievement unlocked: Curious Human 🏆",
];

export const CHAOS_LINES: string[] = [
  "Uh oh.",
  "Something definitely happened.",
  "That wasn't supposed to happen.",
  "Pretend you didn't see that.",
  "It's a feature.",
  "Works on my machine.",
];

export const FINAL_BOSS_LINES: string[] = [
  "You've explored everything.",
  "Respect.",
  "Now...",
  "Are we building something or what? 😎",
];

export const GOODBYE_LINE = "See you around, human. 👋";
export const COFFEE_LINE = "Coffee first. Code second. ☕";
export const DEBUG_LINE = "Have you tried turning it off and on again?";
export const DEPLOY_LINE = "Deploying to production... wish me luck. 🚀";

export const CINEMATIC_SEQUENCES: Record<string, string[]> = {
  firstVisit: [
    "Oh...",
    "A visitor.",
    "Interesting.",
    "Welcome to THE HIT WORKS. 😎",
  ],
  fastScroll: [
    "HEY!",
    "SLOW DOWN!",
    "I'M COMING!",
    "Fine...",
    "I'll use my scooter. 🛵",
  ],
  contact: ["WAIT.", "YOU MADE IT.", "CONTACT?!", "We should probably talk."],
  portfolio: ["You want to see our work?", "Alright...", "Roll the footage. 🎬"],
  pricing: [
    "Here we are...",
    "The money room.",
    "Everyone gets nervous here.",
    "Let's talk numbers. 💸",
  ],
  idle: ["Hmm...", "Nothing happening.", "I could use a coffee.", "☕"],
  goodbye: ["Leaving?", "Alright...", "See you around.", "Don't be a stranger. 👋"],
};

const WHISTLE_AFTER = 6000;
const CANDY_AFTER = 15000;
const SLEEP_AFTER = 40000;

const SCROLL_SETTLE_MS = 180;

const WALK_SPEED = 0.12;
const RUN_SPEED = 0.8;
const EXTREME_SPEED = 2.0;

// 0% page scroll  = MIN_X
// 100% page scroll = MAX_X
const MIN_X = 8;
const MAX_X = 92;

const X_SMOOTHNESS = 0.08;

const SCOOTER_MIN_TIME = 4000;

const CONTINUOUS_MOVE_TIRED_MS = 9000;

// ============================================================
// HOOK
// ============================================================

export interface UseCharacterBehaviorReturn {
  state: CharacterState;
  line: string | null;
  facing: number;
  x: number;
  handleClick: () => void;
}

export function useCharacterBehavior(): UseCharacterBehaviorReturn {
  const location = useLocation();

  // ==========================================================
  // STATE
  // ==========================================================

  const [state, setState] = useState<CharacterState>("idle_standing");
  const [line, setLine] = useState<string | null>(null);
  const [facing, setFacing] = useState<number>(1);

  // Character X position as percentage.
  const [x, setX] = useState<number>(MIN_X);

  // ==========================================================
  // POSITION REFS
  // ==========================================================

  const xRef = useRef<number>(MIN_X);
  const targetXRef = useRef<number>(MIN_X);

  // ==========================================================
  // SCROLL REFS
  // ==========================================================

  const lastScrollY = useRef<number>(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const lastScrollT = useRef<number>(
    typeof performance !== "undefined" ? performance.now() : 0
  );

  const scrollSettleTimer = useRef<number | undefined>(undefined);

  // ==========================================================
  // IDLE TIMERS
  // ==========================================================

  const idleTimer1 = useRef<number | undefined>(undefined);
  const idleTimer2 = useRef<number | undefined>(undefined);
  const sleepTimer = useRef<number | undefined>(undefined);
  const lineTimer = useRef<number | undefined>(undefined);

  // ==========================================================
  // BEHAVIOR REFS
  // ==========================================================

  const overrideUntil = useRef<number>(0);
  const moveStart = useRef<number | null>(null);
  const extremeStreak = useRef<number>(0);
  const isSleeping = useRef<boolean>(false);
  const scooterUntil = useRef<number>(0);

  // ==========================================================
  // SHOW SPEECH
  // ==========================================================

  const showLine = useCallback((text: string, ms: number = 3000) => {
    setLine(text);

    if (lineTimer.current !== undefined) {
      window.clearTimeout(lineTimer.current);
    }

    lineTimer.current = window.setTimeout(() => {
      setLine(null);
    }, ms);
  }, []);

  // ==========================================================
  // TEMPORARY STATE
  // ==========================================================

  const setTempState = useCallback(
    (nextState: CharacterState, duration: number) => {
      overrideUntil.current = performance.now() + duration;
      setState(nextState);
    },
    []
  );

  // ==========================================================
  // RESET IDLE TIMERS
  // ==========================================================

  const resetIdleTimers = useCallback(() => {
    window.clearTimeout(idleTimer1.current);
    window.clearTimeout(idleTimer2.current);
    window.clearTimeout(sleepTimer.current);

    // ------------------------------------------------------
    // WAKE UP
    // ------------------------------------------------------

    if (isSleeping.current) {
      isSleeping.current = false;
      setTempState("surprised", 1200);
      showLine(WAKE_LINE, 2000);
    }

    // ------------------------------------------------------
    // WHISTLE
    // ------------------------------------------------------

    idleTimer1.current = window.setTimeout(() => {
      if (performance.now() > overrideUntil.current) {
        setState("idle_whistle");
      }
    }, WHISTLE_AFTER);

    // ------------------------------------------------------
    // CANDY
    // ------------------------------------------------------

    idleTimer2.current = window.setTimeout(() => {
      if (performance.now() > overrideUntil.current) {
        setState("idle_eating_candy");

        window.setTimeout(() => {
          setState("offer_candy");
          showLine(CANDY_LINE, 2500);
        }, 2200);
      }
    }, CANDY_AFTER);

    // ------------------------------------------------------
    // SLEEP
    // ------------------------------------------------------

    sleepTimer.current = window.setTimeout(() => {
      isSleeping.current = true;
      setState("sleep_nap");
    }, SLEEP_AFTER);
  }, [setTempState, showLine]);

  // ==========================================================
  // ROUTE CHANGE
  // ==========================================================

  useEffect(() => {
    const config = ROUTE_LINES[location.pathname];

    if (config) {
      const randomLine =
        config.lines[Math.floor(Math.random() * config.lines.length)];

      setTempState(config.state, 2600);
      showLine(randomLine, 3000);
    }

    resetIdleTimers();
  }, [location.pathname, resetIdleTimers, setTempState, showLine]);

  // ==========================================================
  // SMOOTH X MOVEMENT
  // ==========================================================
  //
  // The target is calculated from page scroll progress.
  // We DON'T directly set x here  instead the target X is
  // smoothly interpolated toward on every animation frame,
  // which prevents jumping.
  // ==========================================================

  useEffect(() => {
    let frame = 0;

    const animate = () => {
      const current = xRef.current;
      const target = targetXRef.current;
      const next = current + (target - current) * X_SMOOTHNESS;

      xRef.current = next;
      setX(next);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  // ==========================================================
  // SCROLL HANDLER
  // ==========================================================

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const previousY = lastScrollY.current;
      const previousTime = lastScrollT.current;

      // ----------------------------------------------
      // DELTA
      // ----------------------------------------------

      const dy = scrollY - previousY;
      const dt = Math.max(now - previousTime, 1);

      lastScrollY.current = scrollY;
      lastScrollT.current = now;

      if (Math.abs(dy) < 1) {
        return;
      }

      // ==================================================
      // SCROLL VELOCITY
      // ==================================================

      const speed = Math.abs(dy) / dt;

      // ==================================================
      // RESET IDLE
      // ==================================================

      resetIdleTimers();

      if (!moveStart.current) {
        moveStart.current = now;
      }

      // ==================================================
      // CALCULATE PAGE PROGRESS
      // ==================================================
      //
      // 0 = top, 1 = bottom, mapped to MIN_X → MAX_X
      // ==================================================

      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(documentHeight - viewportHeight, 1);

      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // ==================================================
      // TARGET X
      // ==================================================

      const targetX = MIN_X + scrollProgress * (MAX_X - MIN_X);
      targetXRef.current = targetX;

      // ==================================================
      // FACING
      // ==================================================

      if (dy > 0) {
        setFacing(1); // scroll down
      } else {
        setFacing(-1); // scroll up
      }

      // ==================================================
      // EXTREME SCROLL
      // ==================================================

      if (speed > EXTREME_SPEED) {
        extremeStreak.current += 1;

        // --------------------------------------------
        // SCOOTER
        // --------------------------------------------

        if (extremeStreak.current > 6) {
          scooterUntil.current = performance.now() + SCOOTER_MIN_TIME;
          setState("scooter_drive");
          showLine(SCOOTER_LINE, 2500);
        }

        // --------------------------------------------
        // ANGRY
        // --------------------------------------------

        else {
          setState("angry");

          const randomLine =
            FAST_SCROLL_LINES[
              Math.floor(Math.random() * FAST_SCROLL_LINES.length)
            ];

          showLine(randomLine, 2000);
        }
      }

      // ==================================================
      // RUN
      // ==================================================

      else if (speed > RUN_SPEED) {
        extremeStreak.current = 0;

        if (performance.now() >= scooterUntil.current) {
          setState("run");
        }
      }

      // ==================================================
      // WALK
      // ==================================================

      else if (speed > WALK_SPEED) {
        extremeStreak.current = 0;

        if (performance.now() >= scooterUntil.current) {
          setState("walk");
        }
      }

      // ==================================================
      // TIRED
      // ==================================================

      if (
        moveStart.current &&
        now - moveStart.current > CONTINUOUS_MOVE_TIRED_MS
      ) {
        setState("tired");
        showLine(TIRED_LINE, 2000);
        moveStart.current = now;
      }

      // ==================================================
      // SCROLL STOP DETECTION
      // ==================================================

      window.clearTimeout(scrollSettleTimer.current);

      scrollSettleTimer.current = window.setTimeout(() => {
        moveStart.current = null;
        extremeStreak.current = 0;

        // ------------------------------------------
        // SCOOTER STILL RUNNING
        // ------------------------------------------

        const scooterRemaining = scooterUntil.current - performance.now();

        if (scooterRemaining > 0) {
          setState("scooter_drive");

          window.setTimeout(() => {
            if (performance.now() >= scooterUntil.current) {
              setState("idle_standing");
            }
          }, scooterRemaining);

          return;
        }

        // ------------------------------------------
        // NORMAL STOP
        // ------------------------------------------

        if (performance.now() > overrideUntil.current) {
          setState("idle_standing");
        }
      }, SCROLL_SETTLE_MS);
    };

    // ======================================================
    // LISTENERS
    // ======================================================

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", resetIdleTimers);

    resetIdleTimers();

    // ======================================================
    // CLEANUP
    // ======================================================

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", resetIdleTimers);

      window.clearTimeout(idleTimer1.current);
      window.clearTimeout(idleTimer2.current);
      window.clearTimeout(sleepTimer.current);
      window.clearTimeout(scrollSettleTimer.current);
      window.clearTimeout(lineTimer.current);
    };
  }, [resetIdleTimers, showLine]);

  // ==========================================================
  // CHARACTER CLICK
  // ==========================================================

  const handleClick = useCallback(() => {
    // ------------------------------------------------------
    // WAKE UP
    // ------------------------------------------------------

    if (isSleeping.current) {
      isSleeping.current = false;
      resetIdleTimers();
      return;
    }

    // ------------------------------------------------------
    // TALK
    // ------------------------------------------------------

    setTempState("talking", 2200);

    const randomLine =
      IDLE_TALK_LINES[Math.floor(Math.random() * IDLE_TALK_LINES.length)];

    showLine(randomLine, 2500);
  }, [setTempState, showLine, resetIdleTimers]);

  // ==========================================================
  // RETURN
  // ==========================================================

  return {
    state,
    line,
    facing,
    x,
    handleClick,
  };
}

export default useCharacterBehavior;