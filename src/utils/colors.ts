export function adjustColor(color: any, amount: any) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color: any) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
      )
  );
}
