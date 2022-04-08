import React, { FC, useState, useEffect } from "react"
import {  TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Text,
  Screen,
  GradientBackground,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import{ COUNTRY } from '../../components/graph-ql/queries'
import { useQuery } from '@apollo/client';
import { TITLE, TITLE_WRAPPER } from "../welcome/welcome-screen"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ route, navigation }) => {
    const goBack = () => navigation.goBack()
    const {countryId} = route.params;


    const {data, error, loading} = useQuery(COUNTRY, {variables : {countryCode : countryId}});
    function CountryDescription() {
      const [country, setCountry] = useState({name : "default name", languages : ["default languages"], capital : "default capital", currency : "default currency", code : "default code"})
      const [languages, setLanguages] = useState([{code : "default lang code", name : "default lang name", native : "default lang native"}])
      useEffect(() => {
          if (typeof(data) == "object") {
              setCountry(data.country)
              setLanguages(data.country.languages)
              console.log("country")
              console.log(data.country)
              console.log("languages")
              console.log(data.country.languages)

          }
      }, [data])

      if (loading || error) {
          return <Text>{error ? error.message : 'Loading...'}</Text>
      }

      
      return (
            <View>
                <Text style={TITLE_WRAPPER}>
                  <Text style={TITLE} text={country.name} />
                </Text>
                <Text>Capital : <Text text={country.capital} /></Text>
                <Text>Code : <Text text={country.code} /></Text>
                <Text>Currency : <Text text={country.currency} /></Text>
                <Text>Language Code : <Text text={languages[0].code} /></Text>
                <Text>Language Name : <Text text={languages[0].name} /></Text>
                <Text>Language Native : <Text text={languages[0].native} /></Text>
            </View>
      )
    }

    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx={"demoScreen.howTo"}
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <CountryDescription></CountryDescription>
        </Screen>
      </View>
    )
  },
)
