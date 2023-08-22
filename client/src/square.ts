import { List, nil} from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";


export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

/**
 * Retrieves the square at the location specified
 * @param sqr Square which the target square will be found within
 * @param path Path is a specified path to the target square 
 * @requires sqr must be defined at the end of the path passed in
 * @error an Error is thrown when there is no square at the specified point by the path in the 
 * passed in square. The message reads "Couldn't find a square at this path".
 * @returns 
 * If there is a square at the point specified by the path:
 * A Square is returned representing the square at the point specified by the 
 * path in the Square passed in. 
 * If not:
 * An error is thrown
 */
export function getRoot(sqr: Square, path: Path): Square{
  if(path === nil){
    return sqr;
  }
  else if(sqr.kind === "solid"){
    throw new Error("Couldn't find a square at this path");
  }else{
    let dir = path.hd;
    if(dir === 'NW'){
      return getRoot(sqr.nw, path.tl);
    }else if(dir === 'NE'){
      return getRoot(sqr.ne, path.tl);
    }else if(dir === 'SW'){
      return getRoot(sqr.sw, path.tl);
    }else{
      return getRoot(sqr.se, path.tl);
    }  
  }  
}

/**
 * Replaces the square at the location specified by the path by a different 
 * specified square
 * @param sqr1 Square which the target square will be found within and replaced by 
 * another specified square
 * @param path Path is a specified path to the target square that is to be replaced
 * @param sqr2 Square that replaces the square at the end of the path in sqr1.
 * @requires sqr must be defined at the end of the path passed in
 * @error An Error is thrown when a square cannot be found at the end of the path within sqr1. 
 * The message reads: "Could not find a square at the end of this path"
 * @returns Sqr1 with the square at the end of the path replaced with the square passed in if the 
 * replaced square is found.
 */
export function replace(sqr1: Square, path: Path, sqr2: Square): Square{
  if(path === nil){
    return sqr2;
  }
  if(sqr1.kind === "solid"){
    throw new Error("Could not find a square at the end of this path");
  }else{
    let dir = path.hd;
    if(dir === 'NW'){
      return split(replace(sqr1.nw, path.tl, sqr2), sqr1.ne, sqr1.sw, sqr1.se);
    }else if(dir === 'NE'){
      return split(sqr1.nw, replace(sqr1.ne, path.tl, sqr2), sqr1.sw, sqr1.se);
    }else if(dir === 'SW'){
      return split(sqr1.nw, sqr1.ne, replace(sqr1.sw, path.tl, sqr2), sqr1.se);
    }else{
      return split(sqr1.nw, sqr1.ne, sqr1.sw, replace(sqr1.se, path.tl, sqr2));
    }  
  }
}




export function solid(color: Color): Square {
  return {kind: "solid", color: color};
}


export function split(nw: Square, ne: Square, sw: Square, se: Square): Square {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
}




/** Returns JSON describing the given Square. */
export function toJson(sq: Square): any {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
}


/** Converts a JSON description to the Square it describes. */
export function fromJson(data: any): Square {
  if (typeof data === 'string') {
    switch (data) {
      case "white": case "red": case "orange": case "yellow":
      case "green": case "blue": case "purple":
        return solid(data);


      default:
        throw new Error(`unknown color "${data}"`);
    }
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}




/** Indicates one of the four parts of a split. */
export type Dir = "NW" | "NE" | "SE" | "SW";


/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;


