import React, { Component, ChangeEvent, MouseEvent } from "react";
import { solid, Square, toJson, fromJson } from './square';
import {Editor} from './editor';

//Represents a generic state state of an app in terms of the screen it is on, 
//the files that have been previously saved, the current file, and that files 
//corresponding square
interface AppState {
  saveScreen: boolean;
  newFile: string;
  newSquare: Square;
  files: string[];
}

//Represents the state of the app in terms of the screen it is on, 
//the files that have been previously saved, the current file, and that files 
//corresponding square by extending the AppState interface through the Component class
export class App extends Component<{}, AppState> {

  //creates an App object by setting the state of the screen it is on, 
//the files that have been previously saved, the current file, and that files 
//corresponding square
  constructor(props: any) {
    super(props);

    this.state = {
      newSquare: solid("yellow"),
      files :[],
      saveScreen : true,
      newFile : "",
   };
    // const url = "/api/list";
    // fetch(url, {method: 'GET'})
    // .then(this.handleListResponse)
    // .catch((res) => this.handleServerError(res, "list"));

  }

  //fetches the list of files to display on the screen
  componentDidMount = () => {
    this.fetchList();
  };
  
  //sets the state of the object and returns a JSX element representing 
  //the displayed values
  render = (): JSX.Element => {
    // If they wanted this square, then we're done!
    //const sq = split(solid("blue"), solid("orange"), solid("purple"), solid("red"));
    if(this.state.saveScreen === true){ 
      const files: JSX.Element[] = [];
    let i : number= 0;
    //used to make every file in this.state.files into a link
    //let j be be the index of file in this.state.files. 0 <=j<=m-1 where m is the length of this.state.files
    for(let file of this.state.files){
      //const sqr = this.state.files.get(file)
      files.push(
        <li key = {i}>
          <a href="#" onClick={(event) => this.handleLoad(event, file)}>{file}</a>
        </li>
      );
      i = i+1;
    }   
      return (<div>
        <h2>Files:</h2>
          <ul>{files}</ul>
        <p>Name: 
          <input type="text" value={this.state.newFile} onChange={this.setNewFile}></input>
          <button onClick = {this.create}>Create</button>
        </p>
      </div>);
    }else{   
      return <Editor initialState={this.state.newSquare} fileName={this.state.newFile} onSave = {this.handleSave} onBack={this.handleBack}/>
    }
  };

  //takes in an inputted value and sets the state of the current 
  //file name to that value
  setNewFile = (evt: ChangeEvent<HTMLInputElement>): void =>{
    this.setState({newFile: evt.target.value});
  }

  //takes in a button click and changes the screen to be set to a different one
  //throws an error if another file already has this name or if the current file is an empty string
  create = (_: MouseEvent<HTMLButtonElement>): void =>{
    if(this.state.newFile === ""){
      console.error("Cannot create a file with no name");
      return;
    }
    const currFile = this.state.newFile;
    const fileTemp : string[] = this.state.files.slice(0);
    fileTemp.push(currFile);
    let found: boolean = false;
    let i: number = 0;
    //used to find whether there is already a file with the current name already saved
    //if m is the length of fileTemp, then 0<=i <= m-2 is true throughout the loop
    while(i <= fileTemp.length-2){
      if(fileTemp[i] === currFile){
        found = true;
      }
      i = i +1;
    }
    if(found === true){
      console.error("Already a file with this name in the list");
      return;
    }else{
      this.setState({saveScreen: false});  
    }
  }

  //resets the screen, current file name, and current square, to the default
  handleBack = (): void =>{
    this.setState({saveScreen: true, newFile: "", newSquare: solid("yellow")});
  }

  //Takes in a sqr square and a fileName string and saves that name to the list of saved names.
  //Saves that Square and name to the server 
  handleSave = (sqr: Square, fileName : string): void => {
     const url = "/api/save?name=" + encodeURIComponent(fileName);
    fetch(url, {method: 'POST', body: JSON.stringify({content: JSON.stringify(toJson(sqr))}), headers: {'Content-Type': 'application/json'}})
    .then(this.handleSaveResponse)
    .catch((res) => this.handleServerError(res, "save"));
    this.fetchList();

    const fileTemp : string[] = this.state.files.slice(0);
    fileTemp.push(fileName);
    
    
    this.setState({files: fileTemp});
    
  };

  //Loads the contents of a name by changing the state of the screen, fileName, and the contents of the file
  //Takes in a event which is a React.MouseEvent<HTMLAnchorElement> and a fileName which is a string as parameters
  //event which is a React.MouseEvent<HTMLAnchorElement> is used to prevent the default event 
  //and the string fileName is used to fetch the contents saved under that fileName from the server to 
  //load onto the screen
  handleLoad = (event: React.MouseEvent<HTMLAnchorElement>, fileName : string): void => {
    event.preventDefault();
    //console.log(this.state.files[0]);
    
    
    const url = "/api/load?name=" + encodeURIComponent(fileName);
    fetch(url).then((val) => {
      if (val.status == 200) {
        return val.json();
      }else{
        this.handleServerError(val, "load");
        return;
      }
    }).then((val) => {
      // error handling
      
      
      // if (!val.content) {
      //   console.log("content is undefined");
      //   this.setState({
      //     newSquare: solid("blue"),
      //     saveScreen: false
      //   });
      // }
      this.handleLoadResponse(val.content, fileName);
      return;
    }).catch((res) => this.handleServerError(res, "load"));
  };

  //Loads the contents of a name by changing the state of the screen, fileName, and the contents of the file
  //takes in a res which is used to set the square of the current file
  //takes in a string filName which is used to set the name of the current file
  handleLoadResponse = (res : any, fileName: string): void => {
    const loadSquare : Square = fromJson(JSON.parse(res));
    this.setState({
      newFile: fileName,
      newSquare : loadSquare,
      saveScreen: false
    });
  }
  
  //fetches the list saved in the server  
  fetchList = (): void => {
    const url = "/api/list";
    fetch(url, {method: 'GET'})
    .then((res) => this.handleList(res))
    .catch((res) => this.handleServerError(res, "list"));
  }

  //handles whether the list that was fetched was found properly by taking in a res 
  //representing the response to fetching the list in the server
  handleList = (res: Response): void => {
    //console.log(this.state.files[0]);
    if(res.status === 200){
      res.json().then((res)=>this.handleListResponse(res)).catch((res)=>this.handleServerError(res, "list"));
    }else{
      this.handleServerError(res, "list");
    }
  };

  //handles whether the list that was fetched is the correct type and then sets the state of the current 
  //list of files to the parameter res.
  //res parameter (any type) represents the values that will be set as the current list of files.  
  //an error is thrown in the console if the res passed in is not an array. the message reads "was not an array".
  handleListResponse = (res: any): void => {
    if(!Array.isArray(res.arr)){
      console.error("was not an array");
      return;
    }
    
    const filesTemp : string[]= res.arr.slice(0);
    this.setState({
      files : filesTemp
    });
  };

  //handles whether the response to saving a file in the server was done properly.
  //a message "value properly saved!" will be printed in the console if it was
  handleSaveResponse = (res: Response) => {
    if(res.status === 200){
      console.log("value properly saved!");
    }else{
      this.handleServerError(res, "response");
    }
  };

  //throws a console error with the message "unknown error talking to server"
  handleServerError = (_: Response, str : string) => {
    console.log(str);
    console.error('unknown error talking to server');
  };


}