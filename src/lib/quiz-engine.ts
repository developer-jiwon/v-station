import type { Content, Option, ResultType, QuizState } from "@/types/content";

export function createInitialState(): QuizState {
  return {
    currentQuestion: 0,
    answers: {},
    scores: {},
    isComplete: false,
    result: null,
  };
}

export function processAnswer(
  state: QuizState,
  content: Content,
  questionId: string,
  option: Option
): QuizState {
  const newScores = { ...state.scores };

  // Add scores from the selected option
  if (option.score) {
    Object.entries(option.score).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
  }

  const newAnswers = {
    ...state.answers,
    [questionId]: option.condition || option.id,
  };

  const nextQuestion = state.currentQuestion + 1;
  const isComplete = nextQuestion >= content.questions.length;

  let result: ResultType | null = null;
  if (isComplete) {
    result = calculateResult(content, newScores, newAnswers);
  }

  return {
    currentQuestion: nextQuestion,
    answers: newAnswers,
    scores: newScores,
    isComplete,
    result,
  };
}

function calculateResult(
  content: Content,
  scores: Record<string, number>,
  answers: Record<string, string>
): ResultType {
  if (content.logicType === "score") {
    return calculateScoreBasedResult(content.results, scores);
  } else {
    return calculateConditionBasedResult(content.results, answers);
  }
}

function calculateScoreBasedResult(
  results: ResultType[],
  scores: Record<string, number>
): ResultType {
  // Check for results with minScore/maxScore ranges
  const resultsWithRanges = results.filter(
    (r) => r.minScore !== undefined || r.maxScore !== undefined
  );

  if (resultsWithRanges.length > 0) {
    // Calculate total score
    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);

    // Find matching result based on score range
    for (const result of resultsWithRanges) {
      const meetsMin = result.minScore === undefined || totalScore >= result.minScore;
      const meetsMax = result.maxScore === undefined || totalScore <= result.maxScore;
      if (meetsMin && meetsMax) {
        return result;
      }
    }
  }

  // Find the highest scoring category
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

  if (sortedScores.length === 0) {
    return results[0];
  }

  // Get top categories
  const topCategories = sortedScores.slice(0, 2).map(([cat]) => cat);

  // Try to find a result matching the combination
  const combinedId = topCategories.join("-");
  let matchedResult = results.find((r) => r.id === combinedId);

  if (!matchedResult) {
    // Try reverse combination
    const reversedId = [...topCategories].reverse().join("-");
    matchedResult = results.find((r) => r.id === reversedId);
  }

  if (!matchedResult) {
    // Fall back to matching single top category
    matchedResult = results.find((r) => r.id.includes(topCategories[0]));
  }

  return matchedResult || results[0];
}

function calculateConditionBasedResult(
  results: ResultType[],
  answers: Record<string, string>
): ResultType {
  const answerValues = Object.values(answers);

  // Find result that best matches the conditions
  let bestMatch: ResultType | null = null;
  let bestMatchCount = 0;

  for (const result of results) {
    if (!result.conditions) continue;

    const matchCount = result.conditions.filter((condition) =>
      answerValues.includes(condition)
    ).length;

    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestMatch = result;
    }
  }

  return bestMatch || results[0];
}

export function getProgressPercentage(state: QuizState, totalQuestions: number): number {
  return Math.round((state.currentQuestion / totalQuestions) * 100);
}
