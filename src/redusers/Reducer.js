import * as Actions from "../actions/Actions";

const initial_State = {
  Count: 0,
  ismodal: false,
  issearchModal: false,
  data: [
    {
      key: "0",
      headerColor: "pink",
      todoHeaderTitle: "Setting",
      icon: require("../img/01.png"),
      backColorSection: "red",
      todoColor: "red"
    },
    {
      key: "1",
      headerColor: "snow",
      todoHeaderTitle: "initial",
      icon: require("../img/06.png"),
      backColorSection: "#ffa64d",
      todoColor: "#ffcccc"
    }
  ]
};

const Reducer = (state = initial_State, action) => {
  switch (action.type) {
    case Actions.Increment:
      return { ...state, Count: state.Count + action.step };

    case Actions.Decrement:
      return { ...state, Count: state.Count - action.step };

    case Actions.SetData:
      return { ...state, data: action.newdata };

    case Actions.Setstate:
      return { ...state, issearchModal: action.Setstate };

    case Actions.SetModal:
      return { ...state, ismodal: action.Setstate };

    default:
      return state;
  }
};

export default Reducer;
