import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer1 } from './src/features/Timer1';
import { FocusHistory } from './src/features/FocusHistory'

export default function App() {

  const [currentSubject, setCurrentSubject] = useState()
  
const [history, setHistory] = useState([])
  return (
    
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
        <Focus addSubject={setCurrentSubject}/>
        <FocusHistory history={history}/>
        </>
      ) : (
        //apparently I HAD TO ADD THE STYLE container ON THE VIEW ON APP.JS
        <View style={styles.container}>
         <Timer1 
         focusSubject={ currentSubject }
         onTimerEnd={(subject) => {
           setHistory([...history,subject])
         }}
         clearSubject={() => {setCurrentSubject(null)}}

         />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'andriod' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.orange
    
  },
 
});
