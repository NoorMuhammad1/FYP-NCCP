import React from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
} from "native-base";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";

const NativeBaseSearchBar = ({ query, setQuery }) => {
  return (
    <Container>
      <Item>
        <Icon name="ios-search" />
        <Input
          placeholder="Search"
          value={query}
          onChangeText={(value) => setQuery(value)}
        />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Container>
  );
};

export default NativeBaseSearchBar;
