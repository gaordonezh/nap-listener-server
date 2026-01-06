export const parseYapeTextContent = (complete: string, start: string | number, end: string | number): string => {
  const isStartStr = typeof start === 'string';
  const isEndStr = typeof end === 'string';

  let startIndex = isStartStr ? complete.indexOf(start) : start;
  const endIndex = isEndStr ? complete.indexOf(end) : end;

  if (startIndex < 0 || endIndex < 0) return '-';
  if (isStartStr) startIndex += start.length;

  const extract = complete.slice(startIndex, endIndex);
  return extract;
};
