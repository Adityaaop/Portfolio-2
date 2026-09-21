"use client";

import React, { useState, useEffect, useRef } from "react";

export default function IntroSequence() {
  const [phase, setPhase] = useState<"init" | "dino" | "glitch" | "reveal" | "none">("init");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glitchAudioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPhase("none");
      return;
    }

    // Preload glitch sound once on mount
    const audio = new Audio("/glitch.mp3");
    audio.preload = "auto";
    audio.volume = 1.0;
    audio.muted = false; // keep it unmuted and on by default
    audio.load(); // force load
    glitchAudioRef.current = audio;

    setPhase("dino");

    return () => {
      audio.pause();
      glitchAudioRef.current = null;
    };
  }, []);

  // Phase transitions
  useEffect(() => {
    if (phase === "none" || phase === "init") return;

    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (phase === "dino") {
      // Phase 1 lasts for 1.8 seconds, then transitions to glitch
      timer1 = setTimeout(() => {
        setPhase("glitch");
      }, 1800);
    } else if (phase === "glitch") {
      // Play glitch sound at the start of phase 2
      if (glitchAudioRef.current) {
        glitchAudioRef.current.play().catch((err) => {
          console.log("Glitch sound blocked by browser autoplay rules", err);
        });
      }

      // Glitch phase lasts for 0.8 seconds, then transitions to reveal
      timer2 = setTimeout(() => {
        setPhase("reveal");
      }, 800);
    } else if (phase === "reveal") {
      // Fade out and resolve after 600ms
      timer3 = setTimeout(() => {
        setPhase("none");
      }, 600);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase]);

  // Canvas Dino Animation loop
  useEffect(() => {
    if (phase !== "dino") {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const groundY = 110;

    // Dino state
    let dinoY = groundY;
    let dinoVY = 0;
    const dinoX = 50;
    let isJumping = false;

    // Cactus state
    let cactusX = 600;
    const cactusWidth = 15;
    const cactusHeight = 30;

    // Background dashes state
    let dash1X = 100;
    let dash2X = 350;
    let dash3X = 500;

    const loop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.strokeStyle = "#d2d2d2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Move and draw ground dashes
      ctx.fillStyle = "#e0e0e0";
      dash1X -= 4;
      dash2X -= 4;
      dash3X -= 4;
      if (dash1X < -20) dash1X = 620;
      if (dash2X < -20) dash2X = 620;
      if (dash3X < -20) dash3X = 620;
      ctx.fillRect(dash1X, groundY + 4, 15, 1);
      ctx.fillRect(dash2X, groundY + 8, 8, 1);
      ctx.fillRect(dash3X, groundY + 6, 12, 1);

      // Dino Auto Jump logic
      if (cactusX - dinoX < 110 && cactusX - dinoX > 80 && !isJumping) {
        isJumping = true;
        dinoVY = -7.5; // Jump strength
      }

      if (isJumping) {
        dinoY += dinoVY;
        dinoVY += 0.4; // Gravity
        if (dinoY >= groundY) {
          dinoY = groundY;
          dinoVY = 0;
          isJumping = false;
        }
      }

      // Draw Dino (Pixelated T-Rex)
      ctx.fillStyle = "#535353";
      // Head
      ctx.fillRect(dinoX + 12, dinoY - 38, 16, 14);
      ctx.fillRect(dinoX + 12, dinoY - 24, 10, 3); // jaw
      // Eye
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(dinoX + 16, dinoY - 34, 3, 3);
      ctx.fillStyle = "#535353";
      ctx.fillRect(dinoX + 18, dinoY - 34, 1.5, 3); // pupil

      // Neck & Body
      ctx.fillRect(dinoX + 6, dinoY - 24, 8, 6); // neck
      ctx.fillRect(dinoX, dinoY - 20, 18, 12); // body

      // Tail
      ctx.fillRect(dinoX - 4, dinoY - 18, 4, 8);
      ctx.fillRect(dinoX - 8, dinoY - 14, 4, 4);

      // Arm
      ctx.fillRect(dinoX + 14, dinoY - 18, 3, 2);

      // Legs (rest on ground)
      if (isJumping) {
        ctx.fillRect(dinoX + 4, dinoY - 5, 3, 5);
        ctx.fillRect(dinoX + 10, dinoY - 5, 3, 5);
      } else {
        const legFrame = Math.floor(frame / 6) % 2;
        if (legFrame === 0) {
          ctx.fillRect(dinoX + 4, dinoY - 5, 3, 5);   // Left leg down
          ctx.fillRect(dinoX + 10, dinoY - 5, 3, 2);  // Right leg bent
        } else {
          ctx.fillRect(dinoX + 4, dinoY - 5, 3, 2);   // Left leg bent
          ctx.fillRect(dinoX + 10, dinoY - 5, 3, 5);  // Right leg down
        }
      }

      // Move and draw Cactus
      cactusX -= 4;
      if (cactusX < -30) {
        cactusX = 620; // reset
      }

      // Draw Cactus
      ctx.fillStyle = "#535353";
      // Main trunk
      ctx.fillRect(cactusX + 5, groundY - cactusHeight, 5, cactusHeight);
      // Left branch
      ctx.fillRect(cactusX, groundY - 22, 5, 3);
      ctx.fillRect(cactusX, groundY - 26, 3, 7);
      // Right branch
      ctx.fillRect(cactusX + 10, groundY - 18, 4, 3);
      ctx.fillRect(cactusX + 11, groundY - 22, 3, 7);

      frame++;
      animationFrameId.current = requestAnimationFrame(loop);
    };

    loop();

    const handleJumpEvent = () => {
      if (!isJumping) {
        isJumping = true;
        dinoVY = -7.5;
      }
    };
    window.addEventListener("dino-jump", handleJumpEvent);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("dino-jump", handleJumpEvent);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "dino") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault(); // prevent scroll
        window.dispatchEvent(new CustomEvent("dino-jump"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase]);

  const handleSkip = () => {
    setPhase("none");
    if (glitchAudioRef.current) {
      glitchAudioRef.current.pause();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Clicking anywhere on the screen makes the Dino jump and registers interaction
    window.dispatchEvent(new CustomEvent("dino-jump"));
  };

  if (phase === "none" || phase === "init") {
    return null;
  }

  // CSS Glitch Animations Styles
  const glitchStyles = `
    @keyframes intro-shake {
      0% { transform: translate(0, 0) skew(0deg); }
      10% { transform: translate(-3px, 3px) skew(-1deg); }
      20% { transform: translate(3px, -2px) skew(1deg); }
      30% { transform: translate(-2px, -3px) skew(-2deg); }
      40% { transform: translate(4px, 2px) skew(1.5deg); }
      50% { transform: translate(-4px, -2px) skew(-1.5deg); }
      60% { transform: translate(2px, 3px) skew(0deg); }
      70% { transform: translate(-3px, -3px) skew(2deg); }
      80% { transform: translate(3px, 2px) skew(-2deg); }
      90% { transform: translate(-2px, 3px) skew(1deg); }
      100% { transform: translate(0, 0) skew(0deg); }
    }
    @keyframes color-flash {
      0%, 100% { background-color: #ffffff; filter: invert(0); }
      20% { background-color: #111111; filter: invert(1); }
      40% { background-color: #ff0055; }
      60% { background-color: #00ffcc; }
      80% { background-color: #ffffff; }
    }
    @keyframes rgb-split {
      0% { text-shadow: none; }
      20% { text-shadow: 2px -2px #ff0055, -2px 2px #00ffcc; }
      40% { text-shadow: -3px 3px #ff0055, 3px -3px #00ffcc; }
      60% { text-shadow: 3px 1px #ff0055, -3px -1px #00ffcc; }
      80% { text-shadow: -1px -2px #ff0055, 1px 2px #00ffcc; }
      100% { text-shadow: none; }
    }
    .glitch-shake-active {
      animation: intro-shake 0.1s infinite;
    }
    .glitch-flash-active {
      animation: color-flash 0.15s infinite;
    }
    .glitch-rgb-active {
      animation: rgb-split 0.12s infinite;
    }
    .scanlines-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 4px, 6px 100%;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glitchStyles }} />

      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer select-none transition-opacity duration-500 ${phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100"
          } ${phase === "glitch" ? "glitch-flash-active" : "bg-white"}`}
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}
      >
        <div className={`relative flex flex-col items-center justify-center max-w-lg px-6 text-center ${phase === "glitch" ? "glitch-shake-active" : ""}`}>

          {/* Dino Game Canvas */}
          <div className="mb-8 overflow-hidden rounded-lg opacity-85">
            <canvas
              ref={canvasRef}
              width={600}
              height={150}
              className="w-full max-w-[500px] h-[125px]"
            />
          </div>

          {/* Chrome Error Text details */}
          <div className="text-left w-full max-w-[450px]">
            <h1 className={`text-xl sm:text-2xl font-semibold text-zinc-900 mb-4 leading-snug tracking-tight ${phase === "glitch" ? "glitch-rgb-active text-white" : ""}`}>
              {phase === "glitch" ? "SYSTEM_GLITCH_404_ERROR" : "This site can’t be reached"}
            </h1>

            <p className={`text-sm text-zinc-500 mb-2 ${phase === "glitch" ? "text-zinc-300" : ""}`}>
              {phase === "glitch" ? "CORRUPTED_STREAM_TEARING" : <strong>aditya.dev</strong>}
              {phase === "glitch" ? "" : "’s server IP address could not be found."}
            </p>

            <p className={`text-xs text-zinc-400 mb-6 font-mono ${phase === "glitch" ? "text-zinc-400" : ""}`}>
              {phase === "glitch" ? "STATUS: EXECUTING_RECOVERY" : "DNS_PROBE_FINISHED_NXDOMAIN"}
            </p>

            <div className={`text-sm text-zinc-500 leading-relaxed border-t border-zinc-200/60 pt-4 ${phase === "glitch" ? "border-zinc-700/60 text-zinc-300" : ""}`}>
              <p className="font-semibold text-zinc-800 mb-1.5">{phase === "glitch" ? "DIAGNOSTICS:" : "Try:"}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{phase === "glitch" ? "Bypassing sandbox limitations..." : "Checking the connection"}</li>
                <li>{phase === "glitch" ? "Re-aligning silver/black particle arrays..." : "Checking the proxy and firewall"}</li>
              </ul>
            </div>
          </div>

          {/* Scanline noise overlay during glitch */}
          {phase === "glitch" && <div className="scanlines-overlay" />}

          {/* Controls hint and skip button */}
          <div className="absolute bottom-[-60px] left-0 right-0 flex items-center justify-between w-full px-2 text-xs font-mono select-none">
            <span className={`transition-opacity duration-300 tracking-wider ${
              phase === "glitch" ? "text-white/40" : "text-zinc-400/80"
            }`}>
              Press Space or Click to Jump
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering jump
                handleSkip();
              }}
              className={`px-3 py-1 rounded border backdrop-blur-sm pointer-events-auto cursor-pointer transition-all ${
                phase === "glitch" 
                  ? "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white" 
                  : "bg-black/5 border-black/10 text-zinc-500 hover:text-zinc-900 hover:border-zinc-900"
              }`}
            >
              Skip Intro →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
