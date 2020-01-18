const red = {
  light: '#fd1255',
  medium: '#aa1200',
  last: '#ff0019'
};
const green = {
  light: '#a2af55',
  medium: '#12aa00',
  last: '#00ff00'
};
const Mycolors = local => {
  switch (local) {
    case 'red':
      return red;
    case 'green':
      return green;

    default:
      return red;
  }
};
export { Mycolors };
