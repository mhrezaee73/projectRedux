import React, { Component } from "reactn";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  Dimensions
} from "react-native";
import { Mytxt } from "../global/Mytxt";
import { Mycolors } from "../global/Mycolors";
import { fonts } from "../global/Fonts";
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en",
      local: ""
    };
  }
  render() {
    return (
      <ImageBackground
        source={require("../img/551.jpg")}
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          padding: responsiveWidth(15),
          justifyContent: "center",
          alignItems: "center"
          //    alignSelf: "stretch"
        }}
        //   resizeMode="contain"
      >
        {/* language text view*/}
        <View
          style={{
            width: "100%",
            height: responsiveHeight(12),
            justifyContent: "center",
            alignItems: "center"
            //      backgroundColor: "red"
          }}
        >
          <Text
            style={[
              fonts(this.global.locale).Black,
              {
                fontSize: responsiveFontSize(3.5),
                color: Mycolors(this.global.local).medium,
                textAlign: "center",
                fontFamily: "Vazir-Bold-FD"
              }
            ]}
          >
            {Mytxt(this.global.locale).language}
          </Text>
        </View>
        {/* language button*/}
        <View
          style={{
            width: "100%",
            height: responsiveHeight(12),
            justifyContent: "center",
            alignItems: "center",
            //       backgroundColor: "yellow",
            padding: responsiveWidth(5),
            flexDirection: "row"
          }}
        >
          {/* english language button*/}
          <TouchableOpacity
            style={{
              minWidth: responsiveWidth(20),
              //   flex: 1.5,
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              backgroundColor:
                this.global.locale == "en"
                  ? Mycolors(this.global.local).light
                  : "transparent",

              borderWidth: 2,
              borderRadius: 15,
              margin: 10
            }}
            onPress={() => {
              this.setGlobal({ locale: "en" });
              this.setState({ locale: "en" });
            }}
          >
            <Text>English</Text>
          </TouchableOpacity>
          {/* farsi language button*/}
          <TouchableOpacity
            style={{
              minWidth: responsiveWidth(20),
              //    flex: 1.5,
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              backgroundColor:
                this.global.locale == "fa"
                  ? Mycolors(this.global.local).light
                  : "transparent",

              borderWidth: 2,
              borderRadius: 15,
              margin: 10
            }}
            onPress={() => {
              this.setGlobal({ locale: "fa" });
              this.setState({ locale: "fa" });
            }}
          >
            <Text>فارسی</Text>
          </TouchableOpacity>
        </View>
        {/* them (color) button*/}
        <View
          style={{
            width: "100%",
            height: responsiveHeight(16),
            justifyContent: "center",
            alignItems: "center",
            //   backgroundColor: "orange",
            padding: responsiveWidth(5),
            flexDirection: "row"
          }}
        >
          {/* red button*/}
          <TouchableOpacity
            style={{
              minWidth: responsiveWidth(20),
              //    flex: 1.5,
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              backgroundColor:
                this.state.local == "red"
                  ? Mycolors(this.state.local).light
                  : "transparent",
              margin: 10
            }}
            onPress={() => {
              this.setGlobal({ local: "red" });
              this.setState({ local: "red" });
            }}
          >
            <Text>{Mytxt(this.global.locale).redcolor}</Text>
          </TouchableOpacity>
          {/* green button*/}
          <TouchableOpacity
            style={{
              minWidth: responsiveWidth(20),
              //   flex: 1.5,
              height: responsiveHeight(8),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              backgroundColor:
                this.state.local == "green"
                  ? Mycolors(this.state.local).light
                  : "transparent",
              margin: 10
            }}
            onPress={() => {
              this.setGlobal({ local: "green" });
              this.setState({ local: "green" });
            }}
          >
            <Text>{Mytxt(this.global.locale).greencolor}</Text>
          </TouchableOpacity>
        </View>
        {/* confirm button*/}
        <View
          style={{
            width: responsiveWidth(45),
            height: responsiveWidth(14),
            justifyContent: "center",
            alignItems: "center"
            // marginRight: responsiveWidth(1)
            //   backgroundColor: "red"
            //alignSelf: "stretch"
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              backgroundColor: "#2155ff"
              // marginBottom: "2%",
              // marginHorizontal: "10%"
            }}
            onPress={() => {
              //     if (this.global.data.length == 1) {
              /**
                 let newData = [...this.global.data];
                newData.push({
                  key: String(this.global.data.length),
                  headerColor: 'snow',
                  todoHeaderTitle: 'Add New Section',
                  icon: require('../img/06.png'),
                  backColorSection: '#d89001'
                });
                this.setGlobal({ data: newData }, () => {
                  AsyncStorage.setItem(`data`, JSON.stringify(newData))
                    .then(() => {
                      this.props.fnm();
                    })
                    .catch(error => alert(error));
                }); */
              //     this.setGlobal({ ismodal: true });
              //    } else {
              var them = {
                locale: this.global.locale,
                local: this.global.local
              };
              AsyncStorage.setItem("mythem", JSON.stringify(them))
                .then(() => {})
                .catch(error => alert(error));
              //   this.props.fnm();
              //    }
            }}
          >
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                fontFamily: "Vazir-Medium-FD",
                color: "black"
              }}
            >
              {Mytxt(this.global.locale).confirm}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export { Setting };
