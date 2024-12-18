export function calculateScore(foundCount: number, totalCount: number, timeRemaining: number): number {
  const foundRatio = foundCount / totalCount;
  const timeBonus = timeRemaining > 0 ? timeRemaining / 300 : 0; // Normalize to 5 minutes
  return Math.round((foundRatio * 0.7 + timeBonus * 0.3) * 100);
}

export function getScoreMessage(score: number): string {
  if (score >= 90) return 'Perfect!';
  if (score >= 75) return 'Great job!';
  if (score >= 50) return 'Well done!';
  return 'Keep practicing!';
}