class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const cleanArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(cleanArray);
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.data) return node;
    return value < node.data ? this.find(value, node.left) : this.find(value, node.right);
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') throw new Error('Callback required');
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (typeof callback !== 'function') throw new Error('Callback required');
    if (!node) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (typeof callback !== 'function') throw new Error('Callback required');
    if (!node) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (typeof callback !== 'function') throw new Error('Callback required');
    if (!node) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value, node = this.root, depth = 0) {
    if (!node) return null;
    if (value === node.data) return depth;
    return value < node.data
      ? this.depth(value, node.left, depth + 1)
      : this.depth(value, node.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right));
    return heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = [];
    this.inOrder(node => values.push(node.data));
    this.root = this.buildTree(values);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function generateRandomArray(length = 15, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

const randomArray = generateRandomArray();
const tree = new Tree(randomArray);

console.log('Initial tree:');
prettyPrint(tree.root);
console.log('Is balanced:', tree.isBalanced());

console.log('Level Order:');
tree.levelOrder(node => console.log(node.data));
console.log('Pre Order:');
tree.preOrder(node => console.log(node.data));
console.log('Post Order:');
tree.postOrder(node => console.log(node.data));
console.log('In Order:');
tree.inOrder(node => console.log(node.data));

[110, 120, 130].forEach(num => tree.insert(num));
console.log('\nAfter unbalancing:');
prettyPrint(tree.root);
console.log('Is balanced:', tree.isBalanced());

tree.rebalance();
console.log('\nAfter rebalancing:');
prettyPrint(tree.root);
console.log('Is balanced:', tree.isBalanced());

console.log('Level Order:');
tree.levelOrder(node => console.log(node.data));
console.log('Pre Order:');
tree.preOrder(node => console.log(node.data));
console.log('Post Order:');
tree.postOrder(node => console.log(node.data));
console.log('In Order:');
tree.inOrder(node => console.log(node.data));
