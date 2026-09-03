"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { 
  Lock, 
  Unlock, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Cpu, 
  Play, 
  Check,
  RefreshCw,
  Clock
} from "lucide-react";

export function ConcurrencySimulator() {
  const [mode, setMode] = useState<"naive" | "engineered">("engineered");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<
    { id: string; time: string; text: string; status: "info" | "success" | "danger" | "warn" }[]
  >([
    {
      id: "init",
      time: "00:00.000",
      text: "Simulator ready. Select mode and click 'Simulate Concurrent Requests'.",
      status: "info",
    },
  ]);
  const [appState, setAppState] = useState<"active" | "logging_out" | "locked" | "refreshed">("active");

  const runSimulation = () => {
    sound.playClick();
    setIsRunning(true);
    setLogs([]);
    setAppState("active");

    const addLog = (
      text: string,
      status: "info" | "success" | "danger" | "warn",
      offsetMs: number
    ) => {
      setTimeout(() => {
        const timeStr = `00:0${(offsetMs / 1000).toFixed(2)}`;
        setLogs((prev) => [...prev, { id: Math.random().toString(), time: timeStr, text, status }]);
      }, offsetMs);
    };

    if (mode === "naive") {
      // Unprotected concurrent refresh behavior
      addLog("Trip coordinates ping (Req #1) -> HTTP 401 (Access Token Expired)", "warn", 100);
      addLog("Driver fare calculation (Req #2) -> HTTP 401 (Access Token Expired)", "warn", 180);
      addLog("FCM notification pull (Req #3) -> HTTP 401 (Access Token Expired)", "warn", 250);

      setTimeout(() => {
        addLog("Req #1 fires /auth/refresh with Refresh Token [RT_101]", "info", 500);
      }, 500);

      setTimeout(() => {
        addLog("Req #2 fires DUPLICATE /auth/refresh with old [RT_101] (RACE CONDITION!)", "danger", 750);
      }, 750);

      setTimeout(() => {
        addLog("Server rotates token: RT_101 is now invalidated. New RT_102 issued to Req #1.", "info", 1100);
      }, 1100);

      setTimeout(() => {
        addLog("Server receives Req #2 with old RT_101 -> TOKEN ROTATION REUSE ATTACK DETECTED!", "danger", 1400);
        addLog("FATAL: Auth server forcibly revokes entire session hierarchy.", "danger", 1650);
        setAppState("logging_out");
      }, 1400);

      setTimeout(() => {
        addLog("DRIVER LOGGED OUT MID-TRIP. User forced to re-enter credentials.", "danger", 2000);
        setIsRunning(false);
      }, 2000);
    } else {
      // Shiv Kant's Request Locking & Queued Retry Solution
      addLog("Trip coordinates ping (Req #1) -> HTTP 401 (Access Token Expired)", "warn", 100);
      addLog("Driver fare calculation (Req #2) -> HTTP 401 (Access Token Expired)", "warn", 180);
      addLog("FCM notification pull (Req #3) -> HTTP 401 (Access Token Expired)", "warn", 250);

      setTimeout(() => {
        addLog("[MUTEX_LOCK]: Req #1 acquires exclusive Refresh Mutex Lock.", "success", 450);
        setAppState("locked");
      }, 450);

      setTimeout(() => {
        addLog("[REQUEST_QUEUE]: Req #2 and Req #3 intercepted -> Enqueued into Pending Retry Buffer.", "info", 700);
      }, 700);

      setTimeout(() => {
        addLog("Unified Refresh Engine issues single /auth/refresh request to OAuth gateway.", "info", 1000);
      }, 1000);

      setTimeout(() => {
        addLog("Auth Server returns new Access Token [AT_992] and Refresh Token [RT_102].", "success", 1400);
        setAppState("refreshed");
      }, 1400);

      setTimeout(() => {
        addLog("[DE-QUEUE]: Req #2 and Req #3 retried automatically with new token [AT_992] -> HTTP 200 OK!", "success", 1750);
      }, 1750);

      setTimeout(() => {
        addLog("[MUTEX_RELEASE]: Lock released. 100% requests resolved. ZERO active trip drop.", "success", 2100);
        setAppState("active");
        setIsRunning(false);
        sound.playSuccess();
      }, 2100);
    }
  };

  return (
    <div className="w-full bg-[#0d111a] border border-amber-500/30 rounded-xl p-6 md:p-8 backdrop-blur-lg relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE_MISSION_LAB // CONCURRENCY_BENCHMARK</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Token-Refresh Race Condition Simulator
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Experience the real production ride-hailing defect Shiv Kant root-caused and engineered at Groww You.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center p-1 bg-black/50 border border-white/10 rounded-lg">
          <button
            onClick={() => {
              sound.playClick();
              setMode("naive");
            }}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              mode === "naive"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Unprotected (Buggy)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setMode("engineered");
            }}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              mode === "engineered"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Shiv Kant&apos;s Solution (Protected)
          </button>
        </div>
      </div>

      {/* Simulator Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Visual Pipeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">SIMULATED ARCHITECTURE</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  mode === "engineered"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {mode === "engineered" ? "MUTEX REQUEST LOCKING" : "NO CONCURRENCY GUARD"}
              </span>
            </div>

            {/* Architecture Node Representation */}
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-300">Concurrent API Requests</span>
                <span className="text-amber-400">3 Simultaneous (HTTP 401)</span>
              </div>

              <div className="flex justify-center text-gray-500">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
              </div>

              <div
                className={`p-3 rounded border transition-all text-xs font-mono flex items-center justify-between ${
                  mode === "engineered"
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/30 border-red-500/40 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {mode === "engineered" ? (
                    <Lock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Unlock className="w-4 h-4 text-red-400" />
                  )}
                  <span>
                    {mode === "engineered"
                      ? "Unified Refresh Engine"
                      : "Uncoordinated Individual Retries"}
                  </span>
                </div>
                <span>{mode === "engineered" ? "LOCKED" : "UNLOCKED"}</span>
              </div>

              <div className="flex justify-center text-gray-500">
                <RotateCw className="w-3.5 h-3.5" />
              </div>

              <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-300">Driver Mobile App Session</span>
                <span
                  className={`font-bold ${
                    appState === "logging_out"
                      ? "text-red-400 animate-pulse"
                      : "text-emerald-400"
                  }`}
                >
                  {appState === "logging_out" ? "FORCED LOGOUT" : "ACTIVE TRIP SECURE"}
                </span>
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={isRunning}
              onMouseEnter={() => sound.playHover()}
              className="w-full mt-3 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>EXECUTING CONCURRENT TRACE...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>SIMULATE CONCURRENT REQUESTS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Terminal Log */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 border border-white/10 rounded-lg p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STAGED_ROLLOUT_TELEMETRY.LOG</span>
            </span>
            <span className="text-[10px] text-gray-500">GROWW_YOU // RIDE_HAILING_CORE</span>
          </div>

          <div className="h-56 overflow-y-auto space-y-2 py-3 pr-2 scrollbar-thin">
            {logs.map((item) => (
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
                <span className="text-gray-500 shrink-0">{item.time}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
            <span>Result:</span>
            <span
              className={`font-semibold ${
                mode === "engineered" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {mode === "engineered"
                ? "✓ 100% Reliability — 0 Session Dropped"
                : "✗ Critical Race Condition — Unauthenticated Session Drop"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
