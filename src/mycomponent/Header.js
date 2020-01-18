import React, { Component } from "reactn";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import { Mycolors } from "../global/Mycolors";
import { fonts } from "../global/Fonts";
import { Mytxt } from "../global/Mytxt";
import { connect } from "react-redux";
import * as Actions from "../actions/Actions";

class Header extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          height: responsiveHeight(11),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
          flexDirection: this.global.locale == "fa" ? "row" : "row-reverse"
        }}
      >
        {/* Search butoon */}
        <TouchableOpacity
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
          onPress={() =>
            this.props.dispatch({
              type: Actions.Setstate,
              Setstate: true
            })
          }
        >
          <Image
            style={{
              width: responsiveWidth(8),
              height: responsiveWidth(8),
              tintColor: Mycolors(this.global.local).last,
              transform: [
                {
                  rotateY: this.global.locale == "fa" ? "0deg" : "180deg"
                }
              ]
            }}
            source={require("../img/04.png")}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 8.5,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
        >
          <Text
            style={[
              fonts(this.global.locale).Black,
              {
                fontSize: responsiveFontSize(4),
                color: Mycolors(this.global.local).last,
                textAlign: "center"
              }
            ]}
          >
            {Mytxt(this.global.locale).headertxt}
          </Text>
        </View>
        {/* Add section */}
        <TouchableOpacity
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
          onPress={() => {
            /*   let newData = [...this.global.data];
            newData.push({
              key: String(this.global.data.length),
              headerColor: 'snow',
              todoHeaderTitle: 'Add New Section',
              icon: require('../img/06.png'),
              backColorSection: '#d89001'
            });
            this.setGlobal({ data: newData }, () => {
              AsyncStorage.setItem(`data`, JSON.stringify(newData))
                .then(() => {})
                .catch(error => alert(error));
            });
            */
            this.props.dispatch({
              type: Actions.SetModal,
              Setstate: true
            });
          }}
        >
          <Image
            style={{
              width: responsiveWidth(8),
              height: responsiveWidth(8),
              tintColor: Mycolors(this.global.local).last,
              transform: [
                {
                  rotateY: this.global.locale == "fa" ? "0deg" : "180deg"
                }
              ]
            }}
            source={require("../img/03.png")}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

//export { Header };

const mapStateToProp = state => {
  return {
    issearchModal: state.Reducer.issearchModal,
    ismodal: state.Reducer.ismodal
  };
};

export default connect(mapStateToProp)(Header);
