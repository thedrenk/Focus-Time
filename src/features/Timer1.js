import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  {/* the vibration paterrn , so vibrate wait 1 second vibrate wait 1 second etc*/}
];

export const Timer1 = ({ focusSubject, clearSubject , onTimerEnd}) => {
  useKeepAwake();
  {/* useState*/ }
  const [isStarted, setisStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  { /* END useState*/}

const onEnd= (reset) => {
   Vibration.vibrate(PATTERN);
   {/*vibrate when ever the timer ends */}
   setisStarted(false);
   setProgress(1);
   reset();
   onTimerEnd(focusSubject);
}

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          /*{(progress) => setProgress(progress)} is the as {setProgress}  
            setProgress take the value and set the value , it a updater
            so it update the value
          */
          onEnd={onEnd}
        />
{/* START Text under the timer View */}
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}> Focusing on: </Text>
          <Text style={styles.task}>{focusSubject} </Text>
        </View>
        {/*END of the text under the timer View */}
      </View>

{/* START ProgressBar under the timer View */}
      <View style={{ paddingTop: spacing.lg }}>
        <ProgressBar
          progress={progress}
          color={colors.white}
          style={{ height: spacing.sm }}
        />
      </View>
      {/* End ProgressBar under the timer View */}

{/* 10 min button*/ }
      <View style={styles.timingwrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      {/*10 min button End */}

{/* Start of the startButton and PauseButton*/}
      <View style={styles.buttonwrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setisStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setisStarted(false)} />
        )}
      </View>
      {/* END of the startButton and PauseButton*/}
      <View style={styles.clearSubjectWrapper}>
      <RoundedButton size={90} title='-' onPress={clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearSubjectWrapper:{
   justifyContent: 'center',
   //marginRight:20,
    flexDirection:'row'
     
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timingwrapper:{
    flex:0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row'
  },

  buttonwrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },

  task: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
});
