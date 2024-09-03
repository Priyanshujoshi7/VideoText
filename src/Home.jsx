import React, { useState } from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [config, setConfig] = useState({
    x: 100,
    y: 100,
    width: 200,
    height: 50,
    fontType: 'Arial',
    fontSize: 16,
    fontWeight: 'regular',
    fontAlignment: 'left',
    bold: false,
    italics: false,
    underline: false,
    fillColor: '#000000',
    strokeColor: '#ffffff',
  });

  const addTextBox = () => {
    setTextBoxes([
      ...textBoxes,
      {
        id: Date.now(),
        ...config,
        isDragging: false,
        startX: 0,
        startY: 0,
        startWidth: config.width,
        startHeight: config.height,
        dragOffsetX: 0,
        dragOffsetY: 0,
      }
    ]);
  };

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDragStart = (e, id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    textBox.isDragging = true;
    textBox.dragOffsetX = e.clientX - textBox.x;
    textBox.dragOffsetY = e.clientY - textBox.y;
    setTextBoxes([...textBoxes]);
  };

  const handleDrag = (e, id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    if (textBox.isDragging) {
      const x = e.clientX - textBox.dragOffsetX;
      const y = e.clientY - textBox.dragOffsetY;
      setTextBoxes(textBoxes.map(tb =>
        tb.id === id
          ? { ...tb, x, y }
          : tb
      ));
    }
  };

  const handleDragEnd = (id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    textBox.isDragging = false;
    setTextBoxes([...textBoxes]);
  };

  const handleResizeStart = (e, id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    textBox.isResizing = true;
    textBox.startX = e.clientX;
    textBox.startY = e.clientY;
    textBox.startWidth = textBox.width;
    textBox.startHeight = textBox.height;
    setTextBoxes([...textBoxes]);
  };

  const handleResize = (e, id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    if (textBox.isResizing) {
      const width = textBox.startWidth + (e.clientX - textBox.startX);
      const height = textBox.startHeight + (e.clientY - textBox.startY);
      setTextBoxes(textBoxes.map(tb =>
        tb.id === id
          ? { ...tb, width: Math.max(width, 50), height: Math.max(height, 30) }
          : tb
      ));
    }
  };

  const handleResizeEnd = (id) => {
    const textBox = textBoxes.find(tb => tb.id === id);
    textBox.isResizing = false;
    setTextBoxes([...textBoxes]);
  };

  return (
    <div
      className="home"
      onMouseMove={(e) => {
        textBoxes.forEach(tb => tb.isDragging && handleDrag(e, tb.id));
        textBoxes.forEach(tb => tb.isResizing && handleResize(e, tb.id));
      }}
      onMouseUp={() => {
        textBoxes.forEach(tb => tb.isDragging && handleDragEnd(tb.id));
        textBoxes.forEach(tb => tb.isResizing && handleResizeEnd(tb.id));
      }}
    >
      <div className="video-section">
        <video className="video" controls>
          <source src="path/to/your/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {textBoxes.map((textBox) => (
          <div
            key={textBox.id}
            className="text-box"
            style={{
              left: textBox.x,
              top: textBox.y,
              width: textBox.width,
              height: textBox.height,
              fontFamily: textBox.fontType,
              fontSize: `${textBox.fontSize}px`,
              fontWeight: textBox.fontWeight,
              textAlign: textBox.fontAlignment,
              fontStyle: textBox.italics ? 'italic' : 'normal',
              textDecoration: textBox.underline ? 'underline' : 'none',
              backgroundColor: textBox.fillColor,
              borderColor: textBox.strokeColor,
              borderStyle: 'solid',
              borderWidth: '2px',
              position: 'absolute',
              resize: 'both',
              overflow: 'hidden',
            }}
            onMouseDown={(e) => handleDragStart(e, textBox.id)}
            onMouseUp={() => handleDragEnd(textBox.id)}
          >
            <input type="text" placeholder="Type here..." />
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeStart(e, textBox.id)}
              onMouseUp={() => handleResizeEnd(textBox.id)}
            ></div>
          </div>
        ))}
      </div>
      <div className="config-section">
        <button className="add-text-button" onClick={addTextBox}>
          Add Text
        </button>
        <hr className="separator" />
        <div className="config-form">
          <div className="position-size">
            <div className="position">
              <label>
                X:
                <input
                  type="number"
                  name="x"
                  value={config.x}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Y:
                <input
                  type="number"
                  name="y"
                  value={config.y}
                  onChange={handleConfigChange}
                />
              </label>
            </div>
            <div className="size">
              <label>
                Width:
                <input
                  type="number"
                  name="width"
                  value={config.width}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Height:
                <input
                  type="number"
                  name="height"
                  value={config.height}
                  onChange={handleConfigChange}
                />
              </label>
            </div>
          </div>
          <hr className="separator" />
          <div className="text-options">
            <div className="font-options">
              <label>
                Font Type:
                <select
                  name="fontType"
                  value={config.fontType}
                  onChange={handleConfigChange}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </label>
              <label>
                Font Size:
                <input
                  type="number"
                  name="fontSize"
                  value={config.fontSize}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Font Weight:
                <select
                  name="fontWeight"
                  value={config.fontWeight}
                  onChange={handleConfigChange}
                >
                  <option value="regular">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </label>
            </div>
            <div className="font-style">
              <label>
                Font Alignment:
                <select
                  name="fontAlignment"
                  value={config.fontAlignment}
                  onChange={handleConfigChange}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
              <label>
                Bold:
                <input
                  type="checkbox"
                  name="bold"
                  checked={config.bold}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Italics:
                <input
                  type="checkbox"
                  name="italics"
                  checked={config.italics}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Underline:
                <input
                  type="checkbox"
                  name="underline"
                  checked={config.underline}
                  onChange={handleConfigChange}
                />
              </label>
            </div>
            <hr className="separator" />
            <div className="color-options">
              <label>
                Fill:
                <input
                  type="color"
                  name="fillColor"
                  value={config.fillColor}
                  onChange={handleConfigChange}
                />
              </label>
              <label>
                Stroke:
                <input
                  type="color"
                  name="strokeColor"
                  value={config.strokeColor}
                  onChange={handleConfigChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
