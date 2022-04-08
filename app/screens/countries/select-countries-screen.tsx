import React, { FC, useState, useEffect  } from "react"
import { View, ViewStyle, TextStyle, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useQuery } from '@apollo/client';
import { Text } from "../../components"
import{ LIST_COUNTRIES } from '../../components/graph-ql/queries'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        fontSize: 18,
        height: 44,
        marginVertical: 8,
    },
    title: {
        fontSize: 16,
      },
});

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
export const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = (countryId) => {
      navigation.navigate("demo", {countryId})
    }

    // create a component that renders a select input for countries
    // I wanted to put this function in its own component, but I couldn't figure out 
    // how to make the callback to nextscreen
    function CountrySelect() {
      const [countries, setCountries] = useState([])
      const [selectedId, setSelectedId] = useState(null);
      const {data, loading, error} = useQuery(LIST_COUNTRIES);

      useEffect(() => {
          if (typeof(data) == "object") {
              setCountries(data.countries)
          }
      }, [data])

      if (loading || error) {
          return <Text>{error ? error.message : 'Loading...'}</Text>
      }

      const renderItem = ({ item }) => {
          const backgroundColor = item.code === selectedId ? "#6e3b6e" : "#f9c2ff";
          const color = item.cdode === selectedId ? 'white' : 'black';
      
          return (
            <Item
              item={item}
              onPress={() => {
                      setSelectedId(item.code);
                      nextScreen(item.code);
                  }}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
      }

      return (
          <FlatList
          data={countries}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          extraData={selectedId}
          />
      );
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.tiunTechnicalTest" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Select one country in the list below." />
          </Text>
          <CountrySelect/>
        </Screen>
      </View>
    )
  },
)
