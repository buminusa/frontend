"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/langue/provider";
import {
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  X,
  Info,
  Shield,
  Clock,
  WifiOff,
} from "lucide-react";

export function SessionExpiredBanner() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100/80 border border-red-200 rounded-2xl p-5 animate-slideDown">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <Shield size={24} className="text-red-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-red-900">
                {t("dashboard.common.sessionExpiredTitle")}
              </h4>
              <p className="text-sm text-red-700 mt-1">
                {t("dashboard.common.sessionExpiredDesc")}
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-lg hover:bg-red-200 transition-all text-red-500"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30"
              onClick={() => router.push("/login?session=expired")}
            >
              {t("dashboard.common.loginAgain")}
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500 rounded-full text-xs">
                <Clock size={10} />
                {countdown}s
              </span>
            </button>
            <button className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
              {t("dashboard.common.learnMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const { t } = useLanguage();

  const handleRetry = async () => {
    setIsRetrying(true);
    await onRetry();
    setTimeout(() => setIsRetrying(false), 1000);
  };

  if (!visible) return null;

  // Check if it's a connection error
  const isConnectionError =
    message.includes("fetch") ||
    message.includes("network") ||
    message.includes("Failed to fetch") ||
    message.includes("ECONNREFUSED");

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 animate-slideDown">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          {isConnectionError ? (
            <WifiOff size={24} className="text-red-500" />
          ) : (
            <AlertCircle size={24} className="text-red-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-red-900">
                {isConnectionError
                  ? t("dashboard.common.connectionFailed")
                  : t("dashboard.common.systemError")}
              </h4>
              <p className="text-sm text-red-700 mt-1">
                {isConnectionError
                  ? t("dashboard.common.connectionFailedDesc")
                  : message}
              </p>
              {!isConnectionError && (
                <div className="mt-3 p-3 bg-red-100/50 rounded-lg border border-red-200">
                  <p className="text-xs text-red-700">
                    {t("dashboard.common.roleCheckHint")}
                  </p>
                </div>
              )}
              {isConnectionError && (
                <div className="mt-3 p-3 bg-red-100/50 rounded-lg border border-red-200">
                  <p className="text-xs text-red-700 font-medium mb-2">
                    {t("dashboard.common.howToFix")}
                  </p>
                  <ol className="text-xs text-red-600 space-y-1 list-decimal list-inside">
                    <li>{t("dashboard.common.stepBackendRunning")}</li>
                    <li>
                      {t("dashboard.common.runCommand")}{" "}
                      <code className="px-1 py-0.5 bg-red-200 rounded font-mono">
                        cd backend && go run main.go
                      </code>
                    </li>
                    <li>
                      {t("dashboard.common.checkEnvFile")}{" "}
                      <code className="px-1 py-0.5 bg-red-200 rounded font-mono">
                        .env.local
                      </code>
                    </li>
                  </ol>
                </div>
              )}
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-lg hover:bg-red-200 transition-all text-red-500"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={14}
                className={isRetrying ? "animate-spin" : ""}
              />
              {isRetrying ? t("dashboard.common.trying") : t("dashboard.common.retry")}
            </button>
            <button className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
              {t("dashboard.common.contactSupport")}
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium hover:underline">
              {t("dashboard.common.viewDocumentation")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PartialWarningsBanner({
  warnings,
}: {
  warnings: string[];
}) {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  if (warnings.length === 0 || !visible) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-5 animate-slideDown">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={24} className="text-yellow-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-yellow-900">
                {t("dashboard.common.partialWarningsTitle")}
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                {t("dashboard.common.partialWarningsDesc")}
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-lg hover:bg-yellow-200 transition-all text-yellow-600"
            >
              <X size={16} />
            </button>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 mt-3 text-xs text-yellow-700 hover:text-yellow-800 font-medium"
          >
            <Info size={12} />
            {expanded ? t("dashboard.common.hide") : t("dashboard.common.show")} {t("dashboard.common.warningDetails")}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {expanded && (
            <div className="mt-3 space-y-2 animate-slideDown">
              {warnings.map((w, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-yellow-100/50 rounded-lg border border-yellow-200"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-yellow-700">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs text-yellow-800">{w}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
