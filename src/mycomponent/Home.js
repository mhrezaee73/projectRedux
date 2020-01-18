import React, { Component } from "reactn";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  AsyncStorage,
  Keyboard
} from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";

import { connect } from "react-redux";
import * as Actions from "../actions/Actions";

import { Spinner } from "../mycomponent";
import { Mytxt } from "../global/Mytxt";
import { Mycolors } from "../global/Mycolors";
import { Toast } from "./Toast";
import ImagePicker from "react-native-image-picker";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Mydo: [
        {
          text: "welcome",
          mark: true
        }
      ],
      txtdo: "",
      whichEditting: undefined,
      isloading: true,
      avatarSource: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("mythem")
      .then(mythem => {
        if (mythem) {
          let parsed = JSON.parse(mythem);

          this.setGlobal({
            locale: parsed.locale,
            local: parsed.local,
            search: ""
          });
        }
      })
      .catch(error => alert(error))
      .finally(this.setState({ isloading: false }));

    AsyncStorage.getItem(`Mydo-${this.props.ID}`)
      .then(Mydo => {
        let parsed = JSON.parse(Mydo);
        if (parsed) {
          this.setState({ Mydo: parsed });
        }
      })
      .catch(error => alert(error))
      .finally(this.setState({ isloading: false }));
  }

  search(query) {
    return this.state.Mydo.filter(item => item.text.includes(query));
  }

  render() {
    if (this.state.isloading) {
      return <Spinner />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            //borderColor: 'red',
            backgroundColor: this.props.backColorSection,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
        >
          {/* section view*/}
          <View
            style={{
              flex: 11,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch"
            }}
          >
            {/* haeder section view*/}
            <View
              style={{
                flex: 0.15,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                backgroundColor: this.props.headerColor,
                flexDirection:
                  this.global.locale == "fa" ? "row-reverse" : "row"
              }}
            >
              {/* delete section button*/}
              <TouchableOpacity
                style={{
                  flex: 1.5,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch"
                }}
                onPress={() => {
                  Alert.alert(
                    Mytxt(this.global.locale).deletetitle,
                    Mytxt(this.global.locale).deletemessage,
                    [
                      {
                        text: Mytxt(this.global.locale).deleteyes,
                        onPress: () => {
                          let newData = [...this.props.data];
                          newData.splice(this.props.ID, 1);
                          this.props.dispatch({
                            type: Actions.SetData,
                            newdata: newData
                          });
                          AsyncStorage.setItem(`data`, JSON.stringify(newData))
                            .then(() => {
                              //      this.props.fnm();
                            })
                            .catch(error => alert(error));
                        }
                      },
                      {
                        text: Mytxt(this.global.locale).deleteno,
                        onPress: () => {}
                      }
                    ],
                    {
                      cancelable: false
                    }
                  );
                }}
              >
                <Image
                  style={{
                    width: responsiveWidth(8),
                    height: responsiveWidth(8),
                    tintColor: Mycolors(this.global.local).light,
                    transform: [
                      {
                        rotateY: this.global.locale == "fa" ? "0deg" : "180deg"
                      }
                    ]
                  }}
                  source={require("../img/05.png")}
                />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 8,
                  textAlign: "center",
                  color: "black",
                  fontSize: responsiveFontSize(2)
                }}
              >
                {this.props.title}
              </Text>
              {/* select section icon */}
              <TouchableOpacity
                style={{
                  flex: 1.5,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch"
                }}
                onPress={() => {
                  const options = {
                    title: "Select Avatar",
                    storageOptions: {
                      skipBackup: true,
                      path: "images"
                    }
                  };

                  ImagePicker.showImagePicker(options, response => {
                    console.log("Response = ", response);

                    if (response.didCancel) {
                      console.log("User cancelled image picker");
                    } else if (response.error) {
                      console.log("ImagePicker Error: ", response.error);
                    } else if (response.customButton) {
                      console.log(
                        "User tapped custom button: ",
                        response.customButton
                      );
                    } else {
                      const source = { uri: `${response.uri}` };

                      this.setState({
                        avatarSource: source
                      });
                      let newData = [...this.global.data];
                      newData[this.props.ID].icon = this.state.avatarSource;
                      this.setGlobal({ data: newData }, () => {
                        AsyncStorage.setItem(`data`, JSON.stringify(newData))
                          .then(() => {})
                          .catch(error => alert(error));
                      });
                    }
                  });

                  Toast("Pick Profile Icon from Mobile", false);
                }}
              >
                <Image
                  style={{
                    width: responsiveWidth(8),
                    height: responsiveWidth(8),
                    tintColor: this.state.avatarSource
                      ? null
                      : Mycolors(this.global.local).light,

                    borderRadius: this.state.avatarSource ? 100 : 0,
                    transform: [
                      {
                        rotateY: this.global.locale == "fa" ? "0deg" : "180deg"
                      }
                    ]
                  }}
                  source={
                    this.state.avatarSource
                      ? this.state.avatarSource
                      : this.props.icon
                  }
                />
              </TouchableOpacity>
            </View>
            {/* flat list */}

            <FlatList
              ref={flatlist => {
                this.flatlist = flatlist;
              }}
              style={{
                flex: 1,
                alignSelf: "stretch",
                marginHorizontal: responsiveWidth(8)
              }}
              data={
                this.global.search
                  ? this.search(this.global.search)
                  : this.state.Mydo
              }
              numColumns={1}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      Width: "96%",
                      minHeight: responsiveHeight(10),
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: responsiveHeight(2),
                      backgroundColor: String(this.props.todoColor) || "pink",
                      flexDirection: "row",
                      borderWidth: 2,
                      borderRadius: 10
                      /**   transform: [
                        {
                          rotateX: `${this.global.rotdeg % 360}deg`
                        }
                      ] */
                    }}
                    onLongPress={() => {
                      Alert.alert(
                        Mytxt(this.global.locale).deletetitle,
                        Mytxt(this.global.locale).deletemessage,
                        [
                          {
                            text: Mytxt(this.global.locale).deleteyes,
                            onPress: () => {
                              let newData = [...this.state.Mydo];
                              newData.splice(index, 1);
                              this.setState({ Mydo: newData }, () => {
                                AsyncStorage.setItem(
                                  `Mydo-${this.props.ID}`,
                                  JSON.stringify(newData)
                                )
                                  .then(() => {})
                                  .catch(error => alert(error));
                              });
                            }
                          },
                          {
                            text: Mytxt(this.global.locale).deleteno,
                            onPress: () => {}
                          }
                        ],
                        {
                          cancelable: false
                        }
                      );
                    }}
                    onPress={() => {
                      let newData = [...this.state.Mydo];
                      item.mark = !item.mark;
                      this.setState({ Mydo: this.state.Mydo }, () => {
                        AsyncStorage.setItem(
                          `Mydo-${this.props.ID}`,
                          JSON.stringify(newData)
                        )
                          .then(() => {})
                          .catch(error => alert(error));
                      });
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onPress={() => {
                        this.setState({
                          txtdo: item.text,
                          whichEditting: index
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: responsiveFontSize(4),
                          fontWeight: "bold",
                          color: "black"
                        }}
                      >
                        ∴
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        flex: 8,
                        fontSize: responsiveFontSize(2),
                        textAlign: "center",
                        fontFamily: "Vazir-Medium-FD",
                        color: "black"
                      }}
                    >
                      {item.text}
                    </Text>

                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: responsiveWidth(3)
                        // backgroundColor: "yellow"
                      }}
                    >
                      {item.mark ? (
                        <Image
                          style={{
                            width: responsiveWidth(8),
                            height: responsiveWidth(8),
                            tintColor: "white"
                          }}
                          source={require("../img/02.png")}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => String(index)}
              onContentSizeChange={() => {
                this.flatlist.scrollToEnd();
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              alignSelf: "stretch",
              backgroundColor: Mycolors(this.global.local).light,
              marginTop: responsiveHeight(2),
              flexDirection: this.global.locale == "fa" ? "row" : "row-reverse",
              padding: responsiveWidth(2),
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10
            }}
          >
            {/* send button */}
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                borderRightColor: "black",
                borderRightWidth: this.global.locale == "fa" ? 2 : 0,
                borderLeftWidth: this.global.locale == "fa" ? 0 : 2,
                opacity: this.state.txtdo == "" ? 0.2 : 1
              }}
              disabled={this.state.txtdo == ""}
              onPress={() => {
                if (this.state.whichEditting !== undefined) {
                  let temp = [...this.state.Mydo];
                  temp[this.state.whichEditting].text = this.state.txtdo;
                  this.setState(
                    {
                      Mydo: temp,
                      txtdo: "",
                      whichEditting: undefined
                    },
                    () => {
                      AsyncStorage.setItem(
                        `Mydo-${this.props.ID}`,
                        JSON.stringify(temp)
                      )
                        .then(() => {})
                        .catch(error => alert(error));
                    }
                  );
                } else {
                  let temp = [...this.state.Mydo];
                  temp.push({
                    text: this.state.txtdo,
                    mark: false
                  });
                  this.setState({ Mydo: temp, txtdo: "" }, () => {
                    AsyncStorage.setItem(
                      `Mydo-${this.props.ID}`,
                      JSON.stringify(temp)
                    )
                      .then(() => {})
                      .catch(error => alert(error));
                  });
                }
                Keyboard.dismiss();
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(3),
                  fontWeight: "bold",
                  color: "#000000"
                }}
              >
                {this.state.whichEditting ? "✔" : "+"}
              </Text>
            </TouchableOpacity>
            {/* text input */}
            <View
              style={{
                flex: 8.5,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch"
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: responsiveFontSize(3),
                  alignSelf: "stretch",
                  fontFamily: "Vazir-Medium-FD",
                  color: "black"
                }}
                placeholder="تایپ کنید"
                value={this.state.txtdo}
                onChangeText={txtdo => this.setState({ txtdo })}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}
//export { Home };

const mapStateToProp = state => {
  return {
    data: state.Reducer.data
  };
};

export default connect(mapStateToProp)(Home);
