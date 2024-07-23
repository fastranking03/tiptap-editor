import BlogEditor from "./BlogEditor";
import Custom from "./Custom";
import MenuBar from "./MenuBar";
import { BrowserRouter , Routes , Route } from "react-router-dom";

function App() {

  return (
    <>
      <div className="card main-card">
          <BrowserRouter>
            <Routes>
              <Route path="/tiptap" element={<MenuBar/>} />
              <Route path="/blog-editor" element={<BlogEditor/>} />
              <Route path="/custom" element={<Custom/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
