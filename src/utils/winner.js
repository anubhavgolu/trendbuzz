export function pickWinner(a, b) {
  // if engagement missing, decide purely by followers
  const engA = parseFloat(a.engagementRate);
  const engB = parseFloat(b.engagementRate);

  if (isNaN(engA) || isNaN(engB)) {
    return a.followers >= b.followers
      ? a.username
      : b.username;
  }

  // otherwise weighted score
  const scoreA = engA * 1000 + a.followers;
  const scoreB = engB * 1000 + b.followers;

  return scoreA >= scoreB ? a.username : b.username;
}
