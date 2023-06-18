/*
The multi data type node that will contain:
    - The math expression
    - The answer of the math expression
    - A forward pointer (for the doubly linked list)
    - A backwards pointer (for the doubly linked list)
*/
export class dataNode {
    constructor(exp, ans) {
        this.expresion = exp;
        this.answer = ans;
        this.next = null; 
        this.prev = null; 
    }

    setNext(newNode) {
        this.next = newNode; 
    }

    setPrev(newNode) {
        this.prev = newNode;
    }

    
}

