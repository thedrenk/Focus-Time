import react from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return  <Text style={styles.title}> we havent focus on nothing yet </Text>;

  const renderItem = ({ item }) => <Text style={styles.item}> - {item} </Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Things to focused on: </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    fontSize: fontSizes.md,
    paddingTop: spacing.md,
    color: colors.white,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,

    fontWeight: 'bold',

    //justifyContent: 'center',
  },
});
