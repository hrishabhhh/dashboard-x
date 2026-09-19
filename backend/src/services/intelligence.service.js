import "dotenv/config";

function transformTasksForAI(tasks) {
  const taskInputs = tasks.map((task) => {
    return {
      id: String(task._id),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      assignedTo: String(task.assignedTo._id || task.assignedTo),
      assignedBy: String(task.assignedBy._id || task.assignedBy),
    };
  });
  return taskInputs;
}

async function analyseTaskRisk(tasks) {
  const taskInputs = transformTasksForAI(tasks);

  const response = await fetch(`${process.env.AI_SERVICE_URL}/risk/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tasks: taskInputs,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw new AppError(errorData.detail || "Invalid Response", response.status);
  }
  const data = await response.json();
  return data;
}

async function interpretTaskRisk(riskAnalysis) {
  const response = await fetch(`${process.env.AI_SERVICE_URL}/risk/interpret`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(riskAnalysis),
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw new AppError(
      errorData.detail || "AI Interpretation Failed",
      response.status,
    );
  }
  const data = await response.json();
  return data;
}

export async function getTaskRiskInsights(tasks) {
  const analysis = await analyseTaskRisk(tasks);
  const interpretation = await interpretTaskRisk(analysis);

  return {
    ...analysis,
    ai_insights: interpretation,
  };
}
