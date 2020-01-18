import { createStackNavigator } from "react-navigation";
import Counter from "./screens/Counter";
import Landing from "./screens/Landing";

const RootStack = createStackNavigator(
  {
    _Counter: Counter,
    _Landing: Landing
  },
  {
    initialRouteName: "_Landing"
  }
);

export default RootStack;
