import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { save, list, load, reset } from './routes';




describe('routes', function() {


  // After you know what to do, feel free to delete this Dummy test
  it('save', function() {
    // Feel free to copy this test structure to start your own tests, but look at these
    // comments first to understand what's going on.
    // httpMocks lets us create mock Request and Response params to pass into our route functions

    //Test 1: when the name is undefined 
    const req3 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: undefined}, body: {content: 'Likes the color pink'}});
    const res3 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req3, res3);


    // check that the request was successful
    assert.strictEqual(res3._getStatusCode(), 400);

    reset();

    //Test 2: when the name is undefined 
    const req4 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: undefined}, body: {content: 'This should not work'}});
    const res4 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req4, res4);


    // check that the request was successful
    assert.strictEqual(res4._getStatusCode(), 400);

    reset();

    //Test 3: when the contents are undefined 
    const req5 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'error code?'}, body: {content: undefined}});
    const res5 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req5, res5);


    // check that the request was successful
    assert.strictEqual(res5._getStatusCode(), 400);

    reset();


    //Test 4: When the contents are undefined
    const req6 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'error code?'}, body: {content: undefined}});
    const res6 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req6, res6);


    // check that the request was successful
    assert.strictEqual(res6._getStatusCode(), 400);

    reset();

    //Test 5: when both the contents and the name are not undefined and name is a string

    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: {content: 'aaaaaa'}});
    const res1 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req1, res1);


    // check that the request was successful
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), 'successfully saved');

    reset();

    //Test 6: when name and contents aren't undefined and name is a string

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req2 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Mariana'}, body: {content: 'Likes the color pink'}});
    const res2 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req2, res2);


    // check that the request was successful
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), 'successfully saved');

    reset();

    //Test 7: when name is an array

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req7 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: ['Mariana', 'hi']}, body: {content: 'Likes the color pink'}});
    const res7 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req7, res7);


    // check that the request was successful
    assert.strictEqual(res7._getStatusCode(), 200);
    assert.deepEqual(res7._getData(), 'successfully saved');

    reset();

    //Test 8: when name is an array
    const req8 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: ['hello', 'hehe']}, body: {content: 'Likes the color pink'}});
    const res8 = httpMocks.createResponse();


    save(req8, res8);


    assert.strictEqual(res8._getStatusCode(), 200);
    assert.deepEqual(res8._getData(), 'successfully saved');

    reset();
    
    //Test 9: when name is not a string or array

    let num: number = 1;
    const req9 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: num}, body: {content: 'Likes the color pink'}});
    const res9 = httpMocks.createResponse();

    save(req9, res9);

    assert.strictEqual(res9._getStatusCode(), 400);

    reset();

    //Test 10: when name is not a string or array

    let num2: number = 100000;
    const req10 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: num2}, body: {content: 'Likes the color pink'}});
    const res10 = httpMocks.createResponse();

    save(req10, res10);

    assert.strictEqual(res10._getStatusCode(), 400);

    reset();


  });


    // After you know what to do, feel free to delete this Dummy test
  it('list', function() {
    //Test 1: List one thing

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: { content: 'aaaaaa'}});
       
    const res1 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    save(req1, res1);


    assert.strictEqual(res1._getStatusCode(), 200);


    const req2 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/list'});
       
    const res2 = httpMocks.createResponse();
    //save(req2, res2);
    list(req2, res2);


    // check that the request was successful
    assert.strictEqual(res2._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res2._getData(), {arr: ["Kevin"]});
    
    reset();

    //Test 2: List 2+ things

        // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req5 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: { content: 'aaaaaa'}});
       
    const res5 = httpMocks.createResponse();
    // const req2 = httpMocks.createRequest(
    //     {method: 'POST', url: '/api/list', query: {name: 'hi', contents: 'aaaaa'}});
    // const res2 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req5, res5);


    assert.strictEqual(res5._getStatusCode(), 200);

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req3 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'HII'}, body: { content: 'this should work'}});
       
    const res3 = httpMocks.createResponse();
    // const req2 = httpMocks.createRequest(
    //     {method: 'POST', url: '/api/list', query: {name: 'hi', contents: 'aaaaa'}});
    // const res2 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req3, res3);


    assert.strictEqual(res3._getStatusCode(), 200);


    const req4 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/list'});
       
    const res4 = httpMocks.createResponse();
    //save(req2, res2);
    list(req4, res4);


    // check that the request was successful
    assert.strictEqual(res4._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res4._getData(), {arr: ["HII", "Kevin"]});

    reset();

    //Test 3: list nothing

    const req6 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/list'});
       
    const res6 = httpMocks.createResponse();
    //save(req2, res2);
    list(req6, res6);


    // check that the request was successful
    assert.strictEqual(res6._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res6._getData(), {arr: []});

    reset();
    

  });


  it('load', function() {

    //Test 1: when name is undefined
    const req3 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: undefined}, body: {content: 'Likes the color pink'}});
    const res3 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req3, res3);


    // check that the request was successful
    assert.strictEqual(res3._getStatusCode(), 400);

        const req4 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load'});
       
    const res4 = httpMocks.createResponse();
    //save(req2, res2);
    load(req4, res4);


    // check that the request was successful
    assert.strictEqual(res4._getStatusCode(), 400);

    reset();

    //Test 2: when name is undefined

    const req5 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: undefined}, body: {content: 'Likes the color pink'}});
    const res5 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req5, res5);


    // check that the request was successful
    assert.strictEqual(res5._getStatusCode(), 400);

        const req6 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load'});
       
    const res6 = httpMocks.createResponse();
    //save(req2, res2);
    load(req6, res6);


    // check that the request was successful
    assert.strictEqual(res6._getStatusCode(), 400);

    reset();

    //Test 3: When the name wasn't saved

    // check that the request was successful

    const req8 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query:{name: 'hi'}});
       
    const res8 = httpMocks.createResponse();
    //save(req2, res2);
    load(req8, res8);


    // check that the request was successful
    assert.strictEqual(res8._getStatusCode(), 200);
    assert.deepEqual(res8._getData(), {content: null});

    reset();

    //Test 4: When the name wasn't saved

    // check that the request was successful

    const req9 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query:{name: 'helloooo'}});
       
    const res9 = httpMocks.createResponse();
    //save(req2, res2);
    load(req9, res9);


    // check that the request was successful
    assert.strictEqual(res9._getStatusCode(), 200);
    assert.deepEqual(res9._getData(), {content: null});

    reset();

    //Test 5: when name and contents are not not undefined

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: { content: 'aaaaaa'}});
       
    const res1 = httpMocks.createResponse();
    // const req2 = httpMocks.createRequest(
    //     {method: 'POST', url: '/api/list', query: {name: 'hi', contents: 'aaaaa'}});
    // const res2 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req1, res1);


    assert.strictEqual(res1._getStatusCode(), 200);


    const req2 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 'Kevin'}});
       
    const res2 = httpMocks.createResponse();
    //save(req2, res2);
    load(req2, res2);


    // check that the request was successful
  assert.strictEqual(res2._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res2._getData(), {content: "aaaaaa"});

    reset();

    //Test 6: when name and contents are not not undefined

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req10 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Legally Blond'}, body: { content: 'is a good movie'}});
       
    const res10 = httpMocks.createResponse();
    // const req2 = httpMocks.createRequest(
    //     {method: 'POST', url: '/api/list', query: {name: 'hi', contents: 'aaaaa'}});
    // const res2 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req10, res10);


    assert.strictEqual(res10._getStatusCode(), 200);


    const req11 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 'Legally Blond'}});
       
    const res11 = httpMocks.createResponse();
    //save(req2, res2);
    load(req11, res11);


    // check that the request was successful
    assert.strictEqual(res11._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res11._getData(), {content: "is a good movie"});
    reset();

    //Test 7: when name is an array

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req12 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: ['Legally Blond', 'Finding Nemo']}, body: { content: 'is a good movie'}});
       
    const res12 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req12, res12);


    assert.strictEqual(res12._getStatusCode(), 200);


    const req13 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 'Legally Blond'}});
       
    const res13 = httpMocks.createResponse();
    //save(req2, res2);
    load(req13, res13);


    // check that the request was successful
    assert.strictEqual(res13._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res13._getData(), {content: "is a good movie"});

    //Test 8: when name is an array test 2

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req14 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: ['Finding Nemo', 'Finding Dory']}, body: { content: 'is a good movie'}});
       
    const res14 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req14, res14);


    assert.strictEqual(res14._getStatusCode(), 200);


    const req15 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 'Finding Nemo'}});
       
    const res15 = httpMocks.createResponse();
    //save(req2, res2);
    load(req15, res15);


    // check that the request was successful
    assert.strictEqual(res15._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res15._getData(), {content: "is a good movie"});
    reset();

    //Test 9: when name is not a string or array

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req16 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 4}, body: { content: 'is a good movie'}});
       
    const res16 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req16, res16);


    assert.strictEqual(res16._getStatusCode(), 400);


    const req17 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 4}});
       
    const res17 = httpMocks.createResponse();
    //save(req2, res2);
    load(req17, res17);


    // check that the request was successful
    assert.strictEqual(res17._getStatusCode(), 400);

    //Test 11: when name is not a string or array

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req18 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 1000}, body: { content: 'is a good movie'}});
       
    const res18 = httpMocks.createResponse();


    // call our function to execute the request and fill in the response
    save(req18, res18);


    assert.strictEqual(res18._getStatusCode(), 400);


    const req19 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/load', query: {name: 4}});
       
    const res19 = httpMocks.createResponse();
    //save(req2, res2);
    load(req19, res19);


    // check that the request was successful
    assert.strictEqual(res19._getStatusCode(), 400);
    
  });

   it('reset', function() {
    //Test 1: Testing whether they delete the values previously saved

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: { content: 'aaaaaa'}});
       
    const res1 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    save(req1, res1);


    assert.strictEqual(res1._getStatusCode(), 200);

    reset();

    const req2 = httpMocks.createRequest(
    // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/list'});
       
    const res2 = httpMocks.createResponse();
    //save(req2, res2);
    list(req2, res2);


    // check that the request was successful
    assert.strictEqual(res2._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res2._getData(), {arr: []});

    //Test 2: Testing whether they delete the values previously saved

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req3 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Mariana'}, body: { content: 'aaaaaa'}});
       
    const res3 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    save(req3, res3);


    assert.strictEqual(res3._getStatusCode(), 200);

    const req4 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/save', query: {name: 'Mariana'}, body: { content: 'aaaaaa'}});
       
    const res4 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    save(req4, res4);


    assert.strictEqual(res4._getStatusCode(), 200);

    reset();

    const req5 = httpMocks.createRequest(
    // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'POST', url: '/api/list'});
       
    const res5 = httpMocks.createResponse();
    //save(req2, res2);
    list(req5, res5);


    // check that the request was successful
    assert.strictEqual(res5._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res5._getData(), {arr: []});
    
    
   });

  
});
