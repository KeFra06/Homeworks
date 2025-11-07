import { useCallback, useState, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Graph } from './Graph';
import { Person, City } from './Node';
import './App.css';

function App() {
	const graph = useMemo(() => {
		const g = new Graph();

		const cali = new City('c1', 'Cali');
		const barranquilla = new City('c2', 'Barranquilla');
		const santaMarta = new City('c3', 'Santa Marta');
		g.addNode(cali);
		g.addNode(barranquilla);
		g.addNode(santaMarta);

		const kevin = new Person('p1', 'Kevin', 30);
		const jhonatan = new Person('p2', 'Jhonatan', 25);
		const sara = new Person('p3', 'Sara', 40);
		const jaime = new Person('p4', 'Jaime', 35);
		const valentina = new Person('p5', 'Valentina', 28);
		g.addNode(kevin);
		g.addNode(jhonatan);
		g.addNode(sara);
		g.addNode(jaime);
		g.addNode(valentina);

		g.addEdge(kevin, cali);
		g.addEdge(jhonatan, barranquilla);
		g.addEdge(sara, cali);
		g.addEdge(jaime, santaMarta);
		g.addEdge(valentina, barranquilla);

		kevin.city = cali.name;
		jhonatan.city = barranquilla.name;
		sara.city = cali.name;
		jaime.city = santaMarta.name;
		valentina.city = barranquilla.name;

		g.addEdge(kevin, jhonatan);
		g.addEdge(kevin, sara);
		g.addEdge(jhonatan, valentina);

		return g;
	}, []);

	const [selectedCity, setSelectedCity] = useState('');
	const [cityFilter, setCityFilter] = useState('');

	const getPeopleInCity = useCallback((cityName) => {
		if (!cityName) return [];
		return graph.nodes.filter(node => {
			if (node.type !== 'person') return false;
			if (node.city && node.city === cityName) return true;
			if (typeof graph.getAdjacencies === 'function' && typeof graph.getNodeById === 'function') {
				const adj = graph.getAdjacencies(node.id) || [];
				return adj.some(adjId => {
					const adjNode = graph.getNodeById(adjId);
					return adjNode && adjNode.type === 'city' && adjNode.name === cityName;
				});
			}
			return false;
		});
	}, [graph]);

	const cities = useMemo(() => graph.nodes.filter(node => node.type === 'city'), [graph]);
	const filteredCities = cities.filter(c => c.name.toLowerCase().includes(cityFilter.trim().toLowerCase()));
	const selectedPeople = selectedCity ? getPeopleInCity(selectedCity) : [];

	const graphData = useMemo(() => {
		const nodes = graph.nodes.map(node => {
			let label;
			if (node.type === 'city') {
				label = node.name;
			} else {
				label = `${node.name} (${node.age})`;
			}

			let group = node.type === 'city' ? 'city' : 'person';
			let val = node.type === 'person' ? 5 : 10;
			if (selectedCity) {
				if (node.type === 'city' && node.name === selectedCity) {
					group = 'selectedCity';
					val = 18;
				}
				if (node.type === 'person') {
					const livesInSelected = node.city ? node.city === selectedCity : getPeopleInCity(selectedCity).some(p => p.id === node.id);
					if (livesInSelected) {
						group = 'personInSelectedCity';
						val = 8;
					} else {
						group = 'otherPerson';
					}
				}
			}

			return {
				id: node.id,
				name: node.name,
				val,
				group,
				label,
			};
		});

		const links = [];
		const addedLinks = new Set();
		graph.nodes.forEach(node => {
			const targets = graph.getAdjacencies(node.id);
			targets.forEach(targetId => {
				const linkKey = [node.id, targetId].sort().join('-');
				if (!addedLinks.has(linkKey)) {
					links.push({ source: node.id, target: targetId });
					addedLinks.add(linkKey);
				}
			});
		});

		return { nodes, links };
	}, [graph, selectedCity, getPeopleInCity]);

	const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
		const label = node.label || '';
		const fontSize = 12 / globalScale;
		ctx.font = `${fontSize}px Sans-Serif`;
		const textWidth = ctx.measureText(label).width;
		const bckgDimensions = [textWidth + fontSize * 0.2, fontSize * 1.2];

		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		const radius = Math.sqrt(node.val);
		const labelY = node.y + radius + fontSize / 2 + 2;
		ctx.fillRect(node.x - bckgDimensions[0] / 2, labelY - bckgDimensions[1] / 2, ...bckgDimensions);

		let textColor = 'black';
		if (node.group === 'selectedCity') textColor = 'darkgreen';
		if (node.group === 'personInSelectedCity') textColor = 'blue';
		if (node.group === 'otherPerson') textColor = 'gray';

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = textColor;
		ctx.fillText(label, node.x, labelY);
	}, []);

	return (
		<div className="App">
			<h1>Challenge-16 -&gt; Grafo de ciudades y amigos</h1>

			<div className="filterContainer">
				<div className="filterSearch">
					<label>
						Buscar ciudad:&nbsp;
						<input
							type="text"
							value={cityFilter}
							onChange={(e) => setCityFilter(e.target.value)}
							placeholder="Escribe para filtrar"
						/>
					</label>
				</div>

				<div className="filterSelect">
					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}
					>
						<option value="">Selecciona una ciudad</option>
						{filteredCities.map(city => (
							<option key={city.id} value={city.name}>
								{city.name}
							</option>
						))}
					</select>
					<button className="btn" onClick={() => setSelectedCity('')}>
						Mostrar todas
					</button>
				</div>
			</div>

			{selectedCity && (
				<div className="peopleList">
					<h3>Personas en {selectedCity}:</h3>
					<ul>
						{selectedPeople.length > 0 ? (
							selectedPeople.map(person => (
								<li key={person.name}>
									{person.name} ({person.age})
								</li>
							))
						) : (
							<li>Ninguna persona vive aquí.</li>
						)}
					</ul>
				</div>
			)}

			<ForceGraph2D
				graphData={graphData}
				width={800}
				height={600}
				nodeLabel={null}
				nodeCanvasObject={nodeCanvasObject}
				nodeCanvasObjectMode={() => 'after'}
				nodeAutoColorBy="group"
				linkDirectionalArrowLength={3.5}
				linkDirectionalArrowRelPos={1}
			/>
		</div>
	);
}

export default App;