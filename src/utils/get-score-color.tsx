export const getScoreColor = (score: number) => {
  if (score >= 80) return "text-foreground";
  if (score >= 60) return "text-muted-foreground";
  return "text-muted-foreground/70";
};
