import './StudentCodePortal.css';

import Editor from '@monaco-editor/react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Cpu,
  Download,
  FileCode,
  HardDrive,
  Maximize2,
  Minimize2,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Table,
  Terminal,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  CODE_SNIPPET_TEMPLATES,
  SUPPORTED_LANGUAGES,
} from '../data/codeTemplates.js';

export default function StudentCodePortal() {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Active language configuration
  const [currentLangId, setCurrentLangId] = useState('python');
  const currentLangConfig =
    SUPPORTED_LANGUAGES.find((l) => l.id === currentLangId) || SUPPORTED_LANGUAGES[0];

  // Multi-tab files state
  const [files, setFiles] = useState([
    {
      id: 'file-1',
      name: currentLangConfig.defaultFileName,
      language: currentLangConfig.monaco,
      content: currentLangConfig.defaultCode,
    },
  ]);
  const [activeFileId, setActiveFileId] = useState('file-1');

  // Stdin & Execution states
  const [stdin, setStdin] = useState(currentLangConfig.defaultStdin || '');
  const [activeOutputTab, setActiveOutputTab] = useState('console'); // 'console' | 'table' | 'stdin' | 'history'
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [executionHistory, setExecutionHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('fm-code-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved snippets
  const [savedSnippets, setSavedSnippets] = useState(() => {
    try {
      const saved = localStorage.getItem('fm-saved-snippets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // UI layout toggles
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorFontSize, setEditorFontSize] = useState(14);
  const editorRef = useRef(null);

  // Active file pointer
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Handle language switch
  function handleLanguageChange(newLangId) {
    const newConfig = SUPPORTED_LANGUAGES.find((l) => l.id === newLangId);
    if (!newConfig) return;

    setCurrentLangId(newLangId);
    setStdin(newConfig.defaultStdin || '');

    // Check if an existing file already matches this language
    const existingFile = files.find((f) => f.language === newConfig.monaco);
    if (existingFile) {
      setActiveFileId(existingFile.id);
    } else {
      // Create new tab for this language
      const newFileId = `file-${Date.now()}`;
      const newFile = {
        id: newFileId,
        name: newConfig.defaultFileName,
        language: newConfig.monaco,
        content: newConfig.defaultCode,
      };
      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFileId);
    }

    // Default to table output tab if SQL, otherwise console
    if (newConfig.monaco === 'sql') {
      setActiveOutputTab('console');
    }
  }

  // Update active file content
  function handleCodeChange(newCode) {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newCode || '' } : f))
    );
  }

  // Add new file tab
  function handleAddTab() {
    const count = files.filter((f) => f.language === currentLangConfig.monaco).length + 1;
    const ext = currentLangConfig.extension;
    const name = `script_${count}.${ext}`;
    const newId = `file-${Date.now()}`;

    const newFile = {
      id: newId,
      name,
      language: currentLangConfig.monaco,
      content: `// New ${currentLangConfig.name} file\n`,
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
  }

  // Close tab
  function handleCloseTab(e, fileIdToClose) {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('You must keep at least one file tab open.');
      return;
    }

    const remaining = files.filter((f) => f.id !== fileIdToClose);
    setFiles(remaining);

    if (activeFileId === fileIdToClose) {
      setActiveFileId(remaining[0].id);
      // Synchronize language dropdown to the new active file
      const matchLang = SUPPORTED_LANGUAGES.find((l) => l.monaco === remaining[0].language);
      if (matchLang) setCurrentLangId(matchLang.id);
    }
  }

  // Load starter example template
  function handleLoadTemplate(tpl) {
    if (
      activeFile.content.trim() &&
      !window.confirm(`Load "${tpl.title}"? Current tab content will be replaced.`)
    ) {
      return;
    }

    handleCodeChange(tpl.code);
    if (tpl.stdin !== undefined) {
      setStdin(tpl.stdin);
    }
  }

  // Reset current file to default starter code
  function handleResetCode() {
    if (window.confirm('Reset code to default template?')) {
      handleCodeChange(currentLangConfig.defaultCode);
      setStdin(currentLangConfig.defaultStdin || '');
      setExecutionResult(null);
    }
  }

  // Run Code via backend sandbox API
  async function handleRunCode() {
    if (isRunning) return;

    setIsRunning(true);
    setExecutionResult(null);

    // Auto-switch to console or table tab
    if (currentLangConfig.monaco === 'sql') {
      setActiveOutputTab('console');
    } else {
      setActiveOutputTab('console');
    }

    const startTime = performance.now();

    try {
      const response = await api.runCode({
        language: currentLangConfig.id,
        code: activeFile.content,
        stdin,
      });

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      const result = {
        ...response,
        clientElapsed: `${elapsed}s`,
        timestamp: new Date().toLocaleTimeString(),
      };

      setExecutionResult(result);

      // If SQL produced a table, switch to table tab for convenient viewing!
      if (result.table && result.table.rows?.length > 0) {
        setActiveOutputTab('table');
      }

      // Record in history
      const historyItem = {
        id: Date.now(),
        fileName: activeFile.name,
        language: currentLangConfig.name,
        status: result.status,
        timestamp: new Date().toLocaleTimeString(),
        preview: activeFile.content.slice(0, 100),
        time: result.executionTime || `${elapsed}s`,
      };

      setExecutionHistory((prev) => {
        const updated = [historyItem, ...prev.slice(0, 14)];
        localStorage.setItem('fm-code-history', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setExecutionResult({
        success: false,
        status: 'Connection Error',
        stderr: err.message || 'Could not connect to code execution server. Please ensure the backend server is running.',
        stdout: '',
      });
    } finally {
      setIsRunning(false);
    }
  }

  // Save current code as snippet
  function handleSaveSnippet() {
    const title = prompt('Enter a title for this code snippet:', activeFile.name);
    if (!title) return;

    const newSnippet = {
      id: Date.now(),
      title,
      fileName: activeFile.name,
      language: currentLangConfig.name,
      monaco: currentLangConfig.monaco,
      code: activeFile.content,
      stdin,
      savedAt: new Date().toLocaleDateString(),
    };

    const updated = [newSnippet, ...savedSnippets];
    setSavedSnippets(updated);
    localStorage.setItem('fm-saved-snippets', JSON.stringify(updated));

    setSaveSuccessMsg('Snippet saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  }

  // Load saved snippet
  function handleLoadSnippet(snippet) {
    const existingConfig = SUPPORTED_LANGUAGES.find((l) => l.monaco === snippet.monaco);
    if (existingConfig) {
      setCurrentLangId(existingConfig.id);
    }

    const newFileId = `file-${Date.now()}`;
    const newFile = {
      id: newId,
      name: snippet.fileName || 'snippet',
      language: snippet.monaco,
      content: snippet.code,
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
    if (snippet.stdin) setStdin(snippet.stdin);
    setActiveOutputTab('console');
  }

  // Download code as file
  function handleDownloadCode() {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Copy code to clipboard
  function handleCopyCode() {
    navigator.clipboard.writeText(activeFile.content);
    setSaveSuccessMsg('Code copied to clipboard!');
    setTimeout(() => setSaveSuccessMsg(''), 2500);
  }

  // Clear Terminal Output
  function handleClearConsole() {
    setExecutionResult(null);
  }

  return (
    <section className={`portal-page code-portal-page ${isFullscreen ? 'is-fullscreen' : ''}`}>
      <div className="container code-portal-container">
        {/* Navigation Breadcrumb & Header */}
        <div className="code-portal-top">
          <div>
            <Link to="/student/dashboard" className="portal-back">
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
            <div className="code-portal-title-row">
              <div className="code-portal-title-icon">
                <Code2 size={24} />
              </div>
              <div>
                <h1 className="portal-title">Interactive Code Portal</h1>
                <p className="portal-sub">
                  Write, execute, and debug code in sandboxed Python, Java, C++, and SQL with live outputs.
                </p>
              </div>
            </div>
          </div>

          <div className="code-portal-top__badges">
            <span className="portal-badge portal-badge--blue">
              <Cpu size={14} /> Sandboxed Container
            </span>
            <span className="portal-badge portal-badge--green">
              <Sparkles size={14} /> Multi-Language
            </span>
            {user?.name && (
              <span className="portal-badge portal-badge--amber">
                Student: {user.name}
              </span>
            )}
          </div>
        </div>

        {/* IDE Toolbar */}
        <div className="ide-toolbar">
          <div className="ide-toolbar__left">
            {/* Language Selector Dropdown */}
            <div className="ide-select-wrap">
              <label htmlFor="lang-select" className="ide-select-label">
                Language:
              </label>
              <select
                id="lang-select"
                className="ide-select"
                value={currentLangId}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.icon} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Starter Templates Dropdown */}
            {CODE_SNIPPET_TEMPLATES[currentLangConfig.monaco]?.length > 0 && (
              <div className="ide-select-wrap">
                <select
                  className="ide-select ide-select--subtle"
                  defaultValue=""
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx)) {
                      handleLoadTemplate(CODE_SNIPPET_TEMPLATES[currentLangConfig.monaco][idx]);
                    }
                    e.target.value = '';
                  }}
                >
                  <option value="" disabled>
                    💡 Practice Templates...
                  </option>
                  {CODE_SNIPPET_TEMPLATES[currentLangConfig.monaco].map((tpl, i) => (
                    <option key={tpl.title} value={i}>
                      {tpl.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="ide-toolbar__right">
            {saveSuccessMsg && (
              <span className="ide-toast">
                <CheckCircle2 size={14} /> {saveSuccessMsg}
              </span>
            )}

            <button
              type="button"
              className="ide-btn ide-btn--icon"
              title="Copy Code"
              onClick={handleCopyCode}
            >
              <Copy size={15} />
            </button>

            <button
              type="button"
              className="ide-btn ide-btn--icon"
              title="Download File"
              onClick={handleDownloadCode}
            >
              <Download size={15} />
            </button>

            <button
              type="button"
              className="ide-btn ide-btn--icon"
              title="Save to Snippets"
              onClick={handleSaveSnippet}
            >
              <HardDrive size={15} />
            </button>

            <button
              type="button"
              className="ide-btn ide-btn--icon"
              title="Reset to Starter Code"
              onClick={handleResetCode}
            >
              <RotateCcw size={15} />
            </button>

            <button
              type="button"
              className="ide-btn ide-btn--icon"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Big Run Button */}
            <button
              type="button"
              className={`btn btn--primary ide-run-btn ${isRunning ? 'is-loading' : ''}`}
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" /> Run Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* IDE Split Viewport */}
        <div className="ide-viewport">
          {/* LEFT: Monaco Code Editor */}
          <div className="ide-panel ide-panel--editor">
            {/* File Tab Bar */}
            <div className="ide-tab-bar">
              <div className="ide-tabs-scroll">
                {files.map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    className={`ide-tab ${file.id === activeFileId ? 'is-active' : ''}`}
                    onClick={() => setActiveFileId(file.id)}
                  >
                    <FileCode size={14} className="ide-tab__icon" />
                    <span className="ide-tab__name">{file.name}</span>
                    {files.length > 1 && (
                      <span
                        className="ide-tab__close"
                        title="Close Tab"
                        onClick={(e) => handleCloseTab(e, file.id)}
                      >
                        <X size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="ide-tab-add"
                title="Add New File Tab"
                onClick={handleAddTab}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Monaco Editor Container */}
            <div className="ide-editor-wrapper">
              <Editor
                height="100%"
                language={activeFile.language}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={activeFile.content}
                onChange={handleCodeChange}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  fontSize: editorFontSize,
                  fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  bracketPairColorization: { enabled: true },
                  wordWrap: 'on',
                  padding: { top: 12, bottom: 12 },
                  renderWhitespace: 'selection',
                }}
              />
            </div>
          </div>

          {/* RIGHT: Terminal / Output / Stdin Panel */}
          <div className="ide-panel ide-panel--output">
            {/* Output Panel Header Tabs */}
            <div className="ide-output-nav">
              <div className="ide-output-tabs">
                <button
                  type="button"
                  className={`ide-out-tab ${activeOutputTab === 'console' ? 'is-active' : ''}`}
                  onClick={() => setActiveOutputTab('console')}
                >
                  <Terminal size={14} /> Console
                  {executionResult && (
                    <span
                      className={`ide-status-dot ${
                        executionResult.stderr || executionResult.compileOutput
                          ? 'is-error'
                          : 'is-ok'
                      }`}
                    />
                  )}
                </button>

                {currentLangConfig.monaco === 'sql' && (
                  <button
                    type="button"
                    className={`ide-out-tab ${activeOutputTab === 'table' ? 'is-active' : ''}`}
                    onClick={() => setActiveOutputTab('table')}
                  >
                    <Table size={14} /> Data Table
                    {executionResult?.table && (
                      <span className="ide-tab-count">
                        {executionResult.table.totalRows || executionResult.table.rows?.length}
                      </span>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  className={`ide-out-tab ${activeOutputTab === 'stdin' ? 'is-active' : ''}`}
                  onClick={() => setActiveOutputTab('stdin')}
                >
                  Stdin (Input)
                  {stdin.trim() && <span className="ide-tab-count">•</span>}
                </button>

                <button
                  type="button"
                  className={`ide-out-tab ${activeOutputTab === 'history' ? 'is-active' : ''}`}
                  onClick={() => setActiveOutputTab('history')}
                >
                  History ({executionHistory.length})
                </button>
              </div>

              <div className="ide-output-actions">
                {executionResult && (
                  <button
                    type="button"
                    className="ide-btn ide-btn--icon"
                    title="Clear Output"
                    onClick={handleClearConsole}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Output Meta Bar: Status, Execution Time, Memory */}
            {executionResult && (
              <div className="ide-metric-bar">
                <div className="ide-metric-item">
                  <span
                    className={`portal-badge ${
                      executionResult.stderr || executionResult.compileOutput
                        ? 'portal-badge--pink'
                        : 'portal-badge--green'
                    }`}
                  >
                    {executionResult.status || (executionResult.stderr ? 'Error' : 'Success')}
                  </span>
                </div>

                {executionResult.executionTime && (
                  <div className="ide-metric-item">
                    <Clock size={12} className="text-amber" />
                    <span>{executionResult.executionTime}</span>
                  </div>
                )}

                {executionResult.memory && (
                  <div className="ide-metric-item">
                    <HardDrive size={12} className="text-blue" />
                    <span>{executionResult.memory}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 1: CONSOLE OUTPUT */}
            {activeOutputTab === 'console' && (
              <div className="ide-output-body">
                {isRunning ? (
                  <div className="ide-output-empty">
                    <RefreshCw size={24} className="animate-spin text-amber" />
                    <p>Executing code in secure sandbox...</p>
                    <span className="ide-sub-hint">Enforcing 10s timeout &amp; memory boundaries</span>
                  </div>
                ) : executionResult ? (
                  <div className="ide-console-output">
                    {/* Compilation Errors (e.g. Java / C++) */}
                    {executionResult.compileOutput && (
                      <div className="ide-error-block ide-error-block--compiler">
                        <div className="ide-error-title">
                          <AlertCircle size={14} /> Compilation Error:
                        </div>
                        <pre>{executionResult.compileOutput}</pre>
                      </div>
                    )}

                    {/* Standard Error / Runtime Error */}
                    {executionResult.stderr && (
                      <div className="ide-error-block ide-error-block--runtime">
                        <div className="ide-error-title">
                          <AlertCircle size={14} /> Runtime Error (stderr):
                        </div>
                        <pre>{executionResult.stderr}</pre>
                      </div>
                    )}

                    {/* Standard Output */}
                    {executionResult.stdout ? (
                      <pre className="ide-stdout">{executionResult.stdout}</pre>
                    ) : (
                      !executionResult.stderr &&
                      !executionResult.compileOutput && (
                        <div className="ide-empty-success">
                          <CheckCircle2 size={18} className="text-green" /> Program executed
                          successfully with no standard output.
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="ide-output-empty">
                    <Terminal size={32} className="text-muted" />
                    <p>Click "Run Code" above to execute your program.</p>
                    <span className="ide-sub-hint">
                      Output, compiler errors, and runtime diagnostics appear here.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: SQL DATA TABLE */}
            {activeOutputTab === 'table' && currentLangConfig.monaco === 'sql' && (
              <div className="ide-output-body ide-output-body--table">
                {executionResult?.table ? (
                  <div className="ide-sql-table-container">
                    <div className="ide-sql-table-header">
                      <span>Query Results ({executionResult.table.totalRows} rows)</span>
                    </div>
                    <div className="ide-table-responsive">
                      <table className="ide-sql-table">
                        <thead>
                          <tr>
                            {executionResult.table.columns.map((col, idx) => (
                              <th key={idx}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {executionResult.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="ide-output-empty">
                    <Table size={32} className="text-muted" />
                    <p>No table data to display.</p>
                    <span className="ide-sub-hint">
                      Run a SELECT query in SQL to inspect tabular results.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: STDIN INPUT */}
            {activeOutputTab === 'stdin' && (
              <div className="ide-output-body ide-output-body--stdin">
                <div className="ide-stdin-hint">
                  Provide custom standard input for programs reading from <code>input()</code>,{' '}
                  <code>cin &gt;&gt;</code>, or <code>Scanner</code>. Separate inputs with newlines.
                </div>
                <textarea
                  className="ide-stdin-textarea"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter standard input lines here..."
                  rows={8}
                />
              </div>
            )}

            {/* TAB CONTENT 4: HISTORY & SAVED SNIPPETS */}
            {activeOutputTab === 'history' && (
              <div className="ide-output-body ide-output-body--history">
                <div className="ide-history-section">
                  <h3 className="ide-history-heading">Recent Executions</h3>
                  {executionHistory.length === 0 ? (
                    <p className="ide-sub-hint">No executions in this browser session yet.</p>
                  ) : (
                    <div className="ide-history-list">
                      {executionHistory.map((item) => (
                        <div key={item.id} className="ide-history-card">
                          <div className="ide-history-top">
                            <span className="font-semibold">{item.fileName}</span>
                            <span className="portal-badge portal-badge--muted">
                              {item.language}
                            </span>
                            <span className="ide-history-time">{item.timestamp}</span>
                          </div>
                          <div className="ide-history-status">
                            <span
                              className={`ide-dot ${
                                item.status === 'Accepted' ? 'is-ok' : 'is-error'
                              }`}
                            />
                            <span>{item.status}</span> • <span>{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {savedSnippets.length > 0 && (
                  <div className="ide-history-section" style={{ marginTop: '1.5rem' }}>
                    <h3 className="ide-history-heading">Saved Snippets</h3>
                    <div className="ide-history-list">
                      {savedSnippets.map((snip) => (
                        <div key={snip.id} className="ide-history-card">
                          <div className="ide-history-top">
                            <span className="font-semibold">{snip.title}</span>
                            <span className="portal-badge portal-badge--blue">
                              {snip.language}
                            </span>
                            <button
                              type="button"
                              className="btn btn--outline btn--sm"
                              onClick={() => handleLoadSnippet(snip)}
                            >
                              Load
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}