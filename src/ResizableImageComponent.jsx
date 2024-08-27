import React, { useRef } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const ResizableImageComponent = ({ node, updateAttributes, selected }) => {
  const { src, width, height, rotation } = node.attrs;
  const imageRef = useRef(null);

  const onDragStart = (e) => {
    e.preventDefault();
    const initialX = e.clientX;
    const initialY = e.clientY;
    const startWidth = imageRef.current.offsetWidth;
    const startHeight = imageRef.current.offsetHeight;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - initialX);
      const newHeight = startHeight + (e.clientY - initialY);
      updateAttributes({ width: `${newWidth}px`, height: `${newHeight}px` });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onRotate = () => {
    const newRotation = (rotation + 90) % 360;
    updateAttributes({ rotation: newRotation });
  };

  return (
    <NodeViewWrapper className={`resizable-image ${selected ? 'selected' : ''}`} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        ref={imageRef}
        src={src}
        style={{ width, height, transform: `rotate(${rotation}deg)` }}
        alt=""
      />
      {selected && (
        <>
          <div
            className="resize-handle"
            style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'se-resize', width: '10px', height: '10px', background: 'blue' }}
            onMouseDown={onDragStart}
          />
          <div
            className="rotate-handle"
            style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', width: '20px', height: '20px', background: 'yellow' }}
            onClick={onRotate}
          />
        </>
      )}
      <NodeViewContent />
    </NodeViewWrapper>
  );
};

export default ResizableImageComponent;
