import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';


const useFonts = async () => {
  await Font.loadAsync({
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  });
};

export const FontsTexts = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await useFonts();
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};
