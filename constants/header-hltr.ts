export function getHeaderHltr(level: number) {
  switch (level) {
    case 1:
      return "hltr-red";
    case 2:
      return "hltr-orange";
    case 3:
      return "hltr-yellow";
    case 4:
      return "hltr-green";
    case 5:
      return "hltr-cyan";
    case 6:
      return "hltr-blue";
    default:
      return "hltr-purple";
  }
}
