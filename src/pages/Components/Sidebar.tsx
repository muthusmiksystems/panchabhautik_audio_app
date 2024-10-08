import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar = (props:any) => {
  const navigation = useNavigation();

  const handlePage = (router:any) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(router);
  };

  const dataHelpInfo = [
    { id: 0, name: 'About', icon: 'dashboard', router: 'About' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.scrollViewContainer}>
        {dataHelpInfo.map((value, index) => (
          <TouchableOpacity
            key={value.id}
            onPress={() => handlePage(value.router)}
            style={styles.buttonContainer}
          >
            <Icon name={value.icon} size={22} color="#E5AA44" style={styles.icon} />
            <Text style={styles.buttonText}>{value.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#E5AA44',
  },
  icon: {
    marginRight: 10,
  },
});

export default Sidebar;
