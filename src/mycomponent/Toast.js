import toast from 'react-native-root-toast';

export function Toast(message, islong = true) {
  toast.show(message, {
    duration: islong ? toast.durations.LONG : toast.durations.SHORT,
    position: toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 10,
    backgroundColor: '#222559',
    textColor: 'white',
    textStyle: { fontSize: 15, textAlign: 'center' },
    containerStyle: { bottom: 20 }
  });
}
