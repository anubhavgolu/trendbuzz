export const groupTeamsAlphabetically = (teams) => {
  return teams.reduce((acc, team) => {
    const letter = team.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(team);
    return acc;
  }, {});
};
