import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, IconButton, Tooltip, Grid, Typography } from '@mui/material';
import TerrainIcon from '@mui/icons-material/Terrain';
import StraightIcon from '@mui/icons-material/Straight';
import HomeIcon from '@mui/icons-material/Home';
import ParkIcon from '@mui/icons-material/Park';
import WaterIcon from '@mui/icons-material/Water';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const GRID_SIZE = 32; // 32x32 grid for island layout
const CELL_SIZE = 20; // 20px per cell

const tools = [
  { id: 'terrain', icon: <TerrainIcon />, label: 'Terrain Tool' },
  { id: 'path', icon: <StraightIcon />, label: 'Path Tool' },
  { id: 'building', icon: <HomeIcon />, label: 'Building Tool' },
  { id: 'tree', icon: <ParkIcon />, label: 'Tree Tool' },
  { id: 'water', icon: <WaterIcon />, label: 'Water Tool' },
];

function IslandDesigner() {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    // Draw initial grid
    drawGrid(ctx);
  }, []);

  const drawGrid = (ctx) => {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();

    // Draw vertical lines
    for (let x = 0; x <= GRID_SIZE; x++) {
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    }

    // Draw horizontal lines
    for (let y = 0; y <= GRID_SIZE; y++) {
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, y * CELL_SIZE);
    }

    ctx.stroke();
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleCanvasMouseDown = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing) return;
    draw(e);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!selectedTool) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE) * CELL_SIZE;
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE) * CELL_SIZE;

    // Save current state to history
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([...history.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(historyIndex + 1);

    // Draw based on selected tool
    switch (selectedTool) {
      case 'terrain':
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        break;
      case 'path':
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        break;
      case 'water':
        ctx.fillStyle = '#4FA4FF';
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        break;
      // Add more tool implementations
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Typography 
        variant="h1" 
        color="primary" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: 'linear-gradient(45deg, #4ADE80 30%, #6EE7A0 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Island Designer
      </Typography>

      <Paper
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(0, 0, 0, 0.1)',
          position: 'relative',
          mb: 4,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {tools.map((tool) => (
              <Tooltip key={tool.id} title={tool.label}>
                <IconButton
                  onClick={() => handleToolSelect(tool.id)}
                  sx={{
                    bgcolor: selectedTool === tool.id ? 'primary.light' : 'transparent',
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                >
                  {tool.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Undo">
              <IconButton onClick={handleUndo} disabled={historyIndex <= 0}>
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
              <IconButton onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                <RedoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Design">
              <IconButton>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Load Design">
              <IconButton>
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              cursor: selectedTool ? 'crosshair' : 'default',
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default IslandDesigner;