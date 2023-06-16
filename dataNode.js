/*
The multi data type node that will contain:
    - The math expression
    - The answer of the math expression
    - A forward pointer (for the doubly linked list)
    - A backwards pointer (for the doubly linked list)
*/
export function dataNode() {
    this.expresion = null;
    this.answer = null;
    this.fwd = null;
    this.prev = null; 
}

