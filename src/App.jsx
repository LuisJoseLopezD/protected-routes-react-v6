import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import Home from './pages/Home';
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

// components
import ProtectedRoute from './components/ProtectedRoute';

function App() {

    const [user, setUser] = useState(null);

    const login = () => {
        //request done
        setUser({
            id: 1,
            name: "jhon",
            permission: ['admin']
        })
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <>
            {/* define varias rutas */}
            <BrowserRouter>
                <Navigation />

                {
                    user ?
                        <button onClick={logout}>logout</button>
                        :
                        <button onClick={login}>login</button>
                }

                <Routes>
                    <Route index element={<Landing />} />
                    <Route path="/landing" element={<Landing />} />

                    {/* proteger multiples rutas */}
                    <Route element={<ProtectedRoute user={user} />}>
                        {/* rutas protegidas */}
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    {/* proteger una ruta
                     <Route path="/home" element={
                        <ProtectedRoute user={user}>
                            <Home />
                        </ProtectedRoute>
                    } /> */}

                    <Route path="/admin" element={
                        <ProtectedRoute user={!!user && user.permission.includes('admin')}>
                            <Admin />
                        </ProtectedRoute>
                    } />

                </Routes>
            </BrowserRouter>
        </>
    )
}

function Navigation() {
    return <nav>
        <ul>
            <li>
                <Link to="/landing">Landing</Link>
            </li>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <Link to="/admin">Admin</Link>
            </li>
        </ul>
    </nav>
}

export default App;
