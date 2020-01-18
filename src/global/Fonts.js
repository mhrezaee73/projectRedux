import { StyleSheet, Platform } from 'react-native';

const fonts = (locale = 'fa') => {
  switch (locale) {
    case 'fa':
      return StyleSheet.create({
        Thin: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-Thin-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: '100' }
          })
        },

        Light: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-Light-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: '300' }
          })
        },

        Normal: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: 'normal' }
          })
        },

        Medium: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-Medium-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: '500' }
          })
        },

        Bold: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-Bold-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: 'bold' }
          })
        },

        Black: {
          ...Platform.select({
            android: { fontFamily: 'Vazir-Black-FD' },
            ios: { fontFamily: 'Vazir FD', fontWeight: '900' }
          })
        }
      });

    case 'en':
      return StyleSheet.create({
        Thin: {
          ...Platform.select({
            android: { fontFamily: 'Titillium-Thin' },
            ios: { fontFamily: 'Titillium', fontWeight: '100' }
          })
        },

        Light: {
          ...Platform.select({
            android: { fontFamily: 'Titillium-Light' },
            ios: { fontFamily: 'Titillium', fontWeight: '300' }
          })
        },

        Normal: {
          ...Platform.select({
            android: { fontFamily: 'Titillium' },
            ios: { fontFamily: 'Titillium', fontWeight: 'normal' }
          })
        },

        Medium: {
          ...Platform.select({
            android: { fontFamily: 'Titillium-Medium' },
            ios: { fontFamily: 'Titillium', fontWeight: '500' }
          })
        },

        Bold: {
          ...Platform.select({
            android: { fontFamily: 'Titillium-Bold' },
            ios: { fontFamily: 'Titillium', fontWeight: 'bold' }
          })
        },

        Black: {
          ...Platform.select({
            android: { fontFamily: 'Titillium-Black' },
            ios: { fontFamily: 'Titillium', fontWeight: '900' }
          })
        }
      });
  }
};

export { fonts };
