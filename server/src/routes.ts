import { Request, Response } from "express";


const fileContents: Map<String, String> = new Map<String, String>();

/**
 * Saves the name of a request and saves the contents of the request to that name
 * @param req refers to a title and contents to be saved together
 * @param res response which represents the response of the function which will be sent a "sucessfully saved" message
 * sends a response which is either an error message (if the title or contents of the request are undefined)
 * or a success message "successfully saved"
 */
export function save(req: Request, res: Response) {
  const name = first(req.query.name);
  const contents = req.body.content;
  if (name === undefined)  {
    res.status(400).send('missing name parameter');
    return;
  } else if (contents === undefined){
    res.status(400).send('missing contents parameter');
    return;
  } else{
    fileContents.set(name, contents);
    res.send("successfully saved");
  }
}

/**
 * loads the contents of a name of the contents passed in (if this name is defined and has been saved with contents previously)
 * @param req contains the name of the value passed in the request
 * @param res represents the response of the function that will be set to the contains the value of the contents saved within the title 
 * (if the title is defined and has been saved with contents previously)
 * sends a response which is either an error message (if the title of the request are undefined or the title 
 * was not previously saved with contents)
 * or a record containing the contents saved previously under a passed in name.
 */
export function load(req: Request, res: Response) {
  const name = first(req.query.name);
  if (name === undefined){
    res.status(400).send('missing "file" parameter');
    return;
  }
  if(fileContents.has(name) === false){
    res.send({content: null});
    return;
  }else{
    const s = fileContents.get(name);
    res.send({content: s});
  }
}

/**
 * list the names of the files previously saved
 * @param req contains the request passed into this method
 * @param res represents the response of the function that will be used to send back a record containing an array of values representing 
 * the names of files saved
 * sends a record containing an array of values that represent the names of files previously saved
 */
export function list(_req: Request, res: Response) {
    const arr = Array.from(fileContents.keys());
    arr.sort();
    res.send({arr: arr});
}

/**
 * Cleares all the saved files and their contents
 */
export function reset(){
  fileContents.clear();
}

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}
