import { StyleSheet, View, Text,Pressable } from "react-native";
function LogItem(props) {
  return (
    <Pressable onPress={props.onDeleteItem}>
    <View style={styles.logItem}>
      <Text style={styles.logItem}>{props.text}</Text>
    </View>
    </Pressable>
  );
}
export default LogItem;

const styles = StyleSheet.create({
  logItem: {
    margin: 7,
    borderRadius: 7,
    backgroundColor: "#ff8100", //dark orange
    padding: 2,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
});
