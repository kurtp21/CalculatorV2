/**
 * A regression test for the Container Class 
 */

import {
    Container
} from './Container.js'

import {
    dataNode
} from './dataNode.js'

var passed = 0; 
var totalTests = 17; 

// Test 1: Create an instance of the Container Class 
var test1 = new Container();

if ((test1.getHead() === null) 
&& (test1.getCurr() === null)
&& (test1.getTail() === null) 
&& (test1.getNumItems() === 0)) {
    passed += 1;
    console.log("Test 1: Passed");
} else {
    console.log("Test 1: Failed");
}

// Testing the push method
var node1 = new dataNode("3 + 3", 6); 
var node2 = new dataNode("2 + 2", 4); 
var node3 = new dataNode("1 + 1", 2); 
var node4 = new dataNode("3 * 3", 9); 

test1.push(node1); 

if ((test1.getHead() === node1) 
&& (test1.getCurr() === node1)
&& (test1.getTail() === node1) 
&& (test1.getNumItems() === 1)) {
    passed += 1;
    console.log("Test 2: Passed");
} else {
    console.log("Test 2: Failed");
}

test1.push(node2); 

if ((test1.getHead() === node2) 
&& (test1.getCurr() === node2)
&& (test1.getTail() === node1) 
&& (test1.getNumItems() === 2)) {
    passed += 1;
    console.log("Test 3: Passed");
} else {
    console.log("Test 3: Failed");
}

test1.push(node3);
test1.push(node4); 

if ((test1.getHead() === node4) 
&& (test1.getCurr() === node4)
&& (test1.getTail() === node1) 
&& (test1.getNumItems() === 4)) {
    passed += 1;
    console.log("Test 4: Passed");
} else {
    console.log("Test 4: Failed");
}

// Testing the pop method
var removed1 = test1.pop(); 

if ((test1.getHead() === node3) 
&& (test1.getCurr() === node3)
&& (test1.getTail() === node1) 
&& (test1.getNumItems() === 3)
&& (removed1 === node4)) {
    passed += 1;
    console.log("Test 5: Passed");
} else {
    console.log("Test 5: Failed");
}

var removed2 = false; 

while (!test1.isEmpty()) {
    removed2 = test1.pop(); 
}

if (test1.isEmpty()) {
    passed += 1; 
    console.log("Test 6: Passed"); 
} else {
    console.log("Test 6: Failed"); 
}

if (removed2 === node1) {
    passed += 1; 
    console.log("Test 7: Passed"); 
} else {
    console.log("Test 7: Failed"); 
}

// Testing cursor movement
test1.push(node1);
test1.push(node2);
test1.push(node3);
test1.push(node4);

var result1 = test1.moveForward(); 

if (test1.getCurr() === node3) {
    passed += 1; 
    console.log("Test 8: Passed"); 
} else {
    console.log("Test 8: Failed"); 
}

if (result1 === true) {
    passed += 1; 
    console.log("Test 9: Passed"); 
} else {
    console.log("Test 9: Failed"); 
}

while (result1) {
    result1 = test1.moveForward();
}

if (test1.getCurr() === node1) {
    passed += 1; 
    console.log("Test 10: Passed"); 
} else {
    console.log("Test 10: Failed"); 
}

if (result1 === false) {
    passed += 1; 
    console.log("Test 11: Passed"); 
} else {
    console.log("Test 11: Failed"); 
}

var result2 = test1.moveBackward(); 

if (test1.getCurr() === node2) {
    passed += 1; 
    console.log("Test 12: Passed"); 
} else {
    console.log("Test 12: Failed"); 
}

if (result2 === true) {
    passed += 1; 
    console.log("Test 13: Passed"); 
} else {
    console.log("Test 13: Failed"); 
}

while (result2) {
    result2 = test1.moveBackward(); 
}

if (test1.getCurr() === node4) {
    passed += 1; 
    console.log("Test 14: Passed"); 
} else {
    console.log("Test 14: Failed"); 
}

if (result2 === false) {
    passed += 1; 
    console.log("Test 15: Passed"); 
} else {
    console.log("Test 15: Failed"); 
}

var result3 = test1.goToFront();
var result4 = test1.goToBack();

if ((result3 === false)
&& (result4 === true)
&& (test1.getCurr() === node1)) {
    passed += 1;
    console.log("Test 16: Passed");
} else {
    console.log("Test 16: Failed"); 
}

var result5 = test1.goToBack();
var result6 = test1.goToFront(); 

if ((result5 === false)
&& (result6 === true)
&& (test1.getCurr() === node4)) {
    passed += 1;
    console.log("Test 17: Passed");
} else {
    console.log("Test 17: Failed"); 
}

console.log(test1.getCurr().getAns()); 

console.log("Test passed: " + passed + "/" + totalTests);

