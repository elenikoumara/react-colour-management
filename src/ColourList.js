import React, { Component } from "react";
import ColourItems from "./ColourItems";
import "./ColourList.css";

class ColourList extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      colours: [],
      isEditing: false,
      editableColour: null
    };

    this.addColour = this.addColour.bind(this);
    this.deleteItem = this.deleteColour.bind(this);
    this.createColour = this.createColour.bind(this);
    this.colourUpdate = this.colourUpdate.bind(this);
  }

  /**
   * Add a new colour or replace an existing one if
   * the user is editing
   * 
   * @param {e} e The event
   */
  addColour(e) {
    if (
      this.textInput.current.value !== "" &&
      /^#[0-9A-F]{6}$/i.test(this.textInput.current.value)
    ) {
      if (!this.state.isEditing) {
        var newColour = this.createColour();

        this.setState(prevState => {
          return {
            colours: prevState.colours.concat(newColour)
          };
        });
      } else {
        var index = this.state.colours.findIndex(
          x => x.key === this.state.editableColour.key
        );
        this.setState({ isEditing: false });
        if (index === -1) {
          return;
        } else {
          this.setState({
            colours: [
              ...this.state.colours.slice(0, index),
              Object.assign({}, this.state.colours[index], {
                text: this.textInput.current.value
              }),
              ...this.state.colours.slice(index + 1)
            ]
          });
        }
      }

      this.textInput.current.value = "";
    } else {
      alert("please enter a valid HEX value");
    }

    e.preventDefault();
  }

  /**
   * Create a new colour
   */
  createColour() {
    return {
      text: this.textInput.current.value,
      key: Date.now()
    };
  }

  /**
   * Delete a colour
   * 
   * @param {key} key is the key parameter of the colour
   */
  deleteColour(key) {
    var filteredCoulors = this.state.colours.filter((colour) => {
      return colour.key !== key;
    });

    this.setState({
      colours: filteredCoulors
    });
    this.textInput.current.value = "";
  }

  /**
   * Preparation for colour update  
   * 
   * @param {item} item colour from colours[] table
   */
  colourUpdate(item) {
    this.textInput.current.value = item.text;
    this.setState({ editableColour: item });
    this.setState({ isEditing: true });
  }

  render() {
    return (
      <div className="ColourListMain">
        <div className="header">
          <form onSubmit={this.addColour}>
            <input ref={this.textInput} placeholder="Colour" />
            <button type="submit"> Submit Colour </button>
          </form>
        </div>
        <ColourItems
          entries={this.state.colours}
          delete={this.deleteColour.bind(this)}
          update={this.colourUpdate.bind(this)}
        />
      </div>
    );
  }
}

export default ColourList;
