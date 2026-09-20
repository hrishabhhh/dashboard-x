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

  console.log(loading, error, riskData);

  return (
    <>
      <div>Risk Insights</div>
    </>
  );
}

export default RiskInsights;
