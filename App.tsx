import { Banner, Label } from "@rizna_team/rizna_components";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { TestComponent } from "./src";


export const App = () => (
  <SafeAreaView>
    <ScrollView>
      <Label color={"brand1"} title={"Hello from lib!!!"} />
      <Text style={text}>{"Good morning Rizna team!!!"}</Text>
      <Banner />
      <TestComponent title={"I am GRUUUUUT"} style={{ padding: 40 }} />
    </ScrollView>
  </SafeAreaView>
);

const { text } = StyleSheet.create({
  text: {
    color: Platform.OS === "web" ? "#68197a" : "#177817",
    padding: 30,
    fontSize: 26,
  },
});

export default App;
