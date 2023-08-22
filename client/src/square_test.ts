import * as assert from 'assert';
import { List, nil, cons} from './list';
import { solid, split, toJson, fromJson, Dir, getRoot, Square, replace} from './square';


describe('square', function() {

  it('getRoot', function() {
    const sb :Square= solid("blue");
    const sy :Square= solid("yellow");
    const sr :Square= solid("red");
    const s3 :Square= split(sb, sb, sb,sb);
    const s4 :Square= split(sb, s3, sb, sb);
    const s4b :Square= split(sb, sb, sb, sb);
    const s4c :Square= split(s4b, s4b, sb, sb);
    const s4d :Square= split(s4c, s4c, sb, sb);
    const s5 :Square= split(s4, s3, sb, sy);
    const s6 :Square= split(s5, s5, sb, sb);
    const s7 :Square= split(sr, sr, sr, sr);
    const s8 :Square= split(s7, sr, sr, sr);
    const s9 :Square= split(s8, s5, s8, s8);
    const s10 :Square= split(s9, s5, sr, sb);
    const s11 :Square= split(s9, s5, s9, sb);
    const s12 :Square= split(sr, sb, sr, sr);
    const s13 :Square= split(s12, s12, s12, s12);

    

    const path1 : List<Dir> = nil;
    const path2: List<Dir> = cons("NE", cons("NW", nil));
    const path2b: List<Dir> = cons("NE", cons("NE", cons("NE", nil)));
    const path3: List<Dir> = cons("NE", nil);
    const path4: List<Dir> = cons("NW", nil);
    const path4b: List<Dir> = cons("NW", cons("SE", nil));
    const path4c: List<Dir> = cons("NW", cons("NW", cons("NW", nil)));
    const path5: List<Dir> = cons("SW", nil);
    const path5b: List<Dir> = cons("SW", cons("SW", cons("SW", nil)));
    const path5c: List<Dir> = cons("SW", cons("SE", cons("SE", nil)));
    const path6: List<Dir> = cons("SE", nil);
    const path6b: List<Dir> = cons("SE", cons("NE", nil));
    const path6c: List<Dir> = cons("SE", cons("SW", nil));
    //tests first conditional (when 2nd param is nil)
    assert.deepEqual(getRoot(sb, path1), sb);
    //2nd test on first conditional (when second param is nil)
    assert.deepEqual(getRoot(sy, path1), sy);
    //tests second conditional (when 2nd param is not nil and the first param is solid)
    assert.throws(function () {
      getRoot(sb, path2);
    });
    //2nd test on second conditional (when second param is nil and the first param is solid)
    assert.throws(function () {
      getRoot(sy, path2);
    });

    //0, 1, many heuristsic, 1st case, 1 recurisive call
    assert.deepEqual(getRoot(s3, path4), solid("blue"));
    //0, 1, many heuristsic, 1st case, 1 recurisive call
    assert.deepEqual(getRoot(s4, path4), solid("blue"));

    //0, 1, many heuristsic, 1st case, 2+ recurisive call
    assert.deepEqual(getRoot(s5, path4b), solid("blue"));
    //0, 1, many heuristsic, 1st case, 2+ recurisive call
    assert.deepEqual(getRoot(s6, path4b), solid("yellow"));
    //0, 1, many heuristsic, 1st case, 2+ recurisive call
    assert.deepEqual(getRoot(s6, path4c), solid("blue"));

    //0, 1, many heuristsic, 2nd case, 1 recurisive call
    assert.deepEqual(getRoot(s3, path3), solid("blue"));
    //0, 1, many heuristsic, 2nd case, 1 recurisive call
    assert.deepEqual(getRoot(s4b, path3), solid("blue"));

    //0, 1, many heuristsic, 2nd case, 2+ recurisive calls
    assert.deepEqual(getRoot(s4d, path2b), solid("blue"));
    //0, 1, many heuristsic, 2nd case, 2+ recurisive calls
    assert.deepEqual(getRoot(s9, path2b), solid("blue"));
    
    //0, 1, many heuristsic, 3rd case, 1 recurisive call
    assert.deepEqual(getRoot(s10, path5), solid("red"));
    //0, 1, many heuristsic, 3rd case, 1 recurisive call
    assert.deepEqual(getRoot(s7, path5), solid("red"));
    
    //0, 1, many heuristsic, 3rd case, 2+ recurisive calls
    assert.deepEqual(getRoot(s11, path5b), solid("red"));
    //0, 1, many heuristsic, 3rd case, 2+ recurisive calls
    assert.deepEqual(getRoot(s11, path5c), solid("red"));

    //0, 1, many heuristsic, 4th case, 1 recurisive call
    assert.deepEqual(getRoot(s7, path6), solid("red"));
    //0, 1, many heuristsic, 4th case, 1 recurisive call
    assert.deepEqual(getRoot(s7, path6), solid("red"));
    
    //0, 1, many heuristsic, 4th case, 2+ recurisive calls
    assert.deepEqual(getRoot(s13, path6b), solid("blue"));
    //0, 1, many heuristsic, 4th case, 2+ recurisive calls
    assert.deepEqual(getRoot(s13, path6c), solid("red"));

  });

  it('replace', function() {
    const sb :Square= solid("blue");
    const sy :Square= solid("yellow");
    const sr :Square= solid("red");
    const s3 :Square= split(sb, sb, sb,sb);
    const s4 :Square= split(sb, s3, sb, sb);
    const s4b :Square= split(sb, sb, sb, sb);
    const s4c :Square= split(s4b, s4b, sb, sb);
    const s4d :Square= split(s4c, s4c, sb, sb);
    const s5 :Square= split(s4, s3, sb, sy);
    const s6 :Square= split(s5, s5, sb, sb);
    const s7 :Square= split(sr, sr, sr, sr);
    const s8 :Square= split(s7, sr, sr, sr);
    const s9 :Square= split(s8, s5, s8, s8);
    const s11 :Square= split(s9, s5, s9, sb);
    const s12 :Square= split(sr, sb, sr, sr);
    const s13 :Square= split(s12, s12, s12, s12);

    const path1 : List<Dir> = nil;
    const path2: List<Dir> = cons("NE", cons("NW", nil));
    const path2b: List<Dir> = cons("NE", cons("NE", cons("NE", nil)));
    const path2c: List<Dir> = cons("NE", cons("NE", cons("SE", nil)));
    const path3: List<Dir> = cons("NE", nil);
    const path4: List<Dir> = cons("NW", nil);
    const path4b: List<Dir> = cons("NW", cons("SE", nil));
    const path5: List<Dir> = cons("SW", nil);
    const path5b: List<Dir> = cons("SW", cons("SW", cons("SW", nil)));
    const path5c: List<Dir> = cons("SW", cons("SW", cons("SE", nil)));
    const path6: List<Dir> = cons("SE", nil);
    const path6b: List<Dir> = cons("SE", cons("SE", nil));
    const path6c: List<Dir> = cons("SE", cons("SW", nil));

    //tests first conditional (when 2nd param is nil)
    assert.deepEqual(replace(sb, path1, sb), sb);
    //2nd test on first conditional (when second param is nil)
    assert.deepEqual(replace(sy, path1, sy), sy);
    //tests second conditional (when 2nd param is not nil and the first param is solid)
    assert.throws(function () {
      replace(sb, path2, sb);
    });
    //2nd test on second conditional (when second param is nil and the first param is solid)
    assert.throws(function () {
      replace(sy, path2, sy);
    });

    

    //0, 1, many heuristsic, 1st case, 1 recurisive call
    assert.deepEqual(replace(s3, path4, sr), split(sr, sb, sb,sb));
    //0, 1, many heuristsic, 1st case, 1 recurisive call
    assert.deepEqual(replace(s3, path4, sy), split(sy, sb, sb,sb));

    //0, 1, many heuristsic, 1st case, 2+ recurisive call
    assert.deepEqual(replace(s5, path4b, sr), split(split(sb, s3, sb, sr), s3, sb, sy));
    //0, 1, many heuristsic, 1st case, 2+ recurisive call
    assert.deepEqual(replace(s6, path4b, sr), split(split(s4, s3, sb, sr), s5, sb, sb));

    //0, 1, many heuristsic, 2nd case, 1 recurisive call
    assert.deepEqual(replace(s3, path3, sr), split(sb, sr, sb,sb));
    //0, 1, many heuristsic, 2nd case, 1 recurisive call
    assert.deepEqual(replace(s3, path3, sy), split(sb, sy, sb,sb));

    //0, 1, many heuristsic, 2nd case, 2+ recurisive calls
    assert.deepEqual(replace(s4d, path2b, sr), split(s4c, split(s4b, split(sb, sr, sb, sb), sb, sb), sb, sb));
    //0, 1, many heuristsic, 2nd case, 2+ recurisive calls
    assert.deepEqual(replace(s4d, path2c, sr), split(s4c, split(s4b, split(sb, sb, sb, sr), sb, sb), sb, sb));

    //0, 1, many heuristsic, 3rd case, 1 recurisive call
    assert.deepEqual(replace(s3, path5, sr), split(sb, sb, sr,sb));
    //0, 1, many heuristsic, 3rd case, 1 recurisive call
    assert.deepEqual(replace(s3, path5, sy), split(sb, sb, sy,sb));

    //0, 1, many heuristsic, 3rd case, 2+ recurisive calls
    assert.deepEqual(replace(s11, path5b, sy), split(s9, s5, split(s8, s5, split(s7, sr, sy, sr), s8), sb));
    //0, 1, many heuristsic, 3rd case, 2+ recurisive calls
    assert.deepEqual(replace(s11, path5c, sy), split(s9, s5, split(s8, s5, split(s7, sr, sr, sy), s8), sb));

    //0, 1, many heuristsic, 4th case, 1 recurisive call
    assert.deepEqual(replace(s3, path6, sr), split(sb, sb, sb,sr));
    //0, 1, many heuristsic, 4th case, 1 recurisive call
    assert.deepEqual(replace(s3, path6, sy), split(sb, sb, sb,sy));

    //0, 1, many heuristsic, 4th case, 2+ recurisive calls
    assert.deepEqual(replace(s13, path6b, sy), split(s12, s12, s12, split(sr, sb, sr, sy)));
    //0, 1, many heuristsic, 4th case, 2+ recurisive calls
    assert.deepEqual(replace(s13, path6c, sb), split(s12, s12, s12, split(sr, sb, sb, sr)));

  });

  it('toJson', function() {
    assert.deepEqual(toJson(solid("white")), "white");
    assert.deepEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepEqual(fromJson("white"), solid("white"));
    assert.deepEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

});
