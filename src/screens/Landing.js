import React, { Component } from "reactn";
import {
  View,
  FlatList,
  Dimensions,
  StatusBar,
  AsyncStorage,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  RefreshControl
} from "react-native";
import { Setting, Spinner } from "../mycomponent";
import Header from "../mycomponent/Header";
import Home from "../mycomponent/Home";
import Modal from "react-native-modalbox";
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import * as Actions from "../actions/Actions";

class Landing extends Component {
  static navigationOptions = {
    header: ({ navigation }) => <Header navigation={navigation} />
  };
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      isloading: true,
      todoHeaderTitle: "",
      headerColor: "",
      backColorSection: "",
      todoColor: "",
      refresh: false
    };

    this.setGlobal({ rotdeg: "0" });
  }

  componentDidMount() {
    // this.timer();
    AsyncStorage.getItem(`data`)
      .then(data => {
        let parsed = JSON.parse(data);
        if (parsed) {
          this.props.dispatch({
            type: Actions.SetData,
            newdata: parsed
          });
        }
      })
      .catch(error => alert(error))
      .finally(this.setState({ isloading: false }));
  }

  reload() {
    this.setState({ refresh: true }, () =>
      AsyncStorage.clear()
        .then(() =>
          AsyncStorage.getItem("data")
            .then(data => {
              let parsed = JSON.parse(data);
              if (parsed) {
                this.setGlobal({ data: parsed });
              }
            })
            .catch(error => console.warn(error))
            .finally(() => this.setState({ refresh: false }))
        )
        .catch(error => console.warn(error))
    );
  }

  timer() {
    setInterval(() => {
      this.setGlobal({ rotdeg: this.global.rotdeg + 45 });
    }, 10);
  }

  searchModeal() {
    return (
      <Modal
        style={{
          width: "80%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          paddingVertical: 0
        }}
        animationDuration={1000}
        position={"center"}
        isOpen={this.props.issearchModal}
        onClosed={() => {
          this.props.dispatch({
            type: Actions.Setstate,
            Setstate: false
          });
        }}
        coverScreen
        backdropPressToClose
        backButtonClose
        swipeToClose
        backdropColor="#222222"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: responsiveFontSize(2),
              fontFamily: "Vazir-Medium-FD",
              textAlign: "center",
              color: "black",
              marginBottom: 20
            }}
          >
            "بخش جستجو"
          </Text>
          {/** search title box */}
          <View
            style={{
              width: responsiveWidth(40),
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <TextInput
              keyboardType={"web-search"}
              style={{
                flex: 1,
                textAlign: "center",
                borderRadius: 10,
                fontSize: responsiveFontSize(1.5),
                fontFamily: "Vazir-Medium-FD",
                color: "black",
                backgroundColor: `transparent`,
                borderWidth: 2,
                alignSelf: "stretch"
              }}
              value={this.global.search}
              onChangeText={search => this.setGlobal({ search })}
            />
          </View>

          {/**  task background color */}
          <TouchableOpacity
            style={{
              width: responsiveWidth(40),
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 20,
              backgroundColor: "coral",
              borderRadius: 10
            }}
            onPress={() => {
              this.props.dispatch({
                type: Actions.Setstate,
                Setstate: false
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: responsiveFontSize(2),
                fontFamily: "Vazir-Medium-FD",
                textAlign: "center",
                color: "black"
              }}
            >
              جستجو
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: responsiveWidth(40),
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 20,
              backgroundColor: "coral",
              borderRadius: 10
            }}
            onPress={() => {
              this.setGlobal({ search: "" });
              this.props.dispatch({
                type: Actions.Setstate,
                Setstate: false
              });
              Keyboard.dismiss();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: responsiveFontSize(2),
                fontFamily: "Vazir-Medium-FD",
                textAlign: "center",
                color: "black"
              }}
            >
              پاک کردن
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  AddModall() {
    return (
      <Modal
        style={{
          width: "80%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          paddingVertical: 0
        }}
        animationDuration={500}
        position={"center"}
        isOpen={this.props.ismodal}
        onClosed={() => {
          this.props.dispatch({
            type: Actions.SetModal,
            Setstate: false
          });
        }}
        coverScreen
        backdropPressToClose
        backButtonClose
        swipeToClose
        backdropColor="#222222"
      >
        <View
          style={{
            width: "80%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center"
            // backgroundColor: "green"
          }}
        >
          <View
            style={{
              width: "75%",
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "4%"
            }}
          >
            <Text
              style={{
                //padding: 10,
                fontSize: responsiveFontSize(1.5),
                fontFamily: "Vazir-Medium-FD",
                color: "black",
                textAlign: "center"
                //marginBottom: 20
              }}
            >
              {`در بخش رنگ ها یک عدد شش رقمی به صورت RGB وارد کنید`}
            </Text>
          </View>

          {/** Section Name */}
          <View
            style={{
              width: "75%",
              height: "15%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "4%"
            }}
          >
            <View
              style={{
                position: "absolute",
                top: responsiveHeight(-2),
                left: responsiveWidth(5),
                backgroundColor: "white",
                paddingHorizontal: 10,
                zIndex: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: "Vazir-Medium-FD",
                  color: "black"
                }}
              >
                {"نام بخش"}
              </Text>
            </View>
            <TextInput
              keyboardType={"web-search"}
              style={{
                flex: 1,
                textAlign: "center",
                borderRadius: 10,
                fontSize: responsiveFontSize(1.2),
                color: "black",
                backgroundColor: `transparent`,
                borderWidth: 2,
                alignSelf: "stretch"
              }}
              value={this.state.todoHeaderTitle}
              onChangeText={todoHeaderTitle =>
                this.setState({ todoHeaderTitle })
              }
            />
          </View>
          {/** header section color */}
          <View
            style={{
              width: "75%",
              height: "15%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "4%"
            }}
          >
            <View
              style={{
                position: "absolute",
                top: responsiveHeight(-2),
                left: responsiveWidth(5),
                backgroundColor: "white",
                paddingHorizontal: 10,
                zIndex: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: "Vazir-Medium-FD",
                  color: "black"
                }}
              >
                {"رنگ پس زمینه هدر"}
              </Text>
            </View>
            <TextInput
              keyboardType={"number-pad"}
              style={{
                flex: 1,
                textAlign: "center",
                borderRadius: 10,
                fontSize: responsiveFontSize(1),
                color: "black",
                backgroundColor: `#${this.state.headerColor}`,
                borderWidth: 2,
                alignSelf: "stretch"
              }}
              value={this.state.headerColor}
              onChangeText={headerColor => this.setState({ headerColor })}
            />
          </View>
          {/**  section background color */}
          <View
            style={{
              width: "75%",
              height: "15%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "4%"
            }}
          >
            <View
              style={{
                position: "absolute",
                top: responsiveHeight(-2),
                left: responsiveWidth(5),
                backgroundColor: "white",
                paddingHorizontal: 10,
                zIndex: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: "Vazir-Medium-FD",
                  color: "black"
                }}
              >
                {"رنگ پس زمینه بخش"}
              </Text>
            </View>
            <TextInput
              keyboardType={"number-pad"}
              style={{
                flex: 1,
                textAlign: "center",
                borderRadius: 10,
                fontSize: responsiveFontSize(1),
                color: "black",
                backgroundColor: `#${this.state.backColorSection}`,
                borderWidth: 2,
                alignSelf: "stretch"
              }}
              value={this.state.backColorSection}
              onChangeText={backColorSection =>
                this.setState({ backColorSection })
              }
            />
          </View>
          {/**  task background color */}
          <View
            style={{
              width: "75%",
              height: "15%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "4%"
            }}
          >
            <View
              style={{
                position: "absolute",
                top: responsiveHeight(-2),
                left: responsiveWidth(5),
                backgroundColor: "white",
                paddingHorizontal: 10,
                zIndex: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: "Vazir-Medium-FD",
                  color: "black"
                }}
              >
                {"رنگ پس زمینه کارها"}
              </Text>
            </View>
            <TextInput
              keyboardType={"number-pad"}
              style={{
                flex: 1,
                textAlign: "center",
                borderRadius: 10,
                fontSize: responsiveFontSize(1),
                color: "black",
                backgroundColor: `#${this.state.todoColor}`,
                borderWidth: 2,
                alignSelf: "stretch"
              }}
              value={this.state.todoColor}
              onChangeText={todoColor => this.setState({ todoColor })}
            />
          </View>
          {/**  task background color */}
          <TouchableOpacity
            style={{
              width: "75%",
              height: "15%",
              justifyContent: "center",
              alignItems: "center",
              //   alignSelf: "center",
              marginTop: "4%",
              backgroundColor: "red",
              borderRadius: 10
            }}
            onPress={() => {
              let newData = [...this.props.data];
              newData.push({
                key: String(newData.length),
                headerColor: `#${this.state.headerColor}`,
                todoHeaderTitle: `${this.state.todoHeaderTitle}`,
                icon: require("../img/06.png"),
                backColorSection: `#${this.state.backColorSection}`,
                todoColor: `#${this.state.todoColor}`
              });
              this.props.dispatch({
                type: Actions.SetData,
                newdata: newData
              });
              // this.setGlobal({ data: newData }, () => {
              AsyncStorage.setItem(`data`, JSON.stringify(newData))
                .then(() => {
                  this.props.dispatch({
                    type: Actions.SetModal,
                    Setstate: false
                  });
                  this.setState({
                    headerColor: "",
                    todoHeaderTitle: "",
                    backColorSection: "",
                    todoColor: ""
                  });
                })
                .catch(error => alert(error));
              // });
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: "Vazir-Medium-FD",
                color: "black"
              }}
            >
              اضافه کردن
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  render() {
    return this.state.isloading ? (
      <Spinner />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          backgroundColor: "pink"
        }}
      >
        {this.AddModall()}
        {this.searchModeal()}

        <StatusBar />
        <FlatList
          ref={flatlist => {
            this.flatlist = flatlist;
          }}
          style={{
            flex: 1
          }}
          // refreshControl={
          //   <RefreshControl
          //     colors={["black", "green", "red", "yellow", "pink", "orange"]}
          //     refreshing={this.state.refresh}
          //     onRefresh={() => this.reload()}
          //   />
          // }
          data={this.props.data}
          numColumns={1}
          initialNumToRender={1}
          //   initialScrollIndex={this.global.data.length == 1 ? 0 : 1}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: Dimensions.get("screen").width,
                  height: Dimensions.get("screen").height,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  paddingVertical: responsiveHeight(7)
                }}
              >
                {item.key == "0" ? (
                  <Setting
                  // fnm={() => {
                  //   this.flatlist.scrollToIndex({
                  //     index: this.global.data.length - 1
                  //   });
                  // }}
                  />
                ) : (
                  <Home
                    ID={index}
                    title={item.todoHeaderTitle}
                    backColorSection={item.backColorSection}
                    headerColor={item.headerColor}
                    icon={item.icon}
                    // fnm={() => {
                    //   this.flatlist.scrollToIndex({
                    //     index: this.global.data.length - 1
                    //   });
                    // }}
                    todoColor={item.todoColor}
                  />
                )}
              </View>
            );
          }}
          keyExtractor={item => String(item.title)}
          horizontal
          pagingEnabled
        />
      </View>
    );
  }
}

const mapStateToProp = state => {
  return {
    data: state.Reducer.data,
    issearchModal: state.Reducer.issearchModal,
    ismodal: state.Reducer.ismodal
  };
};

export default connect(mapStateToProp)(Landing);
