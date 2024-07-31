import { useState ,useEffect ,useRef} from "react";
import { useCurrentEditor } from '@tiptap/react';
import { BiHighlight } from "react-icons/bi";

function HighlightComp() {
   const { editor } = useCurrentEditor();
   const [hg , setHg] = useState(false);
   const containerRef = useRef(null);

   const handleClickOutside = (event) => {
     if (containerRef.current && !containerRef.current.contains(event.target)) {
       setHg(false);
     }
   };
 
   useEffect(() => {
     if (hg) {
       document.addEventListener('mousedown', handleClickOutside);
     } else {
       document.removeEventListener('mousedown', handleClickOutside);
     }
 
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, [hg]);

  return (
    <div className='tip-HighlightComp position-relative' ref={containerRef}>
    <button className='bg-none' onClick={() => setHg(!hg)} data-tooltip-id="my-tooltip" data-tooltip-content="Highlight"><BiHighlight/></button>
     {hg && (
        <div className='comman-grid hg-grid'>
           <div>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(0, 0, 0)'}).run()} className={editor.isActive('highlight', { color: 'rgb(0, 0, 0)'}) ? 'is-active cm-hg' : 'cm-hg'}  style={{backgroundColor:'rgb(0, 0, 0)'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(67, 67, 67)' }).run()} className={editor.isActive('highlight', { color: 'rgb(67, 67, 67)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(67, 67, 67)'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(102, 102, 102)' }).run()} className={editor.isActive('highlight', { color: 'rgb(102, 102, 102)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(102, 102, 102)'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(153, 153, 153)' }).run()} className={editor.isActive('highlight', { color: 'rgb(153, 153, 153)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(153, 153, 153)'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#B7B7B7' }).run()} className={editor.isActive('highlight', { color: '#B7B7B7' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#B7B7B7'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#CCCCCC' }).run()} className={editor.isActive('highlight', { color: '#CCCCCC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#CCCCCC'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D9D9D9' }).run()} className={editor.isActive('highlight', { color: '#D9D9D9' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D9D9D9'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#EFEFEF' }).run()} className={editor.isActive('highlight', { color: '#EFEFEF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#EFEFEF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#F3F3F3' }).run()} className={editor.isActive('highlight', { color: '#F3F3F3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F3F3F3'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFFFFF' }).run()} className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFFFFF'}}></button>

              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#980000' }).run()} className={editor.isActive('highlight', { color: '#980000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#980000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FF0000' }).run()} className={editor.isActive('highlight', { color: '#FF0000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FF0000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FF9900' }).run()} className={editor.isActive('highlight', { color: '#FF9900' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FF9900'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFFF00' }).run()} className={editor.isActive('highlight', { color: '#FFFF00' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFFF00'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#00FF00' }).run()} className={editor.isActive('highlight', { color: '#00FF00' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#00FF00'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#00FFFF' }).run()} className={editor.isActive('highlight', { color: '#00FFFF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#00FFFF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#4A86E8' }).run()} className={editor.isActive('highlight', { color: '#4A86E8' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#4A86E8'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#0000FF' }).run()} className={editor.isActive('highlight', { color: '#0000FF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#0000FF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#9900FF' }).run()} className={editor.isActive('highlight', { color: '#9900FF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#9900FF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FF00FF' }).run()} className={editor.isActive('highlight', { color: '#FF00FF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FF00FF'}}></button>
             
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#E6B8AF' }).run()} className={editor.isActive('highlight', { color: '#E6B8AF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#E6B8AF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#F4CCCC' }).run()} className={editor.isActive('highlight', { color: '#F4CCCC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F4CCCC'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FCE5CD' }).run()} className={editor.isActive('highlight', { color: '#FCE5CD' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FCE5CD'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFF2CC' }).run()} className={editor.isActive('highlight', { color: '#FFF2CC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFF2CC'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D9EAD3' }).run()} className={editor.isActive('highlight', { color: '#D9EAD3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D9EAD3'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D0E0E3' }).run()} className={editor.isActive('highlight', { color: '#D0E0E3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D0E0E3'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#C9DAF8' }).run()} className={editor.isActive('highlight', { color: '#C9DAF8' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#C9DAF8'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#CFE2F3' }).run()} className={editor.isActive('highlight', { color: '#CFE2F3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#CFE2F3'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D9D2E9' }).run()} className={editor.isActive('highlight', { color: '#D9D2E9' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D9D2E9'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#EAD1DC' }).run()} className={editor.isActive('highlight', { color: '#EAD1DC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#EAD1DC'}}></button>
              
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#DD7E6B' }).run()} className={editor.isActive('highlight', { color: '#DD7E6B' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#DD7E6B'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#EA9999' }).run()} className={editor.isActive('highlight', { color: '#EA9999' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#EA9999'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#F9CB9C' }).run()} className={editor.isActive('highlight', { color: '#F9CB9C' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F9CB9C'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFE599' }).run()} className={editor.isActive('highlight', { color: '#FFE599' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFE599'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#B6D7A8' }).run()} className={editor.isActive('highlight', { color: '#B6D7A8' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#B6D7A8'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#A2C4C9' }).run()} className={editor.isActive('highlight', { color: '#A2C4C9' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#A2C4C9'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#A4C2F4' }).run()} className={editor.isActive('highlight', { color: '#A4C2F4' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#A4C2F4'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#B4A7D6' }).run()} className={editor.isActive('highlight', { color: '#B4A7D6' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#B4A7D6'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#9FC5E8' }).run()} className={editor.isActive('highlight', { color: '#9FC5E8' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#9FC5E8'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D5A6BD' }).run()} className={editor.isActive('highlight', { color: '#D5A6BD' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D5A6BD'}}></button>
              
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#CC4125' }).run()} className={editor.isActive('highlight', { color: '#CC4125' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#CC4125'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#E06666' }).run()} className={editor.isActive('highlight', { color: '#E06666' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#E06666'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#F6B26B' }).run()} className={editor.isActive('highlight', { color: '#F6B26B' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F6B26B'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFD966' }).run()} className={editor.isActive('highlight', { color: '#FFD966' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFD966'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#93C47D' }).run()} className={editor.isActive('highlight', { color: '#93C47D' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#93C47D'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#76A5AF' }).run()} className={editor.isActive('highlight', { color: '#76A5AF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#76A5AF'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#6D9EEB' }).run()} className={editor.isActive('highlight', { color: '#6D9EEB' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#6D9EEB'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#6FA8DC' }).run()} className={editor.isActive('highlight', { color: '#6FA8DC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#6FA8DC'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#8E7CC3' }).run()} className={editor.isActive('highlight', { color: '#8E7CC3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#8E7CC3'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#C27BA0' }).run()} className={editor.isActive('highlight', { color: '#C27BA0' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#C27BA0'}}></button>

              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#A61C00' }).run()} className={editor.isActive('highlight', { color: '#A61C00' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#A61C00'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#CC0000' }).run()} className={editor.isActive('highlight', { color: '#CC0000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#CC0000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#E69138' }).run()} className={editor.isActive('highlight', { color: '#E69138' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#E69138'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#BF9000' }).run()} className={editor.isActive('highlight', { color: '#F1C232' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F1C232'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#6AA84F' }).run()} className={editor.isActive('highlight', { color: '#6AA84F' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#6AA84F'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#45818E' }).run()} className={editor.isActive('highlight', { color: '#45818E' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#45818E'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#3C78D8' }).run()} className={editor.isActive('highlight', { color: '#3C78D8' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#3C78D8'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#3D85C6' }).run()} className={editor.isActive('highlight', { color: '#3D85C6' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#3D85C6'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#674EA7' }).run()} className={editor.isActive('highlight', { color: '#674EA7' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#674EA7'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#A64D79' }).run()} className={editor.isActive('highlight', { color: '#A64D79' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#A64D79'}}></button>

              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#85200C' }).run()} className={editor.isActive('highlight', { color: '#85200C' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#85200C'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#990000' }).run()} className={editor.isActive('highlight', { color: '#990000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#990000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#B45F06' }).run()} className={editor.isActive('highlight', { color: '#B45F06' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#B45F06'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#BF9000' }).run()} className={editor.isActive('highlight', { color: '#BF9000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#BF9000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#38761D' }).run()} className={editor.isActive('highlight', { color: '#38761D' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#38761D'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#134F5C' }).run()} className={editor.isActive('highlight', { color: '#134F5C' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#134F5C'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#1155CC' }).run()} className={editor.isActive('highlight', { color: '#1155CC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#1155CC'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#0B5394' }).run()} className={editor.isActive('highlight', { color: '#0B5394' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#0B5394'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#351C75' }).run()} className={editor.isActive('highlight', { color: '#351C75' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#351C75'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#741B47' }).run()} className={editor.isActive('highlight', { color: '#741B47' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#741B47'}}></button>
              
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#5B0F00' }).run()} className={editor.isActive('highlight', { color: '#5B0F00' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#5B0F00'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#660000' }).run()} className={editor.isActive('highlight', { color: '#660000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#660000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#783F04' }).run()} className={editor.isActive('highlight', { color: '#783F04' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#783F04'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#7F6000' }).run()} className={editor.isActive('highlight', { color: '#7F6000' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#7F6000'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#274E13' }).run()} className={editor.isActive('highlight', { color: '#274E13' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#274E13'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#0C343D' }).run()} className={editor.isActive('highlight', { color: '#0C343D' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#0C343D'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#1C4587' }).run()} className={editor.isActive('highlight', { color: '#1C4587' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#1C4587'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#073763' }).run()} className={editor.isActive('highlight', { color: '#073763' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#073763'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#20124D' }).run()} className={editor.isActive('highlight', { color: '#20124D' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#20124D'}}></button>
              <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#4C1130' }).run()} className={editor.isActive('highlight', { color: '#4C1130' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#4C1130'}}></button>


             </div>
        </div>
     )}
  </div>
  )
}

export default HighlightComp