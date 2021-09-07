import React from "react";
import { ScrollView } from "react-native";

import Questions from "../data/questions";
import { RowItem } from "../components/RowItem";

export default ({ navigation }) => (
  <ScrollView>
    <RowItem
      name="Click To Start Test"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Quiz",
          questions: Questions,
          color: "#36b1f0",
        })
      }
    />
  </ScrollView>
);
