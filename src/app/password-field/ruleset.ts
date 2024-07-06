export const RULESET = [
  (p: string) => /[!-\/:-@[-`{-~]/.test(p),
  (p: string) => /\d/.test(p),
  (p: string) => /[A-Za-z]/.test(p),
];
