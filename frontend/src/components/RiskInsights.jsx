import { useEffect, useState } from "react";
import { getRiskInsights } from "../api/risk";

function RiskInsights() {
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function insights() {
      try {
        const riskInsights = await getRiskInsights();
        setRiskData(riskInsights);
        console.log("Risk Insights: ", riskInsights);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    insights();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-gray-950 text-gray-400">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-red-500" />
          <p className="text-sm">Analyzing project risks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-300">
        Unable to load risk intelligence: {error}
      </div>
    );
  }
  if (!riskData) {
    return null;
  }

  function formatSignalName(name) {
    return name
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function getSeverityClasses(severity) {
    const styles = {
      high: "border-red-500 bg-red-950/30 text-red-300",
      medium: "border-yellow-500 bg-yellow-950/30 text-yellow-300",
      low: "border-blue-500 bg-blue-950/30 text-blue-300",
      none: "border-gray-700 bg-gray-900 text-gray-400",
    };

    return styles[severity] || styles.none;
  }

  function getOverallRiskClasses(level) {
    const styles = {
      high: "bg-red-500/10 border-red-500/40 text-red-300",
      medium: "bg-yellow-500/10 border-yellow-500/40 text-yellow-300",
      low: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
    };

    return styles[level] || styles.low;
  }

  return (
    <div className="min-h-screen min-w-full bg-gray-950 px-4 py-6 text-white sm:px-6 lg:px-8 rounded-2xl">
      <div className="mx-auto space-y-6 rounded-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Dashboard-X Intelligence
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Risk Intelligence
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Deterministic project risk analysis with AI-powered insights.
            </p>
          </div>

          <div
            className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold uppercase ${getOverallRiskClasses(
              riskData.overall_risk_level,
            )}`}
          >
            {riskData.overall_risk_level} Risk
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
            <p className="text-sm font-medium text-gray-400">
              Overall Risk Score
            </p>

            <div className="mt-4 flex items-end gap-2">
              <h2 className="text-5xl font-bold tracking-tight">
                {riskData.overall_risk_score}
              </h2>

              <span className="mb-1 text-sm text-gray-500">/ 100</span>
            </div>

            <div
              className={`mt-5 inline-flex rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${getOverallRiskClasses(
                riskData.overall_risk_level,
              )}`}
            >
              {riskData.overall_risk_level}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-lg">
                ✦
              </div>

              <div>
                <p className="font-semibold">AI Risk Summary</p>
                <p className="text-xs text-gray-500">
                  Generated from validated project risk signals
                </p>
              </div>
            </div>

            <p className="max-w-4xl text-sm leading-7 text-gray-300">
              {riskData.ai_insights.summary}
            </p>
          </div>
        </div>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Risk Signals</h2>
            <p className="text-sm text-gray-500">
              Individual factors contributing to project delivery risk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {Object.entries(riskData.signals).map(
              ([signalName, signalData]) => (
                <div
                  key={signalName}
                  className={`rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${getSeverityClasses(
                    signalData.severity,
                  )}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold">
                      {formatSignalName(signalName)}
                    </h3>

                    <span className="rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {signalData.severity}
                    </span>
                  </div>

                  <div className="mt-6">
                    {signalData.count !== undefined && (
                      <>
                        <p className="text-3xl font-bold">{signalData.count}</p>
                        <p className="mt-1 text-xs opacity-70">
                          Detected tasks
                        </p>
                      </>
                    )}

                    {signalData.totalActiveTasks !== undefined && (
                      <>
                        <p className="text-3xl font-bold">
                          {signalData.totalActiveTasks}
                        </p>
                        <p className="mt-1 text-xs opacity-70">Active tasks</p>
                      </>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-red-900/40 bg-gray-900 p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Attention Required
              </p>
              <h2 className="mt-1 text-lg font-semibold">Identified Risks</h2>
            </div>

            <div className="space-y-3">
              {riskData.ai_insights.risks.map((risk, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-gray-800 bg-gray-950/70 p-4"
                >
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <p className="text-sm leading-6 text-gray-300">{risk}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Suggested Actions
              </p>

              <h2 className="mt-1 text-lg font-semibold">AI Recommendations</h2>
            </div>

            <div className="space-y-3">
              {riskData.ai_insights.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-gray-800 bg-gray-950/70 p-4"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-gray-300">
                      {recommendation}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RiskInsights;
