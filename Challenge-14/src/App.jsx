import { useCallback, useState } from 'react';
import { BinaryTree } from './BinaryTree';
import Tree from 'react-d3-tree';
import './App.css';

const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [translate, containerRef];
};

function App() {
  const tree = new BinaryTree();
  const numbers = [5, 3, 7, 2, 4, 6, 8];
  numbers.forEach(num => tree.insert(num));

  console.log('InOrder:');
  tree.inOrder();
  console.log('PostOrder:');
  tree.postOrder();
  console.log('PreOrder:');
  tree.preOrder()

  const convertToD3 = (node) => {
    if (!node) return null;
    return {
      name: node.value.toString(),
      children: [
        convertToD3(node.left),
        convertToD3(node.right),
      ].filter(Boolean),
    };
  };

  const treeData = convertToD3(tree.root);
  const [translate, containerRef] = useCenteredTree();

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = parseInt(searchValue, 10);
    if (isNaN(value)) {
      setSearchResult('Ingresa un número válido.');
      return;
    }
    const exists = tree.contains(value);
    setSearchResult(exists ? `El valor ${value} existe en el árbol.` : `El valor ${value} NO existe en el árbol.`);
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <h2>Búsqueda en el Árbol Binario - Challenge 14</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ingresa un número para buscar"
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
        {searchResult && <p className="search-result">{searchResult}</p>}
      </div>
      <div id="treeWrapper" ref={containerRef} className="tree-wrapper">
        <Tree data={treeData} translate={translate} orientation="vertical" />
      </div>
    </div>
  );
}

export default App;