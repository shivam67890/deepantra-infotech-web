import React, { useState, useRef } from 'react';
import { PROGRAMMING_BLOCKS } from './levelData.js';
import { BlockExecutor } from './BlockExecutor.js';
import './VisualProgramming.css';

export default function VisualProgramming({ level, gameScene, onRunProgram, onReset, onExecutionComplete }) {
  const [programBlocks, setProgramBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStatus, setExecutionStatus] = useState('');
  const workspaceRef = useRef(null);
  const blockExecutorRef = useRef(null);

  const handleBlockDragStart = (block, e) => {
    setSelectedBlock(block);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleBlockDrop = (e) => {
    e.preventDefault();
    if (!selectedBlock || !workspaceRef.current) return;

    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - workspaceRect.left;
    const y = e.clientY - workspaceRect.top;

    const newBlock = {
      ...selectedBlock,
      id: `${selectedBlock.id}-${Date.now()}`,
      x: Math.max(0, x - 50),
      y: Math.max(0, y - 25)
    };

    setProgramBlocks([...programBlocks, newBlock]);
    setIsDragging(false);
    setSelectedBlock(null);
  };

  const handleBlockDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleRemoveBlock = (blockId) => {
    setProgramBlocks(programBlocks.filter(block => block.id !== blockId));
  };

  const handleRunProgram = async () => {
    if (programBlocks.length === 0) {
      setExecutionStatus('No blocks to execute');
      return;
    }

    setIsExecuting(true);
    setExecutionStatus('Executing program...');

    try {
      // Initialize or update block executor with current game scene
      if (gameScene) {
        blockExecutorRef.current = new BlockExecutor(gameScene);
      }

      if (blockExecutorRef.current) {
        const result = await blockExecutorRef.current.executeProgram(programBlocks);
        
        if (result.success) {
          setExecutionStatus(`Program completed! Executed ${result.blocksExecuted} blocks`);
          if (onExecutionComplete) {
            onExecutionComplete(result);
          }
        } else {
          setExecutionStatus(`Error: ${result.error}`);
        }

        if (onRunProgram) {
          onRunProgram(programBlocks, result);
        }
      } else {
        // Fallback if no game scene
        setExecutionStatus('Game scene not available');
        if (onRunProgram) {
          onRunProgram(programBlocks);
        }
      }
    } catch (error) {
      setExecutionStatus(`Execution error: ${error.message}`);
      console.error('Program execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    setProgramBlocks([]);
    if (onReset) {
      onReset();
    }
  };

  const availableBlocks = level?.programmingBlocks || [];
  const filteredBlocks = Object.values(PROGRAMMING_BLOCKS).flat().filter(block =>
    availableBlocks.includes(block.id)
  );

  return (
    <div className="visual-programming">
      <div className="programming-header">
        <h3>Visual Programming</h3>
        <div className="programming-controls">
          <button 
            className="control-btn run" 
            onClick={handleRunProgram}
            disabled={isExecuting || programBlocks.length === 0}
          >
            {isExecuting ? '⏳ Running...' : '▶ Run Program'}
          </button>
          <button className="control-btn reset" onClick={handleReset} disabled={isExecuting}>
            ↺ Reset
          </button>
        </div>

        {executionStatus && (
          <div className={`execution-status ${executionStatus.includes('Error') ? 'error' : executionStatus.includes('completed') ? 'success' : 'info'}`}>
            {executionStatus}
          </div>
        )}
      </div>

      <div className="programming-interface">
        {/* Block Palette */}
        <div className="block-palette">
          <h4>Blocks</h4>
          <div className="block-categories">
            {Object.entries(PROGRAMMING_BLOCKS).map(([category, blocks]) => {
              const categoryBlocks = blocks.filter(block =>
                availableBlocks.includes(block.id)
              );
              
              if (categoryBlocks.length === 0) return null;
              
              return (
                <div key={category} className="block-category">
                  <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                  <div className="category-blocks">
                    {categoryBlocks.map(block => (
                      <div
                        key={block.id}
                        className="block-item"
                        draggable
                        onDragStart={(e) => handleBlockDragStart(block, e)}
                        style={{ backgroundColor: block.color }}
                      >
                        {block.label}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Programming Workspace */}
        <div
          ref={workspaceRef}
          className="programming-workspace"
          onDrop={handleBlockDrop}
          onDragOver={handleBlockDragOver}
        >
          <div className="workspace-grid">
            {programBlocks.map(block => (
              <div
                key={block.id}
                className="workspace-block"
                style={{
                  left: block.x,
                  top: block.y,
                  backgroundColor: block.color
                }}
              >
                <span className="block-label">{block.label}</span>
                <button
                  className="remove-block"
                  onClick={() => handleRemoveBlock(block.id)}
                >
                  ×
                </button>
              </div>
            ))}
            
            {programBlocks.length === 0 && (
              <div className="workspace-placeholder">
                <p>Drag blocks here to program your robot</p>
                <p className="hint">Blocks will execute from top to bottom</p>
              </div>
            )}
          </div>
        </div>

        {/* Program Preview */}
        <div className="program-preview">
          <h4>Program Sequence</h4>
          <div className="program-list">
            {programBlocks.length === 0 ? (
              <p className="empty-program">No blocks in program</p>
            ) : (
              programBlocks.map((block, index) => (
                <div key={block.id} className="program-item">
                  <span className="program-number">{index + 1}.</span>
                  <span
                    className="program-block-name"
                    style={{ backgroundColor: block.color }}
                  >
                    {block.label}
                  </span>
                </div>
              ))
            )}
          </div>
          
          <div className="program-stats">
            <div className="stat">
              <span className="stat-label">Blocks:</span>
              <span className="stat-value">{programBlocks.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Complexity:</span>
              <span className="stat-value">
                {programBlocks.length < 5 ? 'Low' : programBlocks.length < 10 ? 'Medium' : 'High'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}