const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinaryTreeElement {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  findLastProperDirectionNode (value, node) {
    const toTheRight = value > node.data;
    const nextNode = toTheRight
      ? node.right
      : node.left;
    if (!nextNode) {
      return node;
    }
    return this.findLastProperDirectionNode(value, nextNode)
  }

  add(value) {
    let newElement = new BinaryTreeElement(value);
    if (!this._root) {
      this._root = newElement;
      return;
    }
    const ourNode = this.findLastProperDirectionNode(value, this._root);
    console.log('ourNode', ourNode)
    const toTheRight = value > ourNode.data;
    if (toTheRight) {
      ourNode.right = newElement;
    } else {
      ourNode.left = newElement;
    }
    newElement.parent = ourNode;
  }

  findRec (value, node) {
    if (node.data === value) {
      return node
    }
    const toTheRight = value > node.data;
    const nextNode = toTheRight
      ? node.right
      : node.left;
    if (!nextNode) {
      return false;
    }
    return this.findRec(value, nextNode)
  }

  find (value) {
    let answer = this.findRec(value, this._root);
    if (!answer) {
      return null
    }
    return answer
  }

  has (value) {
    let answer = this.findRec (value, this._root);
    return Boolean(answer);
  }

  remove(value) {
    if (!this.has(value)) {
      return;
    }
    const currentNode = this.find(value);
    if (!currentNode) {
      return;
    }
    const parentNode = currentNode.parent;
    const leafs = [currentNode.left, currentNode.right].filter(Boolean);
    if (!currentNode.left && !currentNode.right) {
      if (parentNode && value > parentNode.data) {
        parentNode.right = null;
      } else {
        parentNode.left = null;
      }
      return;
    }
    if (leafs.length === 2) {
      let bubblingNode = currentNode.right;
      while (bubblingNode.left) {
        bubblingNode = bubblingNode.left || bubblingNode;
      }
      currentNode.data = bubblingNode.data;
      bubblingNode.parent.left = null;
      return;
    }
    if (parentNode) {
      parentNode.data = currentNode.data;
      parentNode.left = null;
      parentNode.right = null;
    }
  }

  min() {
    if (this._root === null){
      return null;
    }
    let bubblingNode = this._root;
    while (bubblingNode.left) {
      bubblingNode = bubblingNode.left || bubblingNode;
    }
    return bubblingNode.data;
  }

  max() {
    if (this._root === null){
      return null;
    }
    let bubblingNode = this._root;
    while (bubblingNode.right) {
      bubblingNode = bubblingNode.right || bubblingNode;
    }
    return bubblingNode.data;
  }
}



module.exports = {
  BinarySearchTree
 };