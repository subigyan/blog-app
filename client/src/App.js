import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Edit from "./pages/edit/Edit.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/search/Search";
import About from "./pages/About/About";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog/:id" element={<Single />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/about" element={<About />} />

                    {/* 
                    <Home />
                    <Single />
                    <Write /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
