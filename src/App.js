import './App.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home.js';
import About from './pages/about.js';
import Unknown from './pages/unknown.js';

function App() {
	return (
	<HashRouter>
		<Routes>
			<Route index path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<Unknown />} />
		</Routes>
	</HashRouter>		
  );
}

export default App;
