import BlogEditor from "./BlogEditor";
import Custom from "./Custom";
import MenuBar from "./MenuBar";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
function App() {

  return (
    <>
       <Tooltip id="my-tooltip" />
      <div className="card main-card">
          <BrowserRouter>
            <Routes>
              <Route path="/tiptap" element={<MenuBar/>} />
              <Route path="/" element={<BlogEditor/>} />
              <Route path="/custom" element={<Custom/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App;
