import React, { useEffect, useRef, useState } from "react";

import { Animated, Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authConstants } from "../actions/constants";

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return "Random message " + number;
};

const Message = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Text>{props.message}</Text>
    </Animated.View>
  );
};

export default Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // console.log("adding message to toast: ", toast.messages);
    setMessages(toast.messages);
  }, [toast]);
  return (
    <View
      style={{
        position: "absolute",
        top: 45,
        left: 0,
        right: 0,
      }}
    >
      {messages.map((message) => (
        <Message
          key={message}
          message={message}
          onHide={() => {
            const filteredMessages = messages.filter(
              (currentMessage) => currentMessage !== message
            );
            setMessages(filteredMessages);
            dispatch({
              type: authConstants.TOAST_REMOVE,
              payload: { messages: filteredMessages },
            });
            setMessages(filteredMessages);
          }}
        />
      ))}
    </View>
  );
};
