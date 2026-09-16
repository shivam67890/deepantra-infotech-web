// Controller for sandboxed code execution supporting Python, Java, C++, and SQL
// Uses isolated Judge0 CE engine with strict timeouts and memory boundaries

const LANGUAGE_CONFIG = {
  python: {
    id: 71, // Python 3
    name: 'Python (3.10)',
    monaco: 'python',
    extension: 'py',
    defaultFileName: 'main.py',
  },
  py: {
    id: 71,
    name: 'Python (3.10)',
    monaco: 'python',
    extension: 'py',
    defaultFileName: 'main.py',
  },
  java: {
    id: 62, // Java OpenJDK 13
    name: 'Java (OpenJDK)',
    monaco: 'java',
    extension: 'java',
    defaultFileName: 'Main.java',
  },
  cpp: {
    id: 54, // C++ GCC 9.2.0
    name: 'C++ (GCC)',
    monaco: 'cpp',
    extension: 'cpp',
    defaultFileName: 'main.cpp',
  },
  'c++': {
    id: 54,
    name: 'C++ (GCC)',
    monaco: 'cpp',
    extension: 'cpp',
    defaultFileName: 'main.cpp',
  },
  sql: {
    id: 82, // SQL (SQLite 3.27.2)
    name: 'SQL (SQLite)',
    monaco: 'sql',
    extension: 'sql',
    defaultFileName: 'queries.sql',
  },
  sqlite: {
    id: 82,
    name: 'SQL (SQLite)',
    monaco: 'sql',
    extension: 'sql',
    defaultFileName: 'queries.sql',
  },
};

/**
 * Parses pipe-separated or column-formatted SQLite output into a structured table object
 * e.g.:
 * id|name|score
 * 1|Aarav|95
 * 2|Diya|98
 */
function parseSqlOutput(rawOutput) {
  if (!rawOutput || typeof rawOutput !== 'string') return null;

  const lines = rawOutput
    .split('\n')
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return null;

  // Check if pipe-separated
  if (lines[0].includes('|')) {
    const columns = lines[0].split('|').map((col) => col.trim());
    const rows = lines.slice(1).map((line) => line.split('|').map((cell) => cell.trim()));
    return { columns, rows, totalRows: rows.length };
  }

  // Check if column mode with separator line (e.g. "----------  ----------")
  const sepIdx = lines.findIndex((l) => /^[-]+(\s+[-]+)+$/.test(l.trim()));
  if (sepIdx > 0) {
    const colLine = lines[sepIdx - 1];
    const sepLine = lines[sepIdx];

    // Find column positions based on dashes
    const regex = /[-]+/g;
    let match;
    const spans = [];
    while ((match = regex.exec(sepLine)) !== null) {
      spans.push({ start: match.index, end: match.index + match[0].length });
    }

    const columns = spans.map((s) => colLine.substring(s.start, s.end).trim());
    const rows = lines.slice(sepIdx + 1).map((line) => {
      return spans.map((s) => line.substring(s.start, s.end).trim());
    });

    return { columns, rows, totalRows: rows.length };
  }

  return null;
}

/**
 * Normalizes Java code if necessary to ensure it matches standard class definitions
 */
function normalizeJavaCode(code) {
  // If user defines a public class other than Main, replace it with Main for single-file compilation
  // or leave intact if class Main is present
  if (!/public\s+class\s+Main/i.test(code) && /public\s+class\s+([A-Za-z0-9_]+)/i.test(code)) {
    return code.replace(/public\s+class\s+([A-Za-z0-9_]+)/i, 'public class Main');
  }
  return code;
}

export const runCode = async (req, res) => {
  try {
    const { language, code, stdin = '', timeout = 10 } = req.body;

    if (!language) {
      return res.status(400).json({ error: 'Language is required.' });
    }

    const langKey = language.toLowerCase().trim();
    const config = LANGUAGE_CONFIG[langKey];

    if (!config) {
      return res.status(400).json({
        error: `Unsupported language "${language}". Supported: python, java, cpp, sql.`,
      });
    }

    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code content cannot be empty.' });
    }

    // Prepare code
    let sourceCode = code;
    if (config.monaco === 'java') {
      sourceCode = normalizeJavaCode(code);
    } else if (config.monaco === 'sql') {
      // In SQLite mode, inject .headers on and .mode column if not already present
      // so output is clean and tabular
      let prefix = '';
      if (!sourceCode.includes('.headers')) {
        prefix += '.headers on\n';
      }
      if (!sourceCode.includes('.mode')) {
        prefix += '.mode column\n';
      }
      sourceCode = prefix + sourceCode;
    }

    const judge0Payload = {
      source_code: sourceCode,
      language_id: config.id,
      stdin: stdin || '',
      cpu_time_limit: Math.min(Math.max(Number(timeout) || 10, 2), 15), // 2 to 15 seconds
      memory_limit: 128000, // 128MB
    };

    const response = await fetch(
      'https://ce.judge0.com/submissions?base64_encoded=false&wait=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(judge0Payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({
        error: 'Execution sandbox returned an error.',
        details: errorText,
      });
    }

    const result = await response.json();

    const stdout = result.stdout || '';
    const stderr = result.stderr || '';
    const compileOutput = result.compile_output || '';
    const statusDesc = result.status?.description || 'Executed';
    const executionTime = result.time ? `${result.time}s` : null;
    const memory = result.memory ? `${result.memory} KB` : null;

    // Check if SQL tabular data can be parsed
    let table = null;
    if (config.monaco === 'sql' && stdout) {
      table = parseSqlOutput(stdout);
    }

    return res.json({
      success: true,
      language: config.monaco,
      languageName: config.name,
      stdout,
      stderr,
      compileOutput,
      status: statusDesc,
      statusId: result.status?.id,
      executionTime,
      memory,
      table,
    });
  } catch (err) {
    console.error('Code execution error:', err);
    return res.status(500).json({
      error: 'Failed to execute code in sandbox.',
      message: err.message,
    });
  }
};
