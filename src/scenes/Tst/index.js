import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default class FAQs extends React.PureComponent {
  static MENU = [
    {
      title: 'Non Veg Biryanis',
      data: 'some data',
    },
    {
      title: 'Pizzas',
      data: 'soem data',
    },
  ]

  constructor (props) {
    super(props);
    this.state = {
      menu: FAQs.MENU,
      expandedList: FAQs.MENU.map(() => ({ expanded: false })),
      refresh: false,
    };
  }

  toggleExpand = (i) => {
    this.state.expandedList[i].expanded = !this.state.expandedList[i].expanded;
    this.setState({
      refresh: !this.state.refresh,
    });
  }

  render () {
    return (
      <View style={container}>
        <FlatList
          data={this.state.menu}
          extraData={this.state.refresh}
          renderItem={({ item, index }) =>
            <View style={card}>
              {console.log(item, index)}
              <TouchableOpacity onPress={() => this.toggleExpand(index)}>
                <View style={this.state.expanded ? cardHeaderBoxExpanded : cardHeaderBoxNotExpanded}>
                  <View style={headerBox}>
                    <Text style={cardHeader}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {this.state.expandedList[index].expanded &&
              <View style={cardTextBox}>
                <Text style={cardText}>
                  {item.data}
                </Text>
              </View>
              }
            </View>
          }
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}
