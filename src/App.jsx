import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
                    <Route element={<Navigate to='/game' replace />} path='*' />
                </Routes>
            </Router>
        </div>
    )
}

export default App;