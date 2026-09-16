/**
 * Young Innovators AI — 16 sessions (Grades 6–8, Intermediate)
 */

const youngInnovatorsSessions = [
  // ── Session 1 ────────────────────────────────────────────
  {
    id: 1,
    title: 'Under the Hood: Advanced Hardware',
    objective: 'Understand the CPU, RAM, GPU, motherboard, and how they work together.',
    learn: [
      {
        heading: 'The CPU — Brain of the Computer',
        bullets: [
          'The CPU (Central Processing Unit) executes billions of instructions per second.',
          'Clock speed, measured in GHz, tells you how fast the CPU can process data.',
          'Modern CPUs have multiple cores — like having several brains working on different tasks simultaneously.',
        ],
      },
      {
        heading: 'RAM & Storage',
        bullets: [
          'RAM (Random Access Memory) is temporary memory — it stores data for programs currently running.',
          'When you turn off the computer, everything in RAM disappears; that\'s why you save to a hard drive or SSD.',
          'SSDs (Solid State Drives) are much faster than traditional hard drives because they have no moving parts.',
        ],
      },
      {
        heading: 'The Motherboard & GPU',
        bullets: [
          'The motherboard is the main circuit board — it connects the CPU, RAM, storage, and all other components.',
          'The GPU (Graphics Processing Unit) handles rendering images, videos, and game graphics.',
          'GPUs are now also used for AI training because they can do thousands of calculations at once.',
        ],
      },
    ],
    didYouKnow: 'A modern smartphone has more computing power than all of NASA had when it sent astronauts to the Moon in 1969!',
    assignment: [
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Utility', 'Central Power Unit', 'Core Processing Utility'],
        correctIndex: 0,
        explanation: 'CPU stands for Central Processing Unit — it\'s the main chip that executes instructions in a computer.',
      },
      {
        question: 'Why is an SSD faster than a traditional hard drive?',
        options: ['It is bigger', 'It has no moving parts', 'It uses more electricity', 'It connects to the internet'],
        correctIndex: 1,
        explanation: 'SSDs use flash memory with no mechanical moving parts, allowing data to be read and written much faster.',
      },
      {
        question: 'What is the motherboard\'s job?',
        options: [
          'To display images on screen',
          'To connect and allow communication between all components',
          'To store files permanently',
          'To connect to Wi-Fi only',
        ],
        correctIndex: 1,
        explanation: 'The motherboard is the main circuit board that connects the CPU, RAM, GPU, storage, and all peripherals together.',
      },
    ],
  },

  // ── Session 2 ────────────────────────────────────────────
  {
    id: 2,
    title: 'Mastering Your Operating System',
    objective: 'Learn about operating systems, advanced file management, and system settings.',
    learn: [
      {
        heading: 'What Is an Operating System?',
        bullets: [
          'An OS (Operating System) is the software that manages hardware and lets you run applications.',
          'Popular operating systems include Windows, macOS, Linux, Android, and iOS.',
          'Without an OS, you\'d have to talk to the hardware in binary (0s and 1s) — the OS translates for you.',
        ],
      },
      {
        heading: 'Advanced File Management',
        bullets: [
          'File extensions (.docx, .pdf, .jpg, .py) tell the OS which program should open a file.',
          'Compressing files into ZIP archives reduces their size for easier sharing and storage.',
          'File paths like C:\\Users\\Student\\Documents\\project.py describe the exact location of a file.',
        ],
      },
      {
        heading: 'System Settings & Task Manager',
        bullets: [
          'The Control Panel (or Settings) lets you manage display, sound, network, and user accounts.',
          'Task Manager (Ctrl + Shift + Esc) shows all running programs and how much CPU and RAM each one uses.',
          'If a program freezes, you can use Task Manager to force-close it without restarting the computer.',
        ],
      },
    ],
    didYouKnow: 'Linux, one of the most important operating systems, was created by a 21-year-old Finnish student named Linus Torvalds in 1991!',
    assignment: [
      {
        question: 'What does an operating system do?',
        options: [
          'It only runs games',
          'It manages hardware and lets you run applications',
          'It connects to the internet only',
          'It stores files on USB drives',
        ],
        correctIndex: 1,
        explanation: 'An OS manages all hardware resources and provides a user-friendly interface for running applications.',
      },
      {
        question: 'What keyboard shortcut opens Task Manager on Windows?',
        options: ['Ctrl + C', 'Ctrl + Shift + Esc', 'Alt + F4', 'Ctrl + Z'],
        correctIndex: 1,
        explanation: 'Ctrl + Shift + Esc directly opens the Task Manager, showing running processes and resource usage.',
      },
      {
        question: 'What does a .py file extension indicate?',
        options: ['A Word document', 'A picture file', 'A Python program file', 'A music file'],
        correctIndex: 2,
        explanation: 'The .py extension identifies a Python source code file.',
      },
    ],
  },

  // ── Session 3 ────────────────────────────────────────────
  {
    id: 3,
    title: 'Thinking Like a Programmer: Algorithms',
    objective: 'Understand algorithms, flowcharts, and logical step-by-step problem solving.',
    learn: [
      {
        heading: 'What Is an Algorithm?',
        bullets: [
          'An algorithm is a step-by-step set of instructions to solve a problem or complete a task.',
          'A recipe for making a sandwich is a real-life algorithm: gather ingredients → spread butter → add filling → close bread.',
          'Good algorithms are clear, ordered, and have a definite start and end.',
        ],
      },
      {
        heading: 'Flowcharts — Visualizing Logic',
        bullets: [
          'A flowchart uses shapes to represent steps: ovals for start/end, rectangles for actions, diamonds for decisions.',
          'Arrows connect the shapes to show the order of steps.',
          'Flowcharts help you plan before you code — finding logic errors on paper is much easier than in code.',
        ],
      },
      {
        heading: 'Common Algorithm Patterns',
        bullets: [
          'Sequence: steps happen one after another in order.',
          'Selection (if/else): the program makes a decision — "If it\'s raining, take an umbrella; otherwise, wear sunglasses."',
          'Repetition (loops): the program repeats steps — "Keep stirring until the sugar dissolves."',
        ],
      },
    ],
    didYouKnow: 'The word "algorithm" comes from the name of a 9th-century Persian mathematician, al-Khwarizmi, who wrote one of the first algebra textbooks!',
    assignment: [
      {
        question: 'What is an algorithm?',
        options: [
          'A type of computer hardware',
          'A step-by-step set of instructions to solve a problem',
          'A programming language',
          'A type of data file',
        ],
        correctIndex: 1,
        explanation: 'An algorithm is a precise, ordered set of instructions that leads to a solution — the foundation of all programming.',
      },
      {
        question: 'In a flowchart, what shape represents a decision?',
        options: ['Rectangle', 'Oval', 'Diamond', 'Arrow'],
        correctIndex: 2,
        explanation: 'Diamond shapes represent decision points (yes/no or true/false questions) in a flowchart.',
      },
      {
        question: 'Which algorithm pattern repeats steps until a condition is met?',
        options: ['Sequence', 'Selection', 'Repetition (loop)', 'Flowchart'],
        correctIndex: 2,
        explanation: 'Repetition (loops) repeat a set of steps until a specific condition is satisfied — like "keep stirring until dissolved."',
      },
    ],
  },

  // ── Session 4 ────────────────────────────────────────────
  {
    id: 4,
    title: 'Core Programming Concepts',
    objective: 'Learn variables, data types, conditions, and loops as universal programming building blocks.',
    learn: [
      {
        heading: 'Variables — Storing Data',
        bullets: [
          'A variable is a named container that holds a value — like a labeled box: name = "Ananya".',
          'Variables can hold different data types: text (strings), whole numbers (integers), and decimal numbers (floats).',
          'You can change a variable\'s value during the program — that\'s what makes programs dynamic.',
        ],
      },
      {
        heading: 'Making Decisions: If / Else',
        bullets: [
          'An if-statement checks a condition: "if score >= 70: print(\'Pass\')" only runs the print when the condition is true.',
          'An else-clause runs when the condition is false: "else: print(\'Try again\')".',
          'You can chain conditions with elif (else if) to check multiple possibilities.',
        ],
      },
      {
        heading: 'Loops — Doing Things Repeatedly',
        bullets: [
          'A for-loop repeats code a specific number of times: "for i in range(5):" runs five times.',
          'A while-loop repeats as long as a condition stays true: "while lives > 0:" keeps the game going.',
          'Loops save you from writing the same code over and over — they are one of programming\'s biggest superpowers.',
        ],
      },
    ],
    didYouKnow: 'The first computer bug was a real bug! In 1947, a moth got stuck inside a Harvard computer and caused errors. Engineers taped it into the log book!',
    assignment: [
      {
        question: 'What is a variable in programming?',
        options: [
          'A fixed value that never changes',
          'A named container that stores a value',
          'A type of loop',
          'A computer component',
        ],
        correctIndex: 1,
        explanation: 'A variable is like a labeled box — it stores data that your program can read, change, and use.',
      },
      {
        question: 'What does "for i in range(3):" do?',
        options: [
          'Runs the code inside it 3 times',
          'Creates 3 new files',
          'Deletes 3 items',
          'Prints the number 3 once',
        ],
        correctIndex: 0,
        explanation: 'range(3) produces the sequence 0, 1, 2 — so the loop body runs 3 times.',
      },
      {
        question: 'What does an "else" block do?',
        options: [
          'It always runs',
          'It runs when the if-condition is false',
          'It stops the program',
          'It creates a new variable',
        ],
        correctIndex: 1,
        explanation: 'The else block executes only when the preceding if-condition evaluates to false.',
      },
    ],
  },

  // ── Session 5 ────────────────────────────────────────────
  {
    id: 5,
    title: 'Coding in Python',
    objective: 'Write your first Python programs with input, output, variables, and basic logic.',
    learn: [
      {
        heading: 'Why Python?',
        bullets: [
          'Python is one of the most popular programming languages in the world — used by Google, NASA, and Netflix.',
          'Its syntax reads almost like English: print("Hello World") displays text on screen.',
          'Python is used for web apps, data science, AI, automation, and much more.',
        ],
      },
      {
        heading: 'Your First Python Program',
        bullets: [
          'print() displays text: print("My name is Kabir") shows the message on screen.',
          'input() asks the user for information: name = input("What is your name? ")',
          'You can combine variables and text: print("Hello, " + name)',
        ],
      },
      {
        heading: 'Math in Python',
        bullets: [
          'Python can do math: + (add), - (subtract), * (multiply), / (divide), ** (power).',
          'Use int() to convert text input to a number: age = int(input("Your age: "))',
          'Comparison operators (>, <, ==, !=) let you compare values in if-statements.',
        ],
      },
    ],
    didYouKnow: 'Python was named after the British comedy show "Monty Python\'s Flying Circus," not the snake!',
    assignment: [
      {
        question: 'What does print("Hello") do in Python?',
        options: [
          'Sends a document to a printer',
          'Displays the text "Hello" on screen',
          'Saves "Hello" to a file',
          'Creates a variable called Hello',
        ],
        correctIndex: 1,
        explanation: 'The print() function outputs text (or other values) to the screen — it\'s the most basic way to display information.',
      },
      {
        question: 'How do you ask a user for their name in Python?',
        options: [
          'name = print("name")',
          'name = input("What is your name? ")',
          'name = "What is your name?"',
          'ask("What is your name?")',
        ],
        correctIndex: 1,
        explanation: 'input() pauses the program, shows a prompt, and stores whatever the user types into the variable.',
      },
      {
        question: 'What is 2 ** 3 in Python?',
        options: ['6', '8', '5', '23'],
        correctIndex: 1,
        explanation: '** is the power (exponentiation) operator. 2 ** 3 means 2 × 2 × 2 = 8.',
      },
    ],
  },

  // ── Session 6 ────────────────────────────────────────────
  {
    id: 6,
    title: 'Advanced Scratch: Variables, Events & Cloning',
    objective: 'Use Scratch\'s advanced features to build more complex interactive projects.',
    learn: [
      {
        heading: 'Variables & Score Tracking',
        bullets: [
          'Create a variable in Scratch to keep score: click "Make a Variable" and name it "score."',
          'Use "change score by 1" to increase it each time the player does something right.',
          'Display the score on the stage so the player can track their progress in real time.',
        ],
      },
      {
        heading: 'Events & Broadcasting',
        bullets: [
          'The "broadcast" block sends a message that other sprites can listen for with "when I receive."',
          'This lets sprites communicate — for example, broadcasting "game over" to stop all sprites.',
          'You can use custom events to organize complex programs into smaller, manageable parts.',
        ],
      },
      {
        heading: 'Cloning — Endless Possibilities',
        bullets: [
          'Cloning creates copies of a sprite while the program runs — perfect for enemies, coins, or raindrops.',
          'Use "when I start as a clone" to give each clone its own behavior.',
          'Delete clones when they leave the stage to keep your project running smoothly.',
        ],
      },
    ],
    didYouKnow: 'The most popular Scratch project of all time has been "remixed" (modified and shared) by over 10 million people!',
    assignment: [
      {
        question: 'How do you make sprites communicate in Scratch?',
        options: [
          'By moving them close together',
          'By using broadcast and "when I receive" blocks',
          'By typing code in Python',
          'By pressing the space bar',
        ],
        correctIndex: 1,
        explanation: 'Broadcast sends a named message; "when I receive" listens for it, letting sprites coordinate actions.',
      },
      {
        question: 'What is cloning used for in Scratch?',
        options: [
          'Deleting sprites',
          'Creating copies of a sprite during the program',
          'Changing the background',
          'Adding sound effects only',
        ],
        correctIndex: 1,
        explanation: 'Cloning dynamically creates copies of a sprite at runtime — useful for enemies, projectiles, particles, etc.',
      },
      {
        question: 'Why should you delete clones when they leave the stage?',
        options: [
          'It makes the project look better',
          'It keeps the project running smoothly by freeing memory',
          'Clones cannot be deleted',
          'It changes the score',
        ],
        correctIndex: 1,
        explanation: 'Too many active clones slow down the project. Deleting off-screen clones keeps performance smooth.',
      },
    ],
  },

  // ── Session 7 ────────────────────────────────────────────
  {
    id: 7,
    title: 'Working with Data in Excel',
    objective: 'Use spreadsheets to organize data, apply formulas, and create charts.',
    learn: [
      {
        heading: 'Spreadsheet Basics',
        bullets: [
          'A spreadsheet is a grid of cells organized in rows (numbers) and columns (letters).',
          'Each cell has an address like B3 — column B, row 3 — where you can type text, numbers, or formulas.',
          'Sheets are great for organizing data like student marks, budgets, or science experiment results.',
        ],
      },
      {
        heading: 'Formulas & Functions',
        bullets: [
          'Formulas start with = sign: =A1+B1 adds the values in cells A1 and B1.',
          'SUM adds a range: =SUM(A1:A10) totals all values from A1 through A10.',
          'AVERAGE calculates the mean: =AVERAGE(B2:B20) finds the average of those cells.',
        ],
      },
      {
        heading: 'Charts & Visualization',
        bullets: [
          'Select your data and insert a chart (bar, line, or pie) to visualize patterns instantly.',
          'Bar charts compare categories; line charts show trends over time; pie charts show proportions.',
          'Add titles and labels to your chart so anyone reading it understands the data.',
        ],
      },
    ],
    didYouKnow: 'The first spreadsheet software, VisiCalc, was created in 1979 and was so popular it was called the "killer app" that made people want to buy personal computers!',
    assignment: [
      {
        question: 'What does =SUM(A1:A5) do?',
        options: [
          'Finds the largest number in A1 to A5',
          'Adds up all values from cell A1 through A5',
          'Counts the number of cells',
          'Subtracts A5 from A1',
        ],
        correctIndex: 1,
        explanation: 'SUM adds all values in the specified range — A1 + A2 + A3 + A4 + A5.',
      },
      {
        question: 'Which chart type is best for showing trends over time?',
        options: ['Pie chart', 'Bar chart', 'Line chart', 'Table'],
        correctIndex: 2,
        explanation: 'Line charts connect data points chronologically, making it easy to spot upward or downward trends.',
      },
      {
        question: 'What does every formula in Excel start with?',
        options: ['A letter', 'A number', 'An = sign', 'A # symbol'],
        correctIndex: 2,
        explanation: 'Every formula begins with an equals sign (=) to tell Excel it should calculate, not just display text.',
      },
    ],
  },

  // ── Session 8 ────────────────────────────────────────────
  {
    id: 8,
    title: 'Advanced Presentation Design',
    objective: 'Create polished, visually engaging presentations with advanced PowerPoint techniques.',
    learn: [
      {
        heading: 'Slide Master & Consistent Design',
        bullets: [
          'The Slide Master controls the default layout, fonts, and colors for ALL slides at once.',
          'Editing the Slide Master saves time — change the font once and every slide updates automatically.',
          'Use a consistent color palette (2–3 colors maximum) for a professional, cohesive look.',
        ],
      },
      {
        heading: 'Visual Storytelling',
        bullets: [
          'Replace bullet points with visuals: icons, photos, and diagrams communicate faster than text.',
          'Use the "rule of thirds" — place key elements off-center for a more dynamic, visually interesting layout.',
          'Contrast is key: dark text on a light background (or vice versa) ensures readability.',
        ],
      },
      {
        heading: 'Delivery & Speaker Notes',
        bullets: [
          'Speaker Notes let you write detailed talking points that only you can see during the presentation.',
          'Practice the "10-20-30 Rule": no more than 10 slides, 20 minutes, 30-point minimum font size.',
          'Record your presentation as a video for sharing with people who weren\'t in the room.',
        ],
      },
    ],
    didYouKnow: 'Studies show audiences remember 65% of information when it\'s paired with a relevant image, compared to only 10% with text alone!',
    assignment: [
      {
        question: 'What does the Slide Master control?',
        options: [
          'Only the first slide',
          'Default layout, fonts, and colors for all slides',
          'The computer\'s volume',
          'Only slide transitions',
        ],
        correctIndex: 1,
        explanation: 'The Slide Master sets the template for all slides — changing it updates the entire presentation.',
      },
      {
        question: 'What is the "10-20-30 Rule" for presentations?',
        options: [
          '10 images, 20 slides, 30 animations',
          '10 slides max, 20 minutes max, 30-point minimum font',
          '10 colors, 20 fonts, 30 bullet points',
          '10 charts, 20 tables, 30 videos',
        ],
        correctIndex: 1,
        explanation: 'The 10-20-30 Rule suggests keeping presentations to 10 slides, 20 minutes, with at least 30pt font for readability.',
      },
      {
        question: 'Why should you use Speaker Notes?',
        options: [
          'They appear on screen for the audience',
          'They let you write talking points only you can see during the presentation',
          'They add animations',
          'They change the slide layout',
        ],
        correctIndex: 1,
        explanation: 'Speaker Notes are private — visible only on the presenter\'s screen — providing detailed talking points without cluttering slides.',
      },
    ],
  },

  // ── Session 9 ────────────────────────────────────────────
  {
    id: 9,
    title: 'Introduction to Databases with MS Access',
    objective: 'Understand what databases are and how to create simple tables, queries, and forms.',
    learn: [
      {
        heading: 'What Is a Database?',
        bullets: [
          'A database is an organized collection of data that can be easily searched, sorted, and updated.',
          'Think of it like a super-powered spreadsheet designed for handling large amounts of related information.',
          'Real-world databases store student records, library books, hospital patients, and online store products.',
        ],
      },
      {
        heading: 'Tables, Records & Fields',
        bullets: [
          'A table stores data in rows (records) and columns (fields) — like a structured spreadsheet.',
          'Each field has a data type: Text for names, Number for ages, Date for birthdays.',
          'A Primary Key is a unique identifier for each record — like a student\'s roll number.',
        ],
      },
      {
        heading: 'Queries & Forms',
        bullets: [
          'A query asks the database a question: "Show all students in Grade 7 with marks above 80."',
          'Forms provide a user-friendly way to enter and view data — nicer than typing directly into a table.',
          'Reports format your data for printing or sharing — automatically organized and styled.',
        ],
      },
    ],
    didYouKnow: 'The largest databases in the world store petabytes of data — that\'s over 1 million gigabytes, enough to store about 500 billion pages of text!',
    assignment: [
      {
        question: 'What is a Primary Key in a database?',
        options: [
          'The first row of a table',
          'A unique identifier for each record',
          'The password to open the database',
          'The name of the database',
        ],
        correctIndex: 1,
        explanation: 'A Primary Key uniquely identifies each record in a table — no two records can have the same primary key value.',
      },
      {
        question: 'What does a query do?',
        options: [
          'Deletes the entire database',
          'Asks the database a question and returns matching results',
          'Creates a new table',
          'Changes the font of the database',
        ],
        correctIndex: 1,
        explanation: 'A query lets you search, filter, and retrieve specific data from a database based on conditions you set.',
      },
      {
        question: 'Which is the best analogy for a database?',
        options: [
          'A paintbrush',
          'A super-powered, searchable spreadsheet for large data',
          'A video game',
          'An alarm clock',
        ],
        correctIndex: 1,
        explanation: 'A database is like a highly structured spreadsheet optimized for storing, searching, and managing large volumes of related data.',
      },
    ],
  },

  // ── Session 10 ───────────────────────────────────────────
  {
    id: 10,
    title: 'Creative Digital Design with GIMP',
    objective: 'Learn image editing fundamentals using the free, professional-grade GIMP software.',
    learn: [
      {
        heading: 'What Is GIMP?',
        bullets: [
          'GIMP (GNU Image Manipulation Program) is a free, open-source image editor as powerful as Photoshop.',
          'It supports layers, filters, brushes, and advanced selection tools for professional-quality results.',
          'GIMP runs on Windows, macOS, and Linux — anyone can use it without paying for expensive software.',
        ],
      },
      {
        heading: 'Essential Editing Tools',
        bullets: [
          'The Selection tools (rectangle, ellipse, free select) let you isolate parts of an image for editing.',
          'The Clone Stamp copies one area of an image onto another — great for removing unwanted objects.',
          'Brightness/Contrast and Color Balance adjustments can dramatically improve a dull photo.',
        ],
      },
      {
        heading: 'Layers & Composition',
        bullets: [
          'Layers are like transparent sheets stacked on top of each other — each can hold different elements.',
          'You can move, hide, or change the transparency (opacity) of any layer independently.',
          'Professional designers use layers to combine photos, text, and graphics into a single polished image.',
        ],
      },
    ],
    didYouKnow: 'GIMP has been free and open-source since 1996 — anyone can use it, modify it, and share it. It\'s used by professionals and hobbyists worldwide!',
    assignment: [
      {
        question: 'What does GIMP stand for?',
        options: [
          'General Internet Media Player',
          'GNU Image Manipulation Program',
          'Graphical Interface for Making Pictures',
          'Google Image Management Platform',
        ],
        correctIndex: 1,
        explanation: 'GIMP stands for GNU Image Manipulation Program — a free, open-source alternative to Photoshop.',
      },
      {
        question: 'What are layers in image editing?',
        options: [
          'Different file formats',
          'Transparent sheets stacked on top of each other, each holding different elements',
          'Types of brushes',
          'Internet connections',
        ],
        correctIndex: 1,
        explanation: 'Layers work like stacked transparent sheets — you can edit each independently and combine them into one final image.',
      },
      {
        question: 'What does the Clone Stamp tool do?',
        options: [
          'Adds text to the image',
          'Copies one area of an image onto another area',
          'Deletes the entire image',
          'Changes the file format',
        ],
        correctIndex: 1,
        explanation: 'The Clone Stamp samples pixels from one area and paints them onto another — commonly used to remove blemishes or unwanted objects.',
      },
    ],
  },

  // ── Session 11 ───────────────────────────────────────────
  {
    id: 11,
    title: 'Building Web Pages with HTML5',
    objective: 'Create your first web page using HTML structure, tags, and basic styling.',
    learn: [
      {
        heading: 'What Is HTML?',
        bullets: [
          'HTML (HyperText Markup Language) is the standard language for creating web pages.',
          'HTML uses tags (like <h1>, <p>, <img>) to define the structure and content of a page.',
          'Every website you\'ve ever visited — Google, YouTube, Wikipedia — is built with HTML at its core.',
        ],
      },
      {
        heading: 'Building a Page',
        bullets: [
          'Every HTML page starts with <!DOCTYPE html> and is wrapped in <html>, <head>, and <body> tags.',
          '<h1> to <h6> create headings (h1 is the biggest); <p> creates paragraphs.',
          '<img src="photo.jpg" alt="description"> inserts an image; <a href="url">text</a> creates a link.',
        ],
      },
      {
        heading: 'Lists, Tables & Semantic Tags',
        bullets: [
          '<ul> creates bulleted lists; <ol> creates numbered lists; each item goes in <li>.',
          '<table>, <tr>, <th>, <td> build structured data tables on your page.',
          'Semantic tags like <header>, <nav>, <main>, <footer> organize your page and improve accessibility.',
        ],
      },
    ],
    didYouKnow: 'HTML was invented by Tim Berners-Lee in 1991. He also invented the World Wide Web — all to help scientists share research papers!',
    assignment: [
      {
        question: 'What does HTML stand for?',
        options: [
          'High Tech Modern Language',
          'HyperText Markup Language',
          'Home Tool Markup Language',
          'Hyper Transfer Machine Language',
        ],
        correctIndex: 1,
        explanation: 'HTML stands for HyperText Markup Language — the foundational language for structuring web content.',
      },
      {
        question: 'Which tag creates the largest heading?',
        options: ['<h6>', '<p>', '<h1>', '<title>'],
        correctIndex: 2,
        explanation: '<h1> is the largest heading tag. Heading sizes decrease from h1 (largest) to h6 (smallest).',
      },
      {
        question: 'What does the <a> tag create?',
        options: ['An image', 'A paragraph', 'A hyperlink', 'A heading'],
        correctIndex: 2,
        explanation: 'The <a> (anchor) tag creates a hyperlink that users can click to navigate to another page or resource.',
      },
    ],
  },

  // ── Session 12 ───────────────────────────────────────────
  {
    id: 12,
    title: 'How Networks Connect the World',
    objective: 'Understand computer networks, the internet, IP addresses, and data transmission.',
    learn: [
      {
        heading: 'What Is a Network?',
        bullets: [
          'A computer network connects two or more devices so they can share data and resources.',
          'A LAN (Local Area Network) covers a small area like a school or home.',
          'A WAN (Wide Area Network) covers large areas — the internet is the world\'s biggest WAN.',
        ],
      },
      {
        heading: 'IP Addresses & Data Packets',
        bullets: [
          'Every device on a network has a unique IP address — like a postal address for digital mail.',
          'Data is broken into small chunks called "packets" that travel independently across the network.',
          'Routers direct packets to their destination, reassembling them when they arrive.',
        ],
      },
      {
        heading: 'Wi-Fi, Ethernet & Cloud',
        bullets: [
          'Ethernet uses physical cables for fast, reliable connections; Wi-Fi uses radio waves for wireless access.',
          'Cloud computing means storing and processing data on remote servers instead of your own computer.',
          'Services like Google Drive, Dropbox, and iCloud are all examples of cloud storage.',
        ],
      },
    ],
    didYouKnow: 'The internet backbone carries data at the speed of light through undersea fiber optic cables — some stretching over 10,000 kilometers across ocean floors!',
    assignment: [
      {
        question: 'What does LAN stand for?',
        options: ['Large Area Network', 'Local Area Network', 'Long Access Node', 'Link And Navigate'],
        correctIndex: 1,
        explanation: 'LAN stands for Local Area Network — a network covering a small, localized area like a building or campus.',
      },
      {
        question: 'What is an IP address?',
        options: [
          'A type of software',
          'A unique identifier for each device on a network',
          'A physical cable',
          'A brand of computer',
        ],
        correctIndex: 1,
        explanation: 'An IP address is a unique numeric identifier assigned to every device on a network, enabling data routing.',
      },
      {
        question: 'How does data travel across the internet?',
        options: [
          'As one large file',
          'Broken into small packets routed independently',
          'Only through Wi-Fi',
          'Through telephone voice calls',
        ],
        correctIndex: 1,
        explanation: 'Data is split into packets that travel different routes across the network and are reassembled at the destination.',
      },
    ],
  },

  // ── Session 13 ───────────────────────────────────────────
  {
    id: 13,
    title: 'Cybersecurity & Online Protection',
    objective: 'Learn about cyber threats, defense strategies, and how to protect yourself online.',
    learn: [
      {
        heading: 'Common Cyber Threats',
        bullets: [
          'Malware is harmful software — viruses, worms, trojans, and ransomware — designed to damage or steal.',
          'Phishing uses fake emails or websites to trick you into revealing passwords or personal information.',
          'Ransomware encrypts your files and demands payment to unlock them — never pay; report it.',
        ],
      },
      {
        heading: 'Defending Yourself',
        bullets: [
          'Use strong, unique passwords for every account and enable two-factor authentication (2FA) when available.',
          'Keep your operating system and software updated — updates often patch security vulnerabilities.',
          'Only download software from official sources; avoid clicking links in unexpected emails.',
        ],
      },
      {
        heading: 'Encryption & Privacy',
        bullets: [
          'Encryption scrambles data into unreadable code that can only be decoded with the correct key.',
          'HTTPS (the lock icon in your browser) means the website encrypts data between you and the server.',
          'Be careful what you share on social media — personal details can be used for identity theft.',
        ],
      },
    ],
    didYouKnow: 'The most common password in the world is still "123456." Hackers can crack it in less than one second!',
    assignment: [
      {
        question: 'What is phishing?',
        options: [
          'A type of fishing sport',
          'Fake emails or websites tricking you into revealing personal information',
          'A computer virus',
          'An encryption method',
        ],
        correctIndex: 1,
        explanation: 'Phishing uses deceptive emails, messages, or websites that impersonate trusted sources to steal your credentials.',
      },
      {
        question: 'What does the lock icon (HTTPS) in a browser mean?',
        options: [
          'The website is blocked',
          'Data between you and the website is encrypted',
          'The website is free to use',
          'Your computer is locked',
        ],
        correctIndex: 1,
        explanation: 'HTTPS means data is encrypted during transmission, protecting it from being intercepted by third parties.',
      },
      {
        question: 'Which is the strongest password?',
        options: ['password123', 'K9$mRt2!xL', 'abc', 'myname2024'],
        correctIndex: 1,
        explanation: 'K9$mRt2!xL is strong because it mixes uppercase/lowercase letters, numbers, and special characters randomly.',
      },
    ],
  },

  // ── Session 14 ───────────────────────────────────────────
  {
    id: 14,
    title: 'AI, Machine Learning & Computer Vision',
    objective: 'Explore how machine learning models are trained and how computers can "see" images.',
    learn: [
      {
        heading: 'Machine Learning Deep Dive',
        bullets: [
          'In supervised learning, you give the computer labeled examples: "this is a cat," "this is a dog" — it learns the difference.',
          'In unsupervised learning, the computer finds hidden patterns in unlabeled data on its own.',
          'The more quality data a model trains on, the more accurate its predictions become.',
        ],
      },
      {
        heading: 'Computer Vision — How Computers "See"',
        bullets: [
          'Computer vision teaches computers to interpret images and videos — detecting objects, faces, and text.',
          'Self-driving cars use computer vision to see traffic lights, pedestrians, and lane markings.',
          'Medical AI can analyze X-rays and MRI scans to help doctors detect diseases earlier.',
        ],
      },
      {
        heading: 'Natural Language Processing',
        bullets: [
          'NLP (Natural Language Processing) helps computers understand and generate human language.',
          'Chatbots, translation apps, and voice assistants all rely on NLP to understand what you say.',
          'Sentiment analysis uses NLP to determine if a review or comment is positive, negative, or neutral.',
        ],
      },
    ],
    didYouKnow: 'Google Translate processes over 100 billion words every day using AI-powered Natural Language Processing!',
    assignment: [
      {
        question: 'What is supervised learning?',
        options: [
          'A teacher watches the computer',
          'Training a model with labeled examples so it learns to predict',
          'The computer supervises students',
          'Learning without any data',
        ],
        correctIndex: 1,
        explanation: 'In supervised learning, the model trains on labeled data (inputs with known correct outputs) to learn mapping patterns.',
      },
      {
        question: 'What technology helps self-driving cars "see" the road?',
        options: ['Computer Vision', 'Spreadsheets', 'Email', 'Word Processing'],
        correctIndex: 0,
        explanation: 'Computer Vision processes camera and sensor data to identify objects, road markings, and obstacles in real time.',
      },
      {
        question: 'What does NLP stand for?',
        options: [
          'New Learning Program',
          'Natural Language Processing',
          'Network Link Protocol',
          'Normal Laptop Procedure',
        ],
        correctIndex: 1,
        explanation: 'NLP stands for Natural Language Processing — the AI field focused on enabling computers to understand human language.',
      },
    ],
  },

  // ── Session 15 ───────────────────────────────────────────
  {
    id: 15,
    title: 'AI Ethics & Responsible Innovation',
    objective: 'Examine the ethical implications of AI and learn to build technology responsibly.',
    learn: [
      {
        heading: 'Bias in AI',
        bullets: [
          'AI models can reflect biases present in their training data — if the data is unfair, the AI will be too.',
          'Example: a hiring AI trained on biased historical data might unfairly reject candidates from certain groups.',
          'Diverse teams and diverse datasets help reduce bias and build fairer AI systems.',
        ],
      },
      {
        heading: 'Privacy & Surveillance',
        bullets: [
          'Facial recognition technology can identify people in crowds — raising concerns about privacy and consent.',
          'Companies collect vast amounts of user data; understanding what data you share is crucial.',
          'Regulations like GDPR give people the right to know what data is collected and to request its deletion.',
        ],
      },
      {
        heading: 'Building AI Responsibly',
        bullets: [
          'Transparency means explaining how and why an AI makes a decision — no "black box" systems.',
          'Human oversight ensures AI recommendations are reviewed by people before taking critical actions.',
          'As future innovators, you have the power — and responsibility — to build technology that helps everyone.',
        ],
      },
    ],
    didYouKnow: 'The European Union\'s AI Act, passed in 2024, is the world\'s first comprehensive law regulating artificial intelligence!',
    assignment: [
      {
        question: 'What causes bias in AI systems?',
        options: [
          'The computer\'s color',
          'Biased or unrepresentative training data',
          'Using too many computers',
          'The programming language used',
        ],
        correctIndex: 1,
        explanation: 'AI learns from data — if the training data contains biases or underrepresents certain groups, the AI\'s decisions will reflect those biases.',
      },
      {
        question: 'What does "transparency" mean in AI?',
        options: [
          'Making the computer screen see-through',
          'Explaining how and why an AI makes its decisions',
          'Using clear fonts',
          'Sharing your password',
        ],
        correctIndex: 1,
        explanation: 'AI transparency means being open about how a system works, what data it uses, and why it produces specific outputs.',
      },
      {
        question: 'What is GDPR?',
        options: [
          'A programming language',
          'A regulation giving people rights over their personal data',
          'A type of AI model',
          'A social media platform',
        ],
        correctIndex: 1,
        explanation: 'GDPR (General Data Protection Regulation) is a European law that protects personal data and gives individuals control over their information.',
      },
    ],
  },

  // ── Session 16 ───────────────────────────────────────────
  {
    id: 16,
    title: 'Young Innovators Showcase',
    objective: 'Combine Python, Scratch, HTML, and AI knowledge into a capstone project and reflect on your journey.',
    learn: [
      {
        heading: 'Your Learning Journey',
        bullets: [
          'You\'ve mastered hardware, operating systems, algorithms, Python, HTML, databases, and more.',
          'You understand machine learning, computer vision, cybersecurity, and AI ethics.',
          'These aren\'t just school topics — they\'re the skills driving every major technology company today.',
        ],
      },
      {
        heading: 'The Capstone Project',
        bullets: [
          'Choose one: a Python program, an HTML website, an advanced Scratch game, or a combination project.',
          'Your project must include one AI-related feature or discussion (e.g., how AI could enhance your project).',
          'Present your project in 3–5 minutes: explain what you built, how it works, and what you learned.',
        ],
      },
      {
        heading: 'What\'s Next?',
        bullets: [
          'Grade 9\'s AI Specialist Track goes deeper into data science, neural networks, and real-world AI applications.',
          'Open-source communities and online platforms (GitHub, Kaggle, freeCodeCamp) let you keep learning for free.',
          'The tech industry needs innovators who build responsibly — that\'s exactly what you\'re becoming.',
        ],
      },
    ],
    didYouKnow: 'Many successful tech companies — including Apple, Google, and Amazon — were started by people who began learning to code as teenagers!',
    assignment: [
      {
        question: 'What should your capstone project include?',
        options: [
          'Only a drawing',
          'A project using your skills (Python/HTML/Scratch) plus one AI-related element',
          'A 50-page essay',
          'Only a PowerPoint with no project',
        ],
        correctIndex: 1,
        explanation: 'The capstone combines your technical skills with an AI component to demonstrate what you\'ve learned throughout the course.',
      },
      {
        question: 'Which programming language did you learn for text-based coding?',
        options: ['Java', 'Python', 'C++', 'Ruby'],
        correctIndex: 1,
        explanation: 'Python was the text-based programming language covered in this course — chosen for its readability and real-world popularity.',
      },
      {
        question: 'What is the next level after Young Innovators?',
        options: [
          'Little Coders',
          'AI Explorer Program',
          'AI Specialist Track (Grade 9)',
          'There is no next level',
        ],
        correctIndex: 2,
        explanation: 'The AI Specialist Track for Grade 9 covers advanced topics like data science, neural networks, and real-world AI applications.',
      },
    ],
  },
]

export default youngInnovatorsSessions
