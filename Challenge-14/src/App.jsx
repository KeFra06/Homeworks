import { NaryTree, TreeNode } from './NaryTree';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Leagues from './pages/Leagues.jsx';
import PremierLeague from './pages/PremierLeague.jsx';
import LaLiga from './pages/LaLiga.jsx';
import Teams from './pages/Teams.jsx';
import ManchesterUnited from './pages/ManchesterUnited.jsx';
import RealMadrid from './pages/RealMadrid.jsx';
import Matches from './pages/Matches.jsx';
import './App.css';

function MenuItem({ node }) {
  if (!node || !node.value) return null;
  return (
    <li>
      <Link to={node.value.link}>{node.value.title}</Link>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <MenuItem key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function App() {
  const tree = new NaryTree();

  const home = new TreeNode({ title: 'Home', link: '/', component: Home });
  const leagues = new TreeNode({ title: 'Leagues', link: '/leagues', component: Leagues });
  const premierLeague = new TreeNode({ title: 'Premier League', link: '/leagues/premier', component: PremierLeague });
  const laLiga = new TreeNode({ title: 'La Liga', link: '/leagues/laliga', component: LaLiga });
  const teams = new TreeNode({ title: 'Teams', link: '/teams', component: Teams });
  const manchesterUnited = new TreeNode({ title: 'Manchester United', link: '/teams/manutd', component: ManchesterUnited });
  const realMadrid = new TreeNode({ title: 'Real Madrid', link: '/teams/realmadrid', component: RealMadrid });
  const matches = new TreeNode({ title: 'Matches', link: '/matches', component: Matches });

  leagues.addChild(premierLeague);
  leagues.addChild(laLiga);
  teams.addChild(manchesterUnited);
  teams.addChild(realMadrid);

  tree.root.addChild(home);
  tree.root.addChild(leagues);
  tree.root.addChild(teams);
  tree.root.addChild(matches);

  console.log('DFS:');
  tree.dfs();
  console.log('BFS:');
  tree.bfs();

  return (
    <Router>
      <div className="app-container">
        <div className="sidebar">
          <h2>Menu</h2>
          <ul>
            {tree.root.children.map((child, index) => (
              <MenuItem key={index} node={child} />
            ))}
          </ul>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/leagues/premier" element={<PremierLeague />} />
            <Route path="/leagues/laliga" element={<LaLiga />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/manutd" element={<ManchesterUnited />} />
            <Route path="/teams/realmadrid" element={<RealMadrid />} />
            <Route path="/matches" element={<Matches />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;