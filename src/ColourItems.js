import React, { Component } from "react";

class ColourItems extends Component {
  constructor(props) {
    super(props);

    this.createColours = this.createColours.bind(this);
  }

  /**
   * Call deleteColour function from ColourList component
   * 
   * @param {key} key the key of the colour
   */
  delete(key) {
    this.props.delete(key);
  }

  /**
   * Call colourUpdate function from ColourList component
   * 
   * @param {item} item colour
   */
  update(item) {
    this.props.update(item);
  }

  /**
   * Create a li colour element
   * 
   * @param {item} item a colour item
   */
  createColours(item) {
    const stylesObj = { background: item.text };

    return (
      <li style={stylesObj} key={item.key}>
        <div onClick={() => this.update(item)}>{item.text}</div>
        <button onClick={() => this.delete(item.key)} key={item.key}>
          x
        </button>
      </li>
    );
  }

  render() {
    var colourEntries = this.props.entries;
    var colourItems = colourEntries.map(this.createColours);

    return <ul className="theList">{colourItems}</ul>;
  }
}

export default ColourItems;
