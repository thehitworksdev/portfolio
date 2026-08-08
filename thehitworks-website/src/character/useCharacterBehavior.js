import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { useLocation } from "react-router-dom";

// ============================================================
// ROUTE REACTIONS
// ============================================================

const ROUTE_LINES = {
  "/": {
    state: "greet_wave",
    lines: [
      "Hey! Welcome to THE HIT WORKS!",
    ],
  },

  "/services": {
    state: "talking",
    lines: [
      "Looking for something to build?",
    ],
  },

  "/technologies": {
    state: "thinking",
    lines: [
      "Okay... that's a serious stack.",
    ],
  },

  "/portfolio": {
    state: "talking",
    lines: [
      "Want to see what we've built?",
    ],
  },

  "/contact": {
    state: "celebration",
    lines: [
      "Finally!",
      "You made it to Contact! Let's talk.",
    ],
  },

  "/solutions": {
    state: "thinking",
    lines: [
      "Let's find the right solution.",
    ],
  },

  "/process": {
    state: "talking",
    lines: [
      "Let me show you how we work.",
    ],
  },

  "/pricing": {
    state: "thinking",
    lines: [
      "Let's talk numbers.",
    ],
  },

  "/careers": {
    state: "talking",
    lines: [
      "Thinking about joining us?",
    ],
  },

  "/faq": {
    state: "thinking",
    lines: [
      "You have questions. I have answers!",
    ],
  },

  "/blog": {
    state: "talking",
    lines: [
      "Want to read something interesting?",
    ],
  },

  "/case-studies": {
    state: "talking",
    lines: [
      "Let's see what we've built.",
    ],
  },
};

// ============================================================
// DIALOGUE
// ============================================================

const IDLE_TALK_LINES = [
  "Hey!",
  "Need something built?",
  "Want me to show you around?",
  "What are you working on?",
  "Looking for something?",
  "Don't mind me... I'm just exploring.",
];

const FAST_SCROLL_LINES = [
  "You baka!",
  "Don't scroll so fast!",
  "I can't come any faster!",
  "Hey! Slow down! 😭",
];

const SCOOTER_LINE =
  "Fine, I'll use my scooter! 🛵";

const CANDY_LINE =
  "Want one? 🍬";

const TIRED_LINE =
  "Okay... I need a break.";

const WAKE_LINE =
  "Oh! You're back.";

// ============================================================
// IDLE TIMING
// ============================================================

const WHISTLE_AFTER = 6000;
const CANDY_AFTER = 15000;
const SLEEP_AFTER = 40000;

// ============================================================
// SCROLL SETTLE
// ============================================================

const SCROLL_SETTLE_MS = 180;

// ============================================================
// SCROLL SPEED
//
// speed = pixels scrolled / milliseconds
// ============================================================

const WALK_SPEED = 0.12;
const RUN_SPEED = 0.8;
const EXTREME_SPEED = 2.0;

// ============================================================
// PAGE → X POSITION
// ============================================================
//
// 0% page scroll  = MIN_X
// 100% page scroll = MAX_X
//
// Example:
//
// top     → 8%
// middle  → 50%
// bottom  → 92%
// ============================================================

const MIN_X = 8;
const MAX_X = 92;

// ============================================================
// X MOVEMENT SMOOTHING
// ============================================================
//
// Lower = slower/smoother
// Higher = faster response
// ============================================================

const X_SMOOTHNESS = 0.08;

// ============================================================
// SCOOTER
// ============================================================

const SCOOTER_MIN_TIME = 4000;

// ============================================================
// LONG CONTINUOUS SCROLL
// ============================================================

const CONTINUOUS_MOVE_TIRED_MS = 9000;

// ============================================================
// HOOK
// ============================================================

export function useCharacterBehavior() {
  const location = useLocation();

  // ==========================================================
  // STATE
  // ==========================================================

  const [state, setState] =
    useState("idle_standing");

  const [line, setLine] =
    useState(null);

  const [facing, setFacing] =
    useState(1);

  // Character X position as percentage.
  const [x, setX] =
    useState(MIN_X);

  // ==========================================================
  // POSITION REFS
  // ==========================================================

  const xRef =
    useRef(MIN_X);

  const targetXRef =
    useRef(MIN_X);

  // ==========================================================
  // SCROLL REFS
  // ==========================================================

  const lastScrollY =
    useRef(
      typeof window !== "undefined"
        ? window.scrollY
        : 0
    );

  const lastScrollT =
    useRef(
      typeof performance !== "undefined"
        ? performance.now()
        : 0
    );

  const scrollSettleTimer =
    useRef(null);

  // ==========================================================
  // IDLE TIMERS
  // ==========================================================

  const idleTimer1 =
    useRef(null);

  const idleTimer2 =
    useRef(null);

  const sleepTimer =
    useRef(null);

  const lineTimer =
    useRef(null);

  // ==========================================================
  // BEHAVIOR REFS
  // ==========================================================

  const overrideUntil =
    useRef(0);

  const moveStart =
    useRef(null);

  const extremeStreak =
    useRef(0);

  const isSleeping =
    useRef(false);

  const scooterUntil =
    useRef(0);

  // ==========================================================
  // SHOW SPEECH
  // ==========================================================

  const showLine = useCallback(
    (text, ms = 3000) => {
      setLine(text);

      if (lineTimer.current) {
        clearTimeout(
          lineTimer.current
        );
      }

      lineTimer.current =
        setTimeout(() => {
          setLine(null);
        }, ms);
    },
    []
  );

  // ==========================================================
  // TEMPORARY STATE
  // ==========================================================

  const setTempState =
    useCallback(
      (nextState, duration) => {
        overrideUntil.current =
          performance.now() +
          duration;

        setState(nextState);
      },
      []
    );

  // ==========================================================
  // RESET IDLE TIMERS
  // ==========================================================

  const resetIdleTimers =
    useCallback(() => {
      clearTimeout(
        idleTimer1.current
      );

      clearTimeout(
        idleTimer2.current
      );

      clearTimeout(
        sleepTimer.current
      );

      // ------------------------------------------------------
      // WAKE UP
      // ------------------------------------------------------

      if (isSleeping.current) {
        isSleeping.current = false;

        setTempState(
          "surprised",
          1200
        );

        showLine(
          WAKE_LINE,
          2000
        );
      }

      // ------------------------------------------------------
      // WHISTLE
      // ------------------------------------------------------

      idleTimer1.current =
        setTimeout(() => {
          if (
            performance.now() >
            overrideUntil.current
          ) {
            setState(
              "idle_whistle"
            );
          }
        }, WHISTLE_AFTER);

      // ------------------------------------------------------
      // CANDY
      // ------------------------------------------------------

      idleTimer2.current =
        setTimeout(() => {
          if (
            performance.now() >
            overrideUntil.current
          ) {
            setState(
              "idle_eating_candy"
            );

            setTimeout(() => {
              setState(
                "offer_candy"
              );

              showLine(
                CANDY_LINE,
                2500
              );
            }, 2200);
          }
        }, CANDY_AFTER);

      // ------------------------------------------------------
      // SLEEP
      // ------------------------------------------------------

      sleepTimer.current =
        setTimeout(() => {
          isSleeping.current = true;

          setState(
            "sleep_nap"
          );
        }, SLEEP_AFTER);
    }, [
      setTempState,
      showLine,
    ]);

  // ==========================================================
  // ROUTE CHANGE
  // ==========================================================

  useEffect(() => {
    const config =
      ROUTE_LINES[
        location.pathname
      ];

    if (config) {
      const randomLine =
        config.lines[
          Math.floor(
            Math.random() *
              config.lines.length
          )
        ];

      setTempState(
        config.state,
        2600
      );

      showLine(
        randomLine,
        3000
      );
    }

    resetIdleTimers();
  }, [
    location.pathname,
    resetIdleTimers,
    setTempState,
    showLine,
  ]);

  // ==========================================================
  // SMOOTH X MOVEMENT
  // ==========================================================
  //
  // The target is calculated from page scroll progress.
  //
  // We DON'T directly set x here.
  //
  // Instead:
  //
  // target X
  //    ↓
  // smooth interpolation
  //    ↓
  // actual X
  //
  // This prevents jumping.
  // ==========================================================

  useEffect(() => {
    let frame;

    const animate = () => {
      const current =
        xRef.current;

      const target =
        targetXRef.current;

      const next =
        current +
        (target - current) *
          X_SMOOTHNESS;

      xRef.current =
        next;

      setX(next);

      frame =
        requestAnimationFrame(
          animate
        );
    };

    frame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        frame
      );
    };
  }, []);

  // ==========================================================
  // SCROLL HANDLER
  // ==========================================================

  useEffect(() => {
    const onScroll =
      () => {
        const now =
          performance.now();

        const scrollY =
          window.scrollY;

        const previousY =
          lastScrollY.current;

        const previousTime =
          lastScrollT.current;

        // ----------------------------------------------
        // DELTA
        // ----------------------------------------------

        const dy =
          scrollY - previousY;

        const dt =
          Math.max(
            now -
              previousTime,
            1
          );

        // Save for next event
        lastScrollY.current =
          scrollY;

        lastScrollT.current =
          now;

        // Ignore tiny browser movements
        if (
          Math.abs(dy) < 1
        ) {
          return;
        }

        // ==================================================
        // SCROLL VELOCITY
        // ==================================================

        const speed =
          Math.abs(dy) / dt;

        // ==================================================
        // RESET IDLE
        // ==================================================

        resetIdleTimers();

        if (!moveStart.current) {
          moveStart.current =
            now;
        }

        // ==================================================
        // CALCULATE PAGE PROGRESS
        // ==================================================
        //
        // scrollProgress:
        //
        // 0 = top
        // 1 = bottom
        //
        // Then map that to:
        //
        // MIN_X → MAX_X
        // ==================================================

        const documentHeight =
          document.documentElement
            .scrollHeight;

        const viewportHeight =
          window.innerHeight;

        const maxScroll =
          Math.max(
            documentHeight -
              viewportHeight,
            1
          );

        const scrollProgress =
          Math.min(
            Math.max(
              scrollY /
                maxScroll,
              0
            ),
            1
          );

        // ==================================================
        // TARGET X
        // ==================================================

        const targetX =
          MIN_X +
          scrollProgress *
            (MAX_X - MIN_X);

        targetXRef.current =
          targetX;

        // ==================================================
        // FACING
        // ==================================================

        if (dy > 0) {
          // Scroll down
          setFacing(1);
        } else {
          // Scroll up
          setFacing(-1);
        }

        // ==================================================
        // EXTREME SCROLL
        // ==================================================

        if (
          speed >
          EXTREME_SPEED
        ) {
          extremeStreak.current +=
            1;

          // --------------------------------------------
          // SCOOTER
          // --------------------------------------------

          if (
            extremeStreak.current >
            6
          ) {
            scooterUntil.current =
              performance.now() +
              SCOOTER_MIN_TIME;

            setState(
              "scooter_drive"
            );

            showLine(
              SCOOTER_LINE,
              2500
            );
          }

          // --------------------------------------------
          // ANGRY
          // --------------------------------------------

          else {
            setState(
              "angry"
            );

            const randomLine =
              FAST_SCROLL_LINES[
                Math.floor(
                  Math.random() *
                    FAST_SCROLL_LINES.length
                )
              ];

            showLine(
              randomLine,
              2000
            );
          }
        }

        // ==================================================
        // RUN
        // ==================================================

        else if (
          speed >
          RUN_SPEED
        ) {
          extremeStreak.current =
            0;

          // Don't interrupt scooter
          if (
            performance.now() >=
            scooterUntil.current
          ) {
            setState(
              "run"
            );
          }
        }

        // ==================================================
        // WALK
        // ==================================================

        else if (
          speed >
          WALK_SPEED
        ) {
          extremeStreak.current =
            0;

          if (
            performance.now() >=
            scooterUntil.current
          ) {
            setState(
              "walk"
            );
          }
        }

        // ==================================================
        // TIRED
        // ==================================================

        if (
          moveStart.current &&
          now -
            moveStart.current >
            CONTINUOUS_MOVE_TIRED_MS
        ) {
          setState(
            "tired"
          );

          showLine(
            TIRED_LINE,
            2000
          );

          moveStart.current =
            now;
        }

        // ==================================================
        // SCROLL STOP DETECTION
        // ==================================================

        clearTimeout(
          scrollSettleTimer.current
        );

        scrollSettleTimer.current =
          setTimeout(() => {
            moveStart.current =
              null;

            extremeStreak.current =
              0;

            // ------------------------------------------
            // SCOOTER STILL RUNNING
            // ------------------------------------------

            const scooterRemaining =
              scooterUntil.current -
              performance.now();

            if (
              scooterRemaining >
              0
            ) {
              setState(
                "scooter_drive"
              );

              setTimeout(() => {
                if (
                  performance.now() >=
                  scooterUntil.current
                ) {
                  setState(
                    "idle_standing"
                  );
                }
              }, scooterRemaining);

              return;
            }

            // ------------------------------------------
            // NORMAL STOP
            // ------------------------------------------

            if (
              performance.now() >
              overrideUntil.current
            ) {
              setState(
                "idle_standing"
              );
            }
          }, SCROLL_SETTLE_MS);
      };

    // ======================================================
    // LISTENERS
    // ======================================================

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "mousemove",
      resetIdleTimers
    );

    resetIdleTimers();

    // ======================================================
    // CLEANUP
    // ======================================================

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "mousemove",
        resetIdleTimers
      );

      clearTimeout(
        idleTimer1.current
      );

      clearTimeout(
        idleTimer2.current
      );

      clearTimeout(
        sleepTimer.current
      );

      clearTimeout(
        scrollSettleTimer.current
      );

      clearTimeout(
        lineTimer.current
      );
    };
  }, [
    resetIdleTimers,
    showLine,
  ]);

  // ==========================================================
  // CHARACTER CLICK
  // ==========================================================

  const handleClick =
    useCallback(() => {
      // ------------------------------------------------------
      // WAKE UP
      // ------------------------------------------------------

      if (
        isSleeping.current
      ) {
        isSleeping.current =
          false;

        resetIdleTimers();

        return;
      }

      // ------------------------------------------------------
      // TALK
      // ------------------------------------------------------

      setTempState(
        "talking",
        2200
      );

      const randomLine =
        IDLE_TALK_LINES[
          Math.floor(
            Math.random() *
              IDLE_TALK_LINES.length
          )
        ];

      showLine(
        randomLine,
        2500
      );
    }, [
      setTempState,
      showLine,
      resetIdleTimers,
    ]);

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