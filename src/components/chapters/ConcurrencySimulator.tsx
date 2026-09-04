"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Lock, Unlock, RotateCw, Play, Terminal } from "lucide-react";

type SimType = "auth-concurrency" | "offline-sync";
type AuthMode = "naive" | "engineered";
type OfflineMode = "naive" | "engineered";

interface LogEntry {
  id: string;
  time: string;
  text: string;
  status: "info" | "success" | "danger" | "warn";
}

export function ConcurrencySimulator() {
  const [activeSim, setActiveSim] = useState<SimType>("auth-concurrency");

  // Auth simulation state
  const [authMode, setAuthMode] = useState<AuthMode>("engineered");
  const [authRunning, setAuthRunning] = useState(false);
  const [authLogs, setAuthLogs] = useState<LogEntry[]>([
    {
      id: "init",
      time: "00:00.00",
      text: "Interactive Concurrency Engine ready. Select mode and click 'Simulate Race Condition'.",
      status: "info",
    },
  ]);
  const [authPhase, setAuthPhase] = useState<
    "idle" | "firing" | "locked" | "enqueued" | "refreshed" | "fatal"
  >("idle");

  // Offline sync simulation state
  const [offlineMode, setOfflineMode] = useState<OfflineMode>("engineered");
  const [offlineRunning, setOfflineRunning] = useState(false);
  const [offlineLogs, setOfflineLogs] = useState<LogEntry[]>([
    {
      id: "init-offline",
      time: "00:00.00",
      text: "Offline Reconciliation Engine ready. Select mode and click 'Simulate Warehouse Sync'.",
      status: "info",
    },
  ]);
  const [offlinePhase, setOfflinePhase] = useState<
    "online" | "disconnected" | "queueing" | "reconciling" | "corrupted"
  >("online");

  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  // Run Auth Concurrency Simulation
  const runAuthSim = () => {
    sound.playClick();
    clearTimeouts();
    setAuthRunning(true);
    setAuthLogs([]);
    setAuthPhase("firing");

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutIds.current.push(id);
    };

    const log = (
      text: string,
      status: "info" | "success" | "danger" | "warn",
      ms: number,
    ) => {
      schedule(() => {
        const time = `00:0${(ms / 1000).toFixed(2)}`;
        setAuthLogs((prev) => [
          ...prev,
          { id: Math.random().toString(), time, text, status },
        ]);
      }, ms);
    };

    if (authMode === "naive") {
      // NAIVE: Race Condition leading to user logout mid-trip
      log(
        "Trip Coordinates Ping [Req #1] -> HTTP 401 (Access Token Expired)",
        "warn",
        100,
      );
      log(
        "Driver Fare Calculation [Req #2] -> HTTP 401 (Access Token Expired)",
        "warn",
        180,
      );
      log(
        "FCM Notification Pull [Req #3] -> HTTP 401 (Access Token Expired)",
        "warn",
        260,
      );

      schedule(() => {
        log(
          "Req #1 initiates /auth/refresh with Refresh Token [RT_101]",
          "info",
          500,
        );
      }, 500);

      schedule(() => {
        log(
          "Req #2 fires DUPLICATE /auth/refresh with old [RT_101] (RACE CONDITION DETECTED)",
          "danger",
          750,
        );
      }, 750);

      schedule(() => {
        log(
          "OAuth Gateway rotates token: RT_101 invalidated, RT_102 issued to Req #1.",
          "info",
          1100,
        );
      }, 1100);

      schedule(() => {
        log(
          "OAuth Gateway receives duplicate refresh from Req #2 with old RT_101 -> TOKEN ROTATION REUSE ATTACK DETECTED!",
          "danger",
          1400,
        );
        log(
          "CRITICAL: Auth server forcibly revokes entire session hierarchy.",
          "danger",
          1650,
        );
        setAuthPhase("fatal");
      }, 1400);

      schedule(() => {
        log(
          "FATAL: Driver unexpectedly logged out mid-trip. Session terminated.",
          "danger",
          2000,
        );
        setAuthRunning(false);
      }, 2000);
    } else {
      // ENGINEERED: Mutex Request Locking & Queued Retry
      log(
        "Trip Coordinates Ping [Req #1] -> HTTP 401 (Access Token Expired)",
        "warn",
        100,
      );
      log(
        "Driver Fare Calculation [Req #2] -> HTTP 401 (Access Token Expired)",
        "warn",
        180,
      );
      log(
        "FCM Notification Pull [Req #3] -> HTTP 401 (Access Token Expired)",
        "warn",
        260,
      );

      schedule(() => {
        log(
          "[MUTEX_LOCK]: Req #1 acquires exclusive Refresh Mutex Lock.",
          "success",
          450,
        );
        setAuthPhase("locked");
      }, 450);

      schedule(() => {
        log(
          "[REQUEST_QUEUE]: Req #2 and Req #3 intercepted -> Enqueued into Pending Retry Buffer.",
          "info",
          700,
        );
        setAuthPhase("enqueued");
      }, 700);

      schedule(() => {
        log(
          "Unified Refresh Engine issues single /auth/refresh request to OAuth gateway.",
          "info",
          1000,
        );
      }, 1000);

      schedule(() => {
        log(
          "Auth Server issues new Access Token [AT_992] and rotated Refresh Token [RT_102].",
          "success",
          1400,
        );
        setAuthPhase("refreshed");
      }, 1400);

      schedule(() => {
        log(
          "[DE-QUEUE]: Req #2 and Req #3 retried automatically with new token [AT_992] -> HTTP 200 OK!",
          "success",
          1750,
        );
      }, 1750);

      schedule(() => {
        log(
          "[MUTEX_RELEASE]: Lock released. 100% requests resolved. ZERO active trip drop.",
          "success",
          2100,
        );
        setAuthPhase("idle");
        setAuthRunning(false);
        sound.playSuccess();
      }, 2100);
    }
  };

  // Run Offline Sync Simulation
  const runOfflineSim = () => {
    sound.playClick();
    clearTimeouts();
    setOfflineRunning(true);
    setOfflineLogs([]);
    setOfflinePhase("disconnected");

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutIds.current.push(id);
    };

    const log = (
      text: string,
      status: "info" | "success" | "danger" | "warn",
      ms: number,
    ) => {
      schedule(() => {
        const time = `00:0${(ms / 1000).toFixed(2)}`;
        setOfflineLogs((prev) => [
          ...prev,
          { id: Math.random().toString(), time, text, status },
        ]);
      }, ms);
    };

    if (offlineMode === "naive") {
      log(
        "Field worker enters warehouse basement -> Internet connection lost.",
        "warn",
        100,
      );
      log(
        "Worker creates Order #1 using sequential local counter ID [001].",
        "info",
        350,
      );
      log(
        "Worker creates Order #2 using sequential local counter ID [002].",
        "info",
        600,
      );

      schedule(() => {
        log("Network connection re-established. Sync initiated.", "info", 900);
        setOfflinePhase("reconciling");
      }, 900);

      schedule(() => {
        log(
          "Server DB already has Order [001] from another branch -> PRIMARY KEY COLLISION!",
          "danger",
          1250,
        );
        log(
          "OTA Update native module mismatch -> Linking crash on background thread!",
          "danger",
          1550,
        );
        setOfflinePhase("corrupted");
      }, 1250);

      schedule(() => {
        log(
          "FATAL: Offline orders dropped due to ID conflict and unhandled sync exception.",
          "danger",
          1950,
        );
        setOfflineRunning(false);
      }, 1950);
    } else {
      log(
        "Field worker enters warehouse basement -> Offline event detected.",
        "warn",
        100,
      );
      log(
        "[PURE_JS_UUID]: Order #1 generated with collision-proof UUID [ord_9e4a_88b1].",
        "success",
        350,
      );
      log(
        "[PURE_JS_UUID]: Order #2 generated with collision-proof UUID [ord_3f1c_9024].",
        "success",
        600,
      );

      schedule(() => {
        log(
          "Local idempotent queue records state changes in durable storage buffer.",
          "info",
          850,
        );
        setOfflinePhase("queueing");
      }, 850);

      schedule(() => {
        log(
          "Network re-established -> Dual-Trigger Sync engine activates with exponential backoff.",
          "info",
          1150,
        );
        setOfflinePhase("reconciling");
      }, 1150);

      schedule(() => {
        log(
          "Server receives idempotent batch: All 2 orders upserted with zero primary key collisions.",
          "success",
          1500,
        );
      }, 1500);

      schedule(() => {
        log(
          "CI/CD Husky-verified schema gates validate records. Offline ledger 100% reconciled.",
          "success",
          1850,
        );
        setOfflinePhase("online");
        setOfflineRunning(false);
        sound.playSuccess();
      }, 1850);
    }
  };

  return (
    <div className="w-full bg-[#0b0e17] border border-amber-500/25 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden panel-anchor">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>PRODUCTION_DEBUGGING_LAB // INTERACTIVE_SIMULATION</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
            Production Engineering Diagnostics
          </h3>
        </div>

        {/* Simulation Selector Tabs */}
        <div className="flex rounded-lg bg-black/40 p-1 border border-white/10 text-xs font-mono">
          <button
            onClick={() => {
              sound.playClick();
              clearTimeouts();
              setActiveSim("auth-concurrency");
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer focus-ring-amber ${
              activeSim === "auth-concurrency"
                ? "bg-amber-500 text-black font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            01 / TOKEN RACE CONDITION
          </button>
          <button
            onClick={() => {
              sound.playClick();
              clearTimeouts();
              setActiveSim("offline-sync");
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer focus-ring-emerald ${
              activeSim === "offline-sync"
                ? "bg-emerald-500 text-black font-bold shadow-sm shadow-emerald-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            02 / OFFLINE SYNC INTEGRITY
          </button>
        </div>
      </div>

      {activeSim === "auth-concurrency" ? (
        /* SIMULATION 1: TOKEN REFRESH RACE CONDITION */
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                At Groww You, concurrent API requests during access token
                expiration triggered multiple refresh calls, causing token reuse
                rotation detections and unexpectedly logging active drivers out
                mid-trip.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => {
                  sound.playClick();
                  clearTimeouts();
                  setAuthMode("naive");
                  setAuthLogs([
                    {
                      id: "switched",
                      time: "00:00.00",
                      text: "Switched to UNPROTECTED mode. Shows token rotation reuse collision.",
                      status: "warn",
                    },
                  ]);
                }}
                disabled={authRunning}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer focus-ring-amber ${
                  authMode === "naive"
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Unprotected (Buggy)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  clearTimeouts();
                  setAuthMode("engineered");
                  setAuthLogs([
                    {
                      id: "switched",
                      time: "00:00.00",
                      text: "Switched to MUTEX LOCKING mode. Demonstrates Shiv Kant's production fix.",
                      status: "success",
                    },
                  ]);
                }}
                disabled={authRunning}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer focus-ring-amber ${
                  authMode === "engineered"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Shiv Kant&apos;s Solution (Protected)
              </button>
            </div>
          </div>

          {/* 2-Column Visual Architecture and Live Telemetry Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Left Column: Visual Pipeline */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">
                    SIMULATED ARCHITECTURE
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      authMode === "engineered"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {authMode === "engineered"
                      ? "MUTEX REQUEST LOCKING"
                      : "NO CONCURRENCY GUARD"}
                  </span>
                </div>

                {/* Architecture Node Representation */}
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-300">
                      Concurrent API Requests
                    </span>
                    <span className="text-amber-400 font-bold">
                      3 Simultaneous (HTTP 401)
                    </span>
                  </div>

                  <div className="flex justify-center text-gray-500">
                    <RotateCw
                      className={`w-3.5 h-3.5 ${authRunning ? "animate-spin text-amber-400" : ""}`}
                    />
                  </div>

                  <div
                    className={`p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
                      authMode === "engineered"
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/30 border-red-500/40 text-red-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {authMode === "engineered" ? (
                        <Lock className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Unlock className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-semibold">
                        {authMode === "engineered"
                          ? "Unified Refresh Engine"
                          : "Uncoordinated Individual Retries"}
                      </span>
                    </div>
                    <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                      {authMode === "engineered"
                        ? authPhase === "locked" || authPhase === "enqueued"
                          ? "LOCKED"
                          : "READY"
                        : "UNLOCKED"}
                    </span>
                  </div>

                  <div className="flex justify-center text-gray-500">
                    <RotateCw
                      className={`w-3.5 h-3.5 ${authRunning ? "animate-spin text-cyan-400" : ""}`}
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-300">
                      Driver Mobile App Session
                    </span>
                    <span
                      className={`font-bold ${
                        authPhase === "fatal"
                          ? "text-red-400 animate-pulse"
                          : authPhase === "refreshed" || authPhase === "idle"
                            ? "text-emerald-400"
                            : "text-amber-400"
                      }`}
                    >
                      {authPhase === "fatal"
                        ? "FORCED LOGOUT"
                        : "ACTIVE TRIP SECURE"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={runAuthSim}
                  disabled={authRunning}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full mt-3 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/10 focus-ring-amber"
                >
                  {authRunning ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>EXECUTING CONCURRENT TRACE...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>SIMULATE CONCURRENT REQUESTS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Execution Terminal Log */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-gray-300">
                    STAGED_ROLLOUT_TELEMETRY.LOG
                  </span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  GROWW_YOU // RIDE_HAILING_CORE
                </span>
              </div>

              <div className="h-56 overflow-y-auto space-y-2 py-3 pr-2 scrollbar-thin">
                {authLogs.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded text-[11px] leading-relaxed flex items-start gap-2.5 ${
                      item.status === "danger"
                        ? "bg-red-950/40 text-red-300 border-l-2 border-red-500"
                        : item.status === "warn"
                          ? "bg-yellow-950/40 text-yellow-300 border-l-2 border-yellow-500"
                          : item.status === "success"
                            ? "bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500"
                            : "bg-white/[0.02] text-gray-300"
                    }`}
                  >
                    <span className="text-gray-500 select-none shrink-0 font-mono text-[10px]">
                      {item.time}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Result:</span>
                <span
                  className={`font-semibold ${
                    authMode === "engineered"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {authMode === "engineered"
                    ? "✓ 100% Reliability — 0 Session Dropped"
                    : "✗ Critical Race Condition — Unauthenticated Session Drop"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SIMULATION 2: OFFLINE SYNC INTEGRITY */
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Field operators generating warehouse orders in basements with
                low connectivity suffered from duplicate primary key collisions
                upon sync, and OTA updates crashed native linking modules.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 bg-black/50 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => {
                  sound.playClick();
                  clearTimeouts();
                  setOfflineMode("naive");
                  setOfflineLogs([
                    {
                      id: "switched-offline",
                      time: "00:00.00",
                      text: "Switched to UNPROTECTED offline sync. Demonstrates ID collision on reconnect.",
                      status: "warn",
                    },
                  ]);
                }}
                disabled={offlineRunning}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer focus-ring-amber ${
                  offlineMode === "naive"
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Unprotected (Buggy)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  clearTimeouts();
                  setOfflineMode("engineered");
                  setOfflineLogs([
                    {
                      id: "switched-offline-eng",
                      time: "00:00.00",
                      text: "Switched to PURE-JS UUID & DUAL-TRIGGER SYNC. Demonstrates resilient offline queueing.",
                      status: "success",
                    },
                  ]);
                }}
                disabled={offlineRunning}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer focus-ring-amber ${
                  offlineMode === "engineered"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Shiv Kant&apos;s Idempotent Sync
              </button>
            </div>
          </div>

          {/* 2-Column Visual Architecture and Live Telemetry Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Left Column: Visual Pipeline */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">
                    SIMULATED ARCHITECTURE
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      offlineMode === "engineered"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {offlineMode === "engineered"
                      ? "PURE-JS UUID & DUAL-TRIGGER"
                      : "SEQUENTIAL LOCAL COUNTER"}
                  </span>
                </div>

                {/* Architecture Node Representation */}
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-300">
                      Warehouse Field Device
                    </span>
                    <span className="text-amber-400 font-bold">
                      Basement (No Internet)
                    </span>
                  </div>

                  <div className="flex justify-center text-gray-500">
                    <RotateCw
                      className={`w-3.5 h-3.5 ${offlineRunning ? "animate-spin text-amber-400" : ""}`}
                    />
                  </div>

                  <div
                    className={`p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
                      offlineMode === "engineered"
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/30 border-red-500/40 text-red-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {offlineMode === "engineered" ? (
                        <Lock className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Unlock className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-semibold">
                        {offlineMode === "engineered"
                          ? "Idempotent Storage Buffer"
                          : "Unsafe Local Sequence [001, 002]"}
                      </span>
                    </div>
                    <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                      {offlineMode === "engineered"
                        ? "UUID COLLISION-PROOF"
                        : "COLLISION RISK"}
                    </span>
                  </div>

                  <div className="flex justify-center text-gray-500">
                    <RotateCw
                      className={`w-3.5 h-3.5 ${offlineRunning ? "animate-spin text-cyan-400" : ""}`}
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-300">
                      Central Database Ledger
                    </span>
                    <span
                      className={`font-bold ${
                        offlinePhase === "corrupted"
                          ? "text-red-400 animate-pulse"
                          : offlinePhase === "online"
                            ? "text-emerald-400"
                            : "text-amber-400"
                      }`}
                    >
                      {offlinePhase === "corrupted"
                        ? "PRIMARY KEY COLLISION"
                        : "100% RECONCILED"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={runOfflineSim}
                  disabled={offlineRunning}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full mt-3 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/15 focus-ring-emerald"
                >
                  {offlineRunning ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>RECONCILING OFFLINE DATA...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>SIMULATE WAREHOUSE SYNC</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Execution Terminal Log */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-gray-300">
                    OFFLINE_SYNC_TELEMETRY.LOG
                  </span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  GROWW_YOU // WAREHOUSE_OPS
                </span>
              </div>

              <div className="h-56 overflow-y-auto space-y-2 py-3 pr-2 scrollbar-thin">
                {offlineLogs.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded text-[11px] leading-relaxed flex items-start gap-2.5 ${
                      item.status === "danger"
                        ? "bg-red-950/40 text-red-300 border-l-2 border-red-500"
                        : item.status === "warn"
                          ? "bg-yellow-950/40 text-yellow-300 border-l-2 border-yellow-500"
                          : item.status === "success"
                            ? "bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500"
                            : "bg-white/[0.02] text-gray-300"
                    }`}
                  >
                    <span className="text-gray-500 select-none shrink-0 font-mono text-[10px]">
                      {item.time}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Result:</span>
                <span
                  className={`font-semibold ${
                    offlineMode === "engineered"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {offlineMode === "engineered"
                    ? "✓ 100% Reconciled — Zero Record Loss"
                    : "✗ Data Corruption — Primary Key Collision & Crash"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
