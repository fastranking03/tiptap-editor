import { useState } from "react";
import { IoSearch } from "react-icons/io5";
 

function SearchComp() {
  const [toggle, setToggle] = useState(false);
 
 

  return (
    <div className="position-relative">
      <button
        className="bg-none"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Search"
        onClick={() => setToggle(!toggle)}
      >
        <IoSearch />
      </button>
      {toggle && (
        <div className="comman-grid hg-grid">
          <input 
            type="text" 
            value =""
            onChange=""
            placeholder="Search..."
          />
          <div className="link-button">
            <button className="bg-none clear">Previous</button>
            <button>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchComp;
