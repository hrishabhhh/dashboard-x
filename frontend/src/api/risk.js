import api from "./axios";

export async function getRiskInsights() {
  const response = await api.get("/task/risk-insights");
  return response.data.insights;
}
