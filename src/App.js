import { BrowserRouter, Routes, Route } from "react-router-dom";
import Libros from './component/Libros'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Libros></Libros>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
