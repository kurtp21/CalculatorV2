/* 
The LIFO based doubly linked list, that will be used as the 
container of the math expressions that have been inputed by 
the user. 
*/
export class Container {
    #head;
    #curr;
    #tail; 
    #numItems; 

    /**
     * constructor(): Creates an instance of the Container class
     */
    constructor() {
        this.#head = null;
        this.#curr = null;
        this.#tail = null; 
        this.#numItems = 0; 
    }

    /**
     * setHead(data): Sets the head of the Container to a given dataNode
     * @param {*} data : A data node to be set as the head of the container 
     */
    setHead(data) {
        this.#head = data; 
    }

    /**
     * setTail(data) : Sets the tail of the Container to a given dataNode 
     * @param {*} data : A data node to be set as the tail of the container
     */
    setTail(data) {
        this.#tail = data; 
    }

    /**
     * setCurr(data) : Sets the pointer of the Container to the given dataNode 
     * @param {*} data : The dataNode to be pointed to by the curr
     */
    setCurr(data) {
        this.#curr = data; 
    }
    
    /**
     * getHead() : Gets the current head of the Container 
     * @returns : The current head of the Container 
     */
    getHead() {
        return this.#head; 
    }

    /**
     * getTail() : Gets the current tail of the Container 
     * @returns : The current tail of the Container
     */
    getTail() {
        return this.#tail; 
    }

    /**
     * getCurr() : Gets the dataNode that the pointer is pointing to 
     *              from the Container
     * @returns : The dataNode that the pointer is currently pointing to 
     */
    getCurr() {
        return this.#curr; 
    }

    /**
     * getNext() : Gets the dataNode that the current dataNode is pointing to 
     * @returns : The dataNode that the current dataNode is pointing to 
     */
    getNext() {
        if (this.getNumItems() <= 1) {
            return false; 
        } else {
            this.moveForward(); 
            let node = this.getCurr(); 
            this.goToFront(); 
            return node;
        }
    }

    /**
     * getNumItems() : Gets the total number of dataNodes stored in the Container
     * @returns : The number of dataNodes in the Container
     */
    getNumItems() {
        return this.#numItems; 
    }

    /**
     * isHead() : Checks if the pointer is currently pointing to the head 
     *              of the Container
     * @returns : true if curr is pointing to head, then false otherwise 
     */
    isHead() {
        return (this.#curr === this.#head); 
    }

    /**
     * isTail(): Checks if the pointer is currently pointing to the tail 
     *              of the Container
     * @returns : true if curr is pointing to tail, then false otherwise 
     */
    isTail() {
        return (this.#curr === this.#tail);
    }

    /**
     * isEmpty(): Checks if there is no dataNodes stored in the Container
     * @returns : true if the Container has no dataNodes store, then false otherwise 
     */
    isEmpty() {
        return (this.getNumItems() === 0); 
    }

    /**
     * push(data): Inserts a given dataNode to the top of the Containter stack 
     * @param {*} data : A dataNode to be pushed on the Container stack 
     */
    push(data) {
        if (this.isEmpty()) {   // Inserting to an empty stack
            this.setHead(data);
            this.setTail(data);
            this.setCurr(data);
            this.#numItems += 1; 
        } else {    // Inserting to stack with items 
            var prevNode = this.#head; 
            prevNode.setPrev(data);
            data.setNext(prevNode);

            this.setHead(data); 
            this.setCurr(data); 
            this.#numItems += 1; 
        }
    }

    /**
     * pop(data): Removes the given dataNode from the top of the Container stack 
     * @returns : The given dataNode that has been removed from the top of the 
     *              Container stack 
     */
    pop() {
        var node = this.#curr;  // A placeholder node
        
        if (this.isEmpty()) {   // Case 1: Stack is empty
            return null;
        } else if (this.#numItems === 1) {  // Case 2: Stack has only 1 item 
            this.setHead(null); 
            this.setTail(null);
            this.setCurr(null); 
            this.#numItems = 0 
        } else {    // Case 3: Stack has multiple items 
           var prevNode = this.#head; 
           var newHead = prevNode.getNext();

           prevNode.setNext(null); 
           newHead.setPrev(null); 

           this.setHead(newHead); 
           this.setCurr(newHead); 
           this.#numItems -= 1; 
        }

        return node; 
    }

    /**
     * moveForward(): Moves the curr pointer down the Container stack 
     * @returns : true if the execution was successfull, then false otherwise 
     */
    moveForward() {
        if (this.isEmpty() || this.isTail()) {
            return false; 
        } else {
            var currNode = this.getCurr();
            this.setCurr(currNode.getNext()); 
            return true; 
        }
    }

    /**
     * moveBackwards(): Moves the curr pointer up the Container stack 
     * @returns : true if the execution was successfull, then false otherwise 
     */
    moveBackward() {
        if (this.isEmpty() || this.isHead()) {
            return false; 
        } else {
            var currNode = this.getCurr(); 
            this.setCurr(currNode.getPrev()); 
            return true; 
        }
    }

    /**
     * goToFront(): Moves the curr pointer to the head of the Container
     * @returns : true if execution was successfull, then false otherwise
     */
    goToFront() {
        if (this.isEmpty() || this.isHead()) {
            return false; 
        } else {
            this.setCurr(this.getHead());
            return true; 
        }
    }

    /**
     * goToBack(): Moves the curr pointer to the tail of the Container 
     * @returns : true if execution was successfull, then false otherwise
     */
    goToBack() {
        if (this.isEmpty() || this.isTail()) {
            return false; 
        } else {
            this.setCurr(this.getTail()); 
            return true; 
        }
    }
}