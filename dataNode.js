/*
The multi data type node that will contain:
    - The math expression
    - The answer of the math expression
    - A forward pointer (for the doubly linked list)
    - A backwards pointer (for the doubly linked list)
*/
export class dataNode {
    #expresion;
    #answer;
    #next;
    #prev; 
    /**
     * constructor(exp, ans): Creates an instance of a doubly
     *      linked list node 
     * @param {*} exp : The expression of the math question 
     * @param {*} ans : The answer to the math expresion 
     */
    constructor(exp, ans) {
        this.#expresion = exp;
        this.#answer = ans;
        this.#next = null; 
        this.#prev = null; 
    }

    /**
     * setNext(newNode): Sets the nodes next pointer to the newNode 
     * @param {*} newNode: A new DL Node, that will be used to set the 
     *      current node's next pointer 
     */
    setNext(newNode) {
        this.#next = newNode; 
    }

    /**
     * setPrev(newNode): Sets the nodes prev pointer to the newNode 
     * @param {*} newNode: A new DL Node, that will be used to set the 
     *      current node's prev pointer 
     */
    setPrev(newNode) {
        this.#prev = newNode;
    }

    /**
     * setExp(newExp): Sets the nodes expression to a given expression 
     * @param {*} newExp: A new math expression
     */
    setExp(newExp) {
        this.#expresion = newExp; 
    }

    /**
     * setAns(newAns): Sets the nodes answer to a given answer
     * @param {*} newAns: A new math expression answer 
     */
    setAns(newAns) {
        this.#answer = newAns;
    }

    /**
     * getNext(): Gets the current node's next node ppointer 
     * @returns The current node's next node pointer, false 
     *      otherwise
     */
    getNext() {
        return this.#next;
    }

    /**
     * getPrev(): Gets the current node's prev node pointer 
     * @returns The current node's prev node pointer 
     */
    getPrev() {
        return this.#prev;
    }

    /**
     * getExp(): Gets the current node's math expression
     * @returns The current node's math expression
     */
    getExp() {
        return this.#expresion;
    }

    /**
     * getAns(): Gets the current node's math expression's answer
     * @returns The current node's math expression's answer
     */
    getAns() {
        return this.#answer;
    }

    /**
     * hasNext(): A helper method that will check if the current 
     *      node's next node pointer is pointing to a different node 
     * @returns true if current node's next node pointer is pointing 
     *      to a different node, false otherwise 
     */
    hasNext() {
        return (this.#next != null); 
    }

    /**
     * hasPrev(): A helper method that will check if the current 
     *      node's prev node pointer is pointing to a different node 
     * @returns true if the current node's prev node pointer is pointing 
     *      to a different node, false otherwise
     */
    hasPrev() {
        return (this.#prev != null); 
    }
}

