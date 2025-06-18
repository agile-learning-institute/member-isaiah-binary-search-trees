Balanced Binary Search Tree

This project is an implementation of a Balanced Binary Search Tree (BST) in JavaScript. It provides efficient insert, delete, find, and traversal operations with self-balancing capabilities.

Features

Node and Tree class-based architecture

Balanced tree construction from an array

Efficient insertion and deletion (O(log n))

Tree traversal methods: levelOrder, inOrder, preOrder, postOrder

Utility methods: height, depth, isBalanced, rebalance

Tree visualizer: prettyPrint

Unit tests with Jest

Usage

const { Tree, prettyPrint } = require('balanced-bst');

const tree = new Tree([1, 7, 4, 23, 8, 9]);
console.log('Is balanced?', tree.isBalanced());

prettyPrint(tree.root);

tree.insert(99);
tree.rebalance();

API Reference

Tree

new Tree(array) — builds a balanced BST from a sorted, deduplicated array

insert(value) — inserts a new value

deleteItem(value) — removes a value

find(value) — finds and returns the node with the given value

rebalance() — rebuilds the tree into a balanced form

isBalanced() — checks if the tree is balanced

height(node) — returns the height of a node

depth(value) — returns the depth of a node with that value

Traversals: inOrder(cb), preOrder(cb), postOrder(cb), levelOrder(cb) — all require a callback