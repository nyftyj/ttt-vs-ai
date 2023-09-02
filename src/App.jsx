import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import SignupScreen from './components/SignupScreen';
import PrivateRoutes from './components/PrivateRoutes';
import './index.css';

function App() {
    return (
        <div className='board-container'>
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<GameScreen />} path='/game' />
                    </Route>
                    <Route element={<SignupScreen />} path='/' />
                </Routes>
            </Router>
        </div>
    )
}

export default App;