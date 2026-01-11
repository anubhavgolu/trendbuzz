import { formatMatchDate } from "./formatMatchDate";

export const groupMatchesByDate = (matches) => {
  return matches.reduce((acc, match) => {
    const dateKey = formatMatchDate(match.date);

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(match);
    return acc;
  }, {});
};
