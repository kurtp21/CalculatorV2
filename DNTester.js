/* 
A unit test for the dataNode structure.
*/

import {
    dataNode
 } from './dataNode.js';

var passed = 0;
var totalTests = 12; 

// Testing the creation of an object dataNode()
var test1 = new dataNode(null, null); 

if ((test1.getExp() === null) 
&& (test1.getAns() === null)
&& (test1.getNext() === null) 
&& (test1.getPrev() === null)) {
    passed += 1;
    console.log("Passed Test 1");
} else {
    console.log("Failed Test 1");
}

// Testing the setting of the expresion and answer values 
var test2 = new dataNode("(3 + 4) * 8", 56);

if ((test2.getExp() === "(3 + 4) * 8") 
&& (test2.getAns() === 56)){
    passed += 1;
    console.log("Passed Test 2");
} else {
    console.log("Failed Test 2");
}

// Testing setter methods
var test3 = new dataNode("4 + 4", 8); 

// Testing to see if next setter method works
test1.setNext(test2);
test2.setNext(test3); 

if ((test1.getNext() === test2) && (test2.getNext() === test3)) {
    passed += 1;
    console.log("Passed Test 3");
} else {
    console.log("Failed Test 3"); 
}

// Testing the exp and ans setter and getter methods
test1.setExp("3 * (4 - 2)");
test1.setAns(6);

if ((test1.getExp() === "3 * (4 - 2)")
&& (test1.getAns() === 6)) {
    passed += 1; 
    console.log("Passed Test 4");
} else {
    console.log("Failed Test 4");
}

// Testing to see if prev setter method works
test2.setPrev(test1);
test3.setPrev(test2); 

if ((test2.getPrev() === test1) && (test3.getPrev() === test2)) {
    passed += 1;
    console.log("Passed Test 5");
} else {
    console.log("Failed Test 5"); 
}

// Testing getter methods
if (test1.getNext() === test2) {
    passed += 1;
    console.log("Passed Test 6");
} else {
    consolde.log("Failed Test 6"); 
}

if ((test2.getPrev() === test1)
&& (test2.getNext() === test3)) {
    passed += 1; 
    console.log("Passed Test 7");
} else {
    console.log("Failed Test 7"); 
}

// Testing helper methods
if (test1.hasPrev() === false) {
    passed += 1;
    console.log("Passed Test 8");
} else {
    console.log("Failed Test 8");
}

if (test2.hasPrev() === true) {
    passed += 1;
    console.log("Passed Test 9");
} else {
    console.log("Failed Test 9");
}

if (test2.hasNext() === true) {
    passed += 1;
    console.log("Passed Test 10");
} else {
    console.log("Failed Test 10");
}

if (test1.hasNext() === true) {
    passed += 1;
    console.log("Passed Test 11");
} else {
    console.log("Failed Test 11");
}

if (test3.hasNext() === false) {
    passed += 1;
    console.log("Passed Test 12");
} else {
    console.log("Failed Test 12");
}

// Report how many tests have been passed
console.log("Test passed: " + passed + "/" + totalTests);
