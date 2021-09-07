import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

class Quiz extends React.Component {
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam("questions", []).length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
  };

  answer = (correct) => {
    this.setState(
      (state) => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };

  nextQuestion = () => {
    this.setState((state) => {
      const nextIndex = state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
        setTimeout(() => this.props.navigation.popToTop(), 5000);
      }
      return {
        activeQuestionIndex: nextIndex,
        answered: false,
      };
    });
  };

  render() {
    const questions = this.props.navigation.getParam("questions", []);
    const question = questions[this.state.activeQuestionIndex];
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") },
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          {this.state.activeQuestionIndex < questions.length && (
            <>
              <View>
                <Text style={styles.text}>{question.question}</Text>
                <ButtonContainer>
                  {question.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      text={answer.text}
                      onPress={() => this.answer(answer.correct)}
                    />
                  ))}
                </ButtonContainer>
              </View>
              <Button
                key="5"
                text="Next   >"
                onPress={() => this.nextQuestion()}
              />
            </>
          )}
          <Text style={styles.text}>
            Correct:
            {` ${this.state.correctCount}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600",
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between",
  },
});
