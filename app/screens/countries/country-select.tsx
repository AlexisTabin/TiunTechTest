import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from "react"
import { Text } from "../../components"
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import{ LIST_COUNTRIES } from '../../components/graph-ql/queries'
import{ client } from '../../components/graph-ql/client'

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

// create a component that renders a select input for coutries
export function CountrySelect() {
    const [countries, setCountries] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

    useEffect(() => {
        if (typeof(data) == "object") {
            console.log(data.countries[0].name)
            setCountries(data.countries)
            console.log("countries :")
            console.log(countries)
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
            onPress={() => setSelectedId(item.code)}
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
  