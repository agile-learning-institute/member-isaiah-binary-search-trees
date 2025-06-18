import { Tree } from '../member-isaiah-binary-search-trees/bst.js';

describe('Binary Search Tree', () => {
  let tree;

  beforeEach(() => {
    tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  });

  test('should build a balanced BST', () => {
    expect(tree.isBalanced()).toBe(true);
  });

  test('should insert a node', () => {
    tree.insert(99);
    expect(tree.find(99).data).toBe(99);
  });

  test('should delete a node', () => {
    tree.deleteItem(4);
    expect(tree.find(4)).toBe(null);
  });

  test('should find a node', () => {
    expect(tree.find(8).data).toBe(8);
  });

  test('should calculate height correctly', () => {
    const node = tree.find(23);
    const height = tree.height(node);
    expect(typeof height).toBe('number');
  });

  test('should calculate depth correctly', () => {
    const depth = tree.depth(23);
    expect(typeof depth).toBe('number');
  });

  test('should be able to rebalance', () => {
    [101, 105, 110].forEach(v => tree.insert(v));
    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  test('traversal methods should call callback', () => {
    const mockCallback = jest.fn();
    tree.inOrder(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
    tree.preOrder(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
    tree.postOrder(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
    tree.levelOrder(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  });
});
