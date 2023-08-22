import React, { Component, ChangeEvent} from "react";
import { Square, Path, split, getRoot, replace,fromJson } from './square';
import { SquareElem } from "./square_draw";
import {nil,rev} from "./list"

interface EditorProps {
  /** Initial state of the file. */
  initialState: Square;

  /** the name of the current file */
  fileName: string;

  /** saves the name and contents of a file */
  onSave: (sqr: Square, fileName: string) => void;

  /** returns back to a default state */
  onBack: () => void
}


interface EditorState {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;  

  /** Whether or not the a square is selected */
  isSelected: boolean;
}

//Creates an Editor object with an initial state, path to a square clicked on, and whether a 
//square is clicked on or not. Extends the Component class with the EditorProps and EditorState interfaces
export class Editor extends Component<EditorProps, EditorState> {
  //creates an Editor object using the initial state, path to a square clicked on, and whether a 
//square is clicked on or not
  constructor(props: any) {
    super(props);
    
    this.state = { root: props.initialState, isSelected: false};
  }

  //sets the state of the editor and returns a JSX element representing 
  //the displayed values
  render = (): JSX.Element => {
    // TODO: add some editing tools here
    if(this.state.isSelected === true){
      return (
      <div>
        <SquareElem width={600} height={600}
                        square={this.state.root} selected={this.state.selected}
                        onClick={this.handleClick}></SquareElem>
        <h2>Tools:</h2>
        <button onClick={() => this.props.onSave(this.state.root, this.props.fileName)}>save</button>
        <button onClick={() => this.props.onBack()}>back</button>
        <select onChange ={this.handleColorChange}>
          <option value="select">Select Color</option>,
          <option value="yellow">yellow</option>,
          <option value="white">white</option>,
          <option value="red">red</option>,
          <option value="orange">orange</option>,
          <option value="green">green</option>,
          <option value="blue">blue</option>,
          <option value="purple">purple</option>
        </select>
        <button onClick={this.handleSplit}>split</button>
        <button onClick={this.handleMerge}>merge</button>
      </div>);
    }else{
      return(
        <div>
          <SquareElem width={600} height={600}
                    square={this.state.root} selected={this.state.selected}
                    onClick={this.handleClick}></SquareElem>
          <h2>Tools:</h2>
          <button onClick={() => this.props.onSave(this.state.root, this.props.fileName)}>save</button>
          <button onClick={() => this.props.onBack()}>back</button>
        </div>
      );
    }
    
  };

  //handles the response to a click
  //takes in a parameter path of type Path which is used to set the state of 
  //path to the square clicked on
  handleClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    this.setState({
      selected: path,
      isSelected: true
    });
  }

  //Splits the current square into 4 new squares
  //throws a console error when there is no square currently selected and changes the state of the 
  //current square and the current path to that square
  handleSplit = (): void => {
    if(this.state.selected === undefined){
      console.error("There is no path to the square currently clicked on");
      return;
    }
    let sqr: Square = getRoot(this.state.root, this.state.selected);
    sqr = split(sqr, sqr, sqr, sqr);
    this.setState({
      root: replace(this.state.root, this.state.selected, sqr),
      isSelected: false
    });
  };

  //Merges the current square with the other 3 squares surrounding which 
  //all form one larger square 
  //a console error is thrown if a square cannot be merged because it is not split
  //or if there is no square clicked on
  handleMerge = (): void => {
    if(this.state.selected === undefined){
      console.error("There is no path to the square currently clicked on");
      return;
    }
    let sqr = getRoot(this.state.root, this.state.selected);
    let p : Path = rev(this.state.selected);
    if(p=== nil){
      console.error("Cannot merge this square");
      return;
    }
    p = p.tl;
    p = rev(p);
    this.setState({root: replace(this.state.root, p, sqr), isSelected: false});
  };

  //changes the color of the square
  //takes in a parameter ChangeEvent<HTMLSelectElement> evt which is used to set the current color of the square
  //throws a console error if there is no square selected or if there is an invalid selection
  handleColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => { // TODO: you may want to add parameter(s)
    if(this.state.selected === undefined){
      console.error("There is no path to the square currently clicked on");
      return;
    }
    if(evt.target.value === "select"){
      console.error("Your have not selected a color");
      return;
    }
    let rep: Square = fromJson(evt.target.value);
    this.setState({root: replace(this.state.root, this.state.selected, rep), isSelected: false});
  };
}