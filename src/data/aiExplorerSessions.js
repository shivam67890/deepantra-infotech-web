/**
 * AI Explorer Program — 12 sessions (Grades 3–5, Beginner)
 *
 * Each session: learn (subsections + didYouKnow) + assignment (3 MCQs)
 */

const aiExplorerSessions = [
  // ── Session 1 ────────────────────────────────────────────
  {
    id: 1,
    title: 'Meet the Computer',
    objective: 'Understand what a computer is, what it does, and where we use computers every day.',
    learn: [
      {
        heading: 'What Is a Computer?',
        bullets: [
          'A computer is an electronic machine that takes in information, processes it, and gives us results.',
          'Computers follow instructions given by people — they cannot think on their own.',
          'The word "computer" originally meant a person who does calculations!',
        ],
      },
      {
        heading: 'Where Do We Use Computers?',
        bullets: [
          'Schools use computers for learning, libraries, and keeping student records.',
          'Hospitals use computers to keep patient files and help doctors see inside the body with X-rays.',
          'Even your TV remote and washing machine have tiny computers inside them.',
        ],
      },
      {
        heading: 'Parts You Can See',
        bullets: [
          'The monitor is the screen that shows pictures and text.',
          'The keyboard lets you type letters, numbers, and symbols.',
          'The mouse helps you point, click, and move things on the screen.',
        ],
      },
    ],
    didYouKnow: 'The first computer, ENIAC, was so big it filled an entire room — about the size of your classroom!',
    assignment: [
      {
        question: 'What is a computer?',
        options: [
          'A machine that can think and feel',
          'An electronic machine that processes information following instructions',
          'A toy that plays games',
          'A type of television',
        ],
        correctIndex: 1,
        explanation: 'A computer is an electronic machine that takes in data, processes it following instructions, and produces results.',
      },
      {
        question: 'Which of these is NOT a basic part of a computer?',
        options: ['Monitor', 'Keyboard', 'Refrigerator', 'Mouse'],
        correctIndex: 2,
        explanation: 'A refrigerator is a household appliance, not a computer part. Monitor, keyboard, and mouse are all standard computer components.',
      },
      {
        question: 'Where are computers used in a hospital?',
        options: [
          'Only for playing games',
          'For keeping patient records and helping with X-rays',
          'Computers are not used in hospitals',
          'Only for sending emails',
        ],
        correctIndex: 1,
        explanation: 'Hospitals use computers for patient records, X-ray imaging, scheduling, and many other medical tasks.',
      },
    ],
  },

  // ── Session 2 ────────────────────────────────────────────
  {
    id: 2,
    title: 'Inside the Machine',
    objective: 'Learn about hardware vs. software, storage devices, and how input/output works.',
    learn: [
      {
        heading: 'Hardware vs. Software',
        bullets: [
          'Hardware is any part of the computer you can touch — the keyboard, mouse, monitor, and the box (CPU cabinet).',
          'Software is the set of programs and instructions that tell the hardware what to do.',
          'Without software, hardware is like a car without a driver.',
        ],
      },
      {
        heading: 'Input and Output',
        bullets: [
          'Input devices send information INTO the computer — keyboard, mouse, microphone, and camera.',
          'Output devices show results FROM the computer — monitor, printer, and speakers.',
        ],
      },
      {
        heading: 'Storing Your Work',
        bullets: [
          'A hard drive stores everything on your computer, even when it is turned off.',
          'A USB flash drive (pen drive) is a small portable storage device you can carry in your pocket.',
          'Cloud storage lets you save files on the internet so you can access them from any device.',
        ],
      },
    ],
    didYouKnow: 'The first computer mouse was made of wood! Doug Engelbart invented it in 1964.',
    assignment: [
      {
        question: 'Which one is an example of software?',
        options: ['Keyboard', 'Microsoft Word', 'Monitor', 'Printer'],
        correctIndex: 1,
        explanation: 'Microsoft Word is a software program. The others are hardware — physical parts you can touch.',
      },
      {
        question: 'A microphone is an example of a(n) _____ device.',
        options: ['Output', 'Storage', 'Input', 'Processing'],
        correctIndex: 2,
        explanation: 'A microphone sends your voice INTO the computer, making it an input device.',
      },
      {
        question: 'Where can you save files so you can open them from any device?',
        options: ['Only on a USB drive', 'Only on the hard drive', 'Cloud storage', 'On a floppy disk'],
        correctIndex: 2,
        explanation: 'Cloud storage saves your files on the internet so they can be accessed from any device with an internet connection.',
      },
    ],
  },

  // ── Session 3 ────────────────────────────────────────────
  {
    id: 3,
    title: 'Keyboard & Mouse Mastery',
    objective: 'Build confidence using the keyboard and mouse for typing, clicking, and shortcuts.',
    learn: [
      {
        heading: 'Getting to Know the Keyboard',
        bullets: [
          'The keyboard has letter keys (A–Z), number keys (0–9), and special keys like Enter, Space, and Backspace.',
          'The Home Row keys (ASDF JKL;) are where your fingers rest when you learn to type properly.',
          'Function keys (F1–F12) at the top do special jobs depending on the program you are using.',
        ],
      },
      {
        heading: 'Mouse Basics',
        bullets: [
          'A single click selects something; a double click opens it.',
          'Right-clicking shows a menu with extra options like copy, paste, and rename.',
          'Drag and drop means holding the left button while moving the mouse to move an object on screen.',
        ],
      },
      {
        heading: 'Handy Keyboard Shortcuts',
        bullets: [
          'Ctrl + C copies selected text or a file; Ctrl + V pastes it.',
          'Ctrl + Z undoes your last action — like a magic "undo" button!',
          'Ctrl + S saves your work so you do not lose it.',
        ],
      },
    ],
    didYouKnow: 'The QWERTY keyboard layout was designed in 1873 for typewriters — and we still use it today on computers and phones!',
    assignment: [
      {
        question: 'What does Ctrl + Z do?',
        options: ['Saves your file', 'Undoes your last action', 'Copies text', 'Closes the window'],
        correctIndex: 1,
        explanation: 'Ctrl + Z is the universal "undo" shortcut — it reverses your most recent action.',
      },
      {
        question: 'What happens when you double-click a file on the desktop?',
        options: ['It gets deleted', 'It opens', 'It gets copied', 'Nothing happens'],
        correctIndex: 1,
        explanation: 'Double-clicking a file tells the computer to open it with the default program.',
      },
      {
        question: 'Which keys make up the Home Row for typing?',
        options: ['QWERTY', 'ASDF JKL;', 'ZXCV', '1234'],
        correctIndex: 1,
        explanation: 'ASDF JKL; are the Home Row keys where your fingers rest for proper touch typing.',
      },
    ],
  },

  // ── Session 4 ────────────────────────────────────────────
  {
    id: 4,
    title: 'Organizing Your Digital Desk',
    objective: 'Learn how to navigate Windows, manage files and folders, and keep your work organized.',
    learn: [
      {
        heading: 'The Desktop & Taskbar',
        bullets: [
          'The Desktop is the first screen you see after the computer starts — it shows shortcuts, files, and a wallpaper.',
          'The Taskbar at the bottom shows open programs, the Start menu, and the clock.',
          'You can pin your favorite programs to the Taskbar for quick access.',
        ],
      },
      {
        heading: 'Files and Folders',
        bullets: [
          'A file is a single document — like a photo, a Word document, or a song.',
          'A folder is like a digital box that holds related files together.',
          'You can create folders inside folders to keep things super organized, just like drawers in a cupboard.',
        ],
      },
      {
        heading: 'Managing Your Files',
        bullets: [
          'Right-click in a folder and choose "New → Folder" to create a new folder.',
          'Rename a file or folder by right-clicking and selecting "Rename."',
          'Deleted files go to the Recycle Bin first — you can restore them if you change your mind.',
        ],
      },
    ],
    didYouKnow: 'The Windows operating system got its name because every program runs inside its own "window" on screen!',
    assignment: [
      {
        question: 'What is a folder on a computer?',
        options: [
          'A type of software',
          'A container that groups related files together',
          'A picture on the desktop',
          'A special keyboard key',
        ],
        correctIndex: 1,
        explanation: 'A folder groups related files together — just like a physical folder holds papers.',
      },
      {
        question: 'Where do deleted files go first?',
        options: ['They are gone forever', 'The Recycle Bin', 'The Documents folder', 'The Desktop'],
        correctIndex: 1,
        explanation: 'Deleted files move to the Recycle Bin first. You can restore them or permanently delete them from there.',
      },
      {
        question: 'What does the Taskbar show?',
        options: [
          'Only the time',
          'Open programs, the Start menu, and the clock',
          'Your homework files',
          'Nothing',
        ],
        correctIndex: 1,
        explanation: 'The Taskbar displays open programs, the Start menu button, system tray icons, and the clock.',
      },
    ],
  },

  // ── Session 5 ────────────────────────────────────────────
  {
    id: 5,
    title: 'Digital Art with Paint & Tux Paint',
    objective: 'Express creativity using digital drawing tools and explore basic graphic design.',
    learn: [
      {
        heading: 'Getting Started with MS Paint',
        bullets: [
          'MS Paint is a free drawing program that comes with Windows.',
          'Use the Pencil tool for freehand drawing and the Brush tool for thicker strokes.',
          'The Fill (paint bucket) tool fills an enclosed area with a color in one click.',
        ],
      },
      {
        heading: 'Shapes, Colors & Text',
        bullets: [
          'You can draw rectangles, circles, triangles, and lines using the Shapes toolbar.',
          'The Color Picker lets you choose any color from the palette or create custom colors.',
          'The Text tool (A) lets you type words directly onto your drawing.',
        ],
      },
      {
        heading: 'Fun with Tux Paint',
        bullets: [
          'Tux Paint is a free drawing program designed especially for kids with fun stamps and sound effects.',
          'It has magic tools like rainbow brushes, sparkle effects, and kaleidoscope patterns.',
          'You can save your artwork and share it with classmates or print it out.',
        ],
      },
    ],
    didYouKnow: 'Tux Paint is named after "Tux," the Linux penguin mascot. It has been translated into over 100 languages!',
    assignment: [
      {
        question: 'What does the Fill (paint bucket) tool do in MS Paint?',
        options: [
          'Draws a straight line',
          'Fills an enclosed area with a color',
          'Erases everything',
          'Adds text to the drawing',
        ],
        correctIndex: 1,
        explanation: 'The Fill tool floods an enclosed region with the selected color in one click.',
      },
      {
        question: 'Which program has "magic" brushes like rainbow and sparkle?',
        options: ['MS Word', 'Tux Paint', 'Calculator', 'Notepad'],
        correctIndex: 1,
        explanation: 'Tux Paint is the kid-friendly drawing app famous for its magic brushes, stamps, and sound effects.',
      },
      {
        question: 'Which tool lets you type words onto a drawing in MS Paint?',
        options: ['Brush tool', 'Eraser', 'Text tool (A)', 'Magnifier'],
        correctIndex: 2,
        explanation: 'The Text tool, shown as "A" in the toolbar, lets you add typed text anywhere on your canvas.',
      },
    ],
  },

  // ── Session 6 ────────────────────────────────────────────
  {
    id: 6,
    title: 'Writing with MS Word',
    objective: 'Create, format, and save documents using Microsoft Word.',
    learn: [
      {
        heading: 'Creating a New Document',
        bullets: [
          'Open MS Word and click "Blank Document" to start a new page.',
          'The blinking line (cursor) shows where your text will appear when you start typing.',
          'Use Ctrl + S often to save your work — give your file a clear name so you can find it later.',
        ],
      },
      {
        heading: 'Formatting Text',
        bullets: [
          'Select text and use Bold (Ctrl + B), Italic (Ctrl + I), or Underline (Ctrl + U) to change its appearance.',
          'You can change the font style and size from the Home tab to make headings bigger than body text.',
          'Font color and highlighting let you draw attention to important words.',
        ],
      },
      {
        heading: 'Inserting Extras',
        bullets: [
          'The Insert tab lets you add pictures, shapes, and tables to your document.',
          'Page borders and watermarks add a polished, professional look.',
          'Spell-check (red wavy underlines) helps catch typing mistakes automatically.',
        ],
      },
    ],
    didYouKnow: 'Microsoft Word was first released in 1983 — older than most of your parents\' first computers!',
    assignment: [
      {
        question: 'What keyboard shortcut makes text Bold in MS Word?',
        options: ['Ctrl + U', 'Ctrl + I', 'Ctrl + B', 'Ctrl + S'],
        correctIndex: 2,
        explanation: 'Ctrl + B toggles bold formatting on the selected text.',
      },
      {
        question: 'Where can you add a picture to your Word document?',
        options: ['File tab', 'Insert tab', 'View tab', 'Review tab'],
        correctIndex: 1,
        explanation: 'The Insert tab contains options for adding pictures, shapes, tables, and other media.',
      },
      {
        question: 'What do red wavy underlines in Word usually mean?',
        options: [
          'The text is bold',
          'There might be a spelling mistake',
          'The font is too small',
          'The file is saved',
        ],
        correctIndex: 1,
        explanation: 'Red wavy underlines flag possible spelling errors so you can review and correct them.',
      },
    ],
  },

  // ── Session 7 ────────────────────────────────────────────
  {
    id: 7,
    title: 'Coding with Scratch',
    objective: 'Learn block-based programming by creating a simple animated project in Scratch.',
    learn: [
      {
        heading: 'What Is Scratch?',
        bullets: [
          'Scratch is a free visual programming language created by MIT where you snap colorful blocks together to make programs.',
          'Instead of typing code, you drag and connect blocks — like building with LEGO.',
          'Millions of kids around the world use Scratch to make stories, games, and animations.',
        ],
      },
      {
        heading: 'The Scratch Interface',
        bullets: [
          'The Stage is where your project plays — sprites (characters) move and interact here.',
          'The Block Palette on the left groups blocks by color: blue for Motion, purple for Looks, yellow for Events, etc.',
          'The Scripts Area in the middle is where you drag and snap blocks to build your program.',
        ],
      },
      {
        heading: 'Your First Program',
        bullets: [
          'Start with a "When green flag clicked" event block — this tells Scratch to begin.',
          'Add a "move 10 steps" block to make your sprite walk across the stage.',
          'Use a "say Hello! for 2 seconds" block to make your sprite talk — you just wrote your first program!',
        ],
      },
    ],
    didYouKnow: 'Scratch was created at MIT in 2007 and now has over 100 million projects shared by kids worldwide!',
    assignment: [
      {
        question: 'How do you write programs in Scratch?',
        options: [
          'By typing long text code',
          'By dragging and snapping colorful blocks together',
          'By drawing pictures',
          'By recording your voice',
        ],
        correctIndex: 1,
        explanation: 'Scratch uses visual, snap-together blocks instead of typed code, making programming accessible for beginners.',
      },
      {
        question: 'What does the "When green flag clicked" block do?',
        options: [
          'Stops the program',
          'Starts the program when the green flag is clicked',
          'Deletes the sprite',
          'Changes the background color',
        ],
        correctIndex: 1,
        explanation: 'This event block is the starting trigger — it tells Scratch to begin running your program when you click the green flag.',
      },
      {
        question: 'What is a "sprite" in Scratch?',
        options: [
          'A type of drink',
          'A character or object that appears on the stage',
          'A keyboard shortcut',
          'A folder on your computer',
        ],
        correctIndex: 1,
        explanation: 'In Scratch, a sprite is any character or object that you can program to move, speak, and interact on the stage.',
      },
    ],
  },

  // ── Session 8 ────────────────────────────────────────────
  {
    id: 8,
    title: 'Presenting with PowerPoint',
    objective: 'Create an engaging presentation with slides, images, and animations.',
    learn: [
      {
        heading: 'Creating Slides',
        bullets: [
          'PowerPoint presentations are made up of individual slides — like pages in a flipbook.',
          'Click "New Slide" to add more slides; choose a layout that fits your content (title, content, blank).',
          'Keep each slide focused on one idea — too much text makes slides hard to read.',
        ],
      },
      {
        heading: 'Adding Visuals',
        bullets: [
          'Use the Insert tab to add pictures, clip art, or shapes that support your message.',
          'SmartArt lets you create professional-looking diagrams and flowcharts with a few clicks.',
          'Consistent fonts and colors across slides make your presentation look polished.',
        ],
      },
      {
        heading: 'Animations & Presenting',
        bullets: [
          'Animations make objects appear, move, or disappear — use them sparingly so they don\'t distract.',
          'Slide transitions control how one slide changes to the next (fade, wipe, push).',
          'Press F5 to start your slideshow from the beginning and use arrow keys to advance.',
        ],
      },
    ],
    didYouKnow: 'PowerPoint was originally called "Presenter" and was first made for Apple Macintosh computers in 1987!',
    assignment: [
      {
        question: 'What should you put on each PowerPoint slide?',
        options: [
          'As much text as possible',
          'One main idea with supporting visuals',
          'Only pictures, no text',
          'Only the title, nothing else',
        ],
        correctIndex: 1,
        explanation: 'Good presentations focus each slide on one main idea with visuals, keeping text concise and readable.',
      },
      {
        question: 'What key starts a PowerPoint slideshow from the beginning?',
        options: ['F1', 'F5', 'Ctrl + S', 'Esc'],
        correctIndex: 1,
        explanation: 'Pressing F5 starts the slideshow from the first slide so your audience can see the full presentation.',
      },
      {
        question: 'What does SmartArt help you create?',
        options: [
          'Spelling corrections',
          'Professional diagrams and flowcharts',
          'New folders',
          'Virus scans',
        ],
        correctIndex: 1,
        explanation: 'SmartArt provides ready-made layouts for diagrams, lists, hierarchies, and flowcharts.',
      },
    ],
  },

  // ── Session 9 ────────────────────────────────────────────
  {
    id: 9,
    title: 'Exploring the Internet Safely',
    objective: 'Understand how the internet works and learn to browse safely and responsibly.',
    learn: [
      {
        heading: 'What Is the Internet?',
        bullets: [
          'The internet is a global network that connects millions of computers so they can share information.',
          'A web browser (like Chrome, Edge, or Firefox) is the program you use to visit websites.',
          'Every website has a unique address called a URL — like "www.google.com."',
        ],
      },
      {
        heading: 'Searching Smartly',
        bullets: [
          'Search engines like Google help you find information by typing keywords.',
          'Using specific keywords gives better results — "Indian festivals for kids" works better than just "festivals."',
          'Not everything online is true — check information on more than one website before believing it.',
        ],
      },
      {
        heading: 'Staying Safe Online',
        bullets: [
          'Never share personal information like your full name, address, school name, or phone number with strangers online.',
          'If something online makes you uncomfortable, tell a parent or teacher right away.',
          'Strong passwords have a mix of letters, numbers, and symbols — don\'t use your birthday or pet\'s name!',
        ],
      },
    ],
    didYouKnow: 'The very first website ever made is still online! It was created in 1991 by Tim Berners-Lee at CERN in Switzerland.',
    assignment: [
      {
        question: 'What is a web browser?',
        options: [
          'A type of virus',
          'A program used to visit websites',
          'A keyboard shortcut',
          'A type of file',
        ],
        correctIndex: 1,
        explanation: 'A web browser is the software (like Chrome or Firefox) that lets you navigate and view websites.',
      },
      {
        question: 'Which of these is safe to share online with strangers?',
        options: [
          'Your home address',
          'Your school name',
          'Your favorite color',
          'Your phone number',
        ],
        correctIndex: 2,
        explanation: 'General preferences like your favorite color are safe. Never share personal details like your address, school, or phone number.',
      },
      {
        question: 'What makes a strong password?',
        options: [
          'Your name and birthday',
          'The word "password"',
          'A mix of letters, numbers, and symbols',
          'Just numbers like 123456',
        ],
        correctIndex: 2,
        explanation: 'Strong passwords combine uppercase and lowercase letters, numbers, and special symbols to be hard to guess.',
      },
    ],
  },

  // ── Session 10 ───────────────────────────────────────────
  {
    id: 10,
    title: 'Discovering AI',
    objective: 'Understand what Artificial Intelligence is and see how it is already part of daily life.',
    learn: [
      {
        heading: 'What Is Artificial Intelligence?',
        bullets: [
          'AI stands for Artificial Intelligence — it means teaching computers to do tasks that normally need human thinking.',
          'AI can recognize faces in photos, understand spoken words, and even suggest what you might like to watch next.',
          'AI is NOT a robot with feelings — it follows patterns in data to make predictions.',
        ],
      },
      {
        heading: 'AI in Your Everyday Life',
        bullets: [
          'Voice assistants like Alexa and Google Assistant use AI to understand your questions and give answers.',
          'Auto-correct on your phone uses AI to predict what word you want to type next.',
          'Video games use AI to control characters that are not played by real people (NPCs).',
        ],
      },
      {
        heading: 'How Do Computers "Learn"?',
        bullets: [
          'Machine Learning is a type of AI where computers learn from examples — the more examples, the better they get.',
          'Imagine showing a computer 1,000 pictures of cats and dogs — it learns to tell them apart by finding patterns.',
          'This is called "training" a model — like how you practice math to get better at it.',
        ],
      },
    ],
    didYouKnow: 'The term "Artificial Intelligence" was first used in 1956 at a conference at Dartmouth College in the USA!',
    assignment: [
      {
        question: 'What does AI stand for?',
        options: ['Always Intelligent', 'Artificial Intelligence', 'Automatic Internet', 'Advanced Information'],
        correctIndex: 1,
        explanation: 'AI stands for Artificial Intelligence — technology that enables computers to perform tasks requiring human-like reasoning.',
      },
      {
        question: 'Which of these uses AI?',
        options: ['A simple calculator', 'Voice assistants like Alexa', 'A paper notebook', 'A wall clock'],
        correctIndex: 1,
        explanation: 'Voice assistants use AI to understand spoken language, process your question, and provide an answer.',
      },
      {
        question: 'How does Machine Learning work?',
        options: [
          'Computers are born knowing everything',
          'Computers learn from examples and find patterns in data',
          'A person types every answer into the computer',
          'Computers copy answers from the internet',
        ],
        correctIndex: 1,
        explanation: 'Machine Learning works by feeding computers many examples so they can find patterns and make predictions on new data.',
      },
    ],
  },

  // ── Session 11 ───────────────────────────────────────────
  {
    id: 11,
    title: 'Being a Responsible Digital Citizen',
    objective: 'Learn about online safety, digital etiquette, and responsible technology use.',
    learn: [
      {
        heading: 'What Is Digital Citizenship?',
        bullets: [
          'A digital citizen is anyone who uses the internet and digital devices — that includes you!',
          'Being a good digital citizen means being kind, respectful, and safe online, just like in real life.',
          'The things you post online can stay there forever, so always think before you share.',
        ],
      },
      {
        heading: 'Cyberbullying & Kindness',
        bullets: [
          'Cyberbullying means using technology to hurt, embarrass, or scare someone — it is never okay.',
          'If you see bullying online, don\'t join in — tell a trusted adult and support the person being bullied.',
          'Use the "Grandma Test": if you wouldn\'t say it in front of your grandmother, don\'t type it online.',
        ],
      },
      {
        heading: 'Screen Time & Balance',
        bullets: [
          'Too much screen time can make your eyes tired and affect your sleep.',
          'Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
          'Balance technology with outdoor play, reading, hobbies, and spending time with family.',
        ],
      },
    ],
    didYouKnow: 'Studies show that kids who take regular breaks from screens actually perform better on memory and learning tasks!',
    assignment: [
      {
        question: 'What is the "Grandma Test" for online behavior?',
        options: [
          'Ask your grandma to use the computer for you',
          'If you wouldn\'t say it in front of your grandma, don\'t type it online',
          'Only use the computer at your grandma\'s house',
          'Send everything to your grandma first',
        ],
        correctIndex: 1,
        explanation: 'The Grandma Test is a simple guide — if you wouldn\'t say something to your grandma\'s face, it\'s not appropriate to post online.',
      },
      {
        question: 'What is the 20-20-20 rule?',
        options: [
          'Use the computer for only 20 minutes a day',
          'Every 20 minutes, look 20 feet away for 20 seconds',
          'Type 20 words per minute',
          'Take 20 breaks every 20 hours',
        ],
        correctIndex: 1,
        explanation: 'The 20-20-20 rule helps reduce eye strain: every 20 minutes, focus on something 20 feet away for 20 seconds.',
      },
      {
        question: 'What should you do if you see cyberbullying?',
        options: [
          'Join in so you\'re not left out',
          'Ignore it completely',
          'Tell a trusted adult and support the person being bullied',
          'Share it with more people',
        ],
        correctIndex: 2,
        explanation: 'The right response is to not participate, tell a trusted adult, and offer support to the person being targeted.',
      },
    ],
  },

  // ── Session 12 ───────────────────────────────────────────
  {
    id: 12,
    title: 'Your AI Explorer Showcase',
    objective: 'Combine everything you\'ve learned into a capstone mini-project and reflect on your journey.',
    learn: [
      {
        heading: 'Looking Back at Your Journey',
        bullets: [
          'You started by learning what a computer is and its parts — now you can use one confidently!',
          'You\'ve created digital art, written documents, built Scratch programs, and even learned about AI.',
          'Every expert was once a beginner — the skills you\'ve built are the foundation for everything that comes next.',
        ],
      },
      {
        heading: 'The Capstone Challenge',
        bullets: [
          'Create a short presentation (3–5 slides) that teaches someone else one thing you learned in this course.',
          'Include at least one picture (drawn in Paint or found with a safe image search) and one fun fact.',
          'Bonus: add a Scratch animation or a short "AI in daily life" example to make it interactive.',
        ],
      },
      {
        heading: 'What Comes Next?',
        bullets: [
          'In the Young Innovators course (Grades 6–8), you\'ll learn Python programming, build websites, and explore AI deeper.',
          'Keep practicing your Scratch skills — try making a game or an animated story at home.',
          'Remember: technology is a tool to create, learn, and help others. Use it wisely!',
        ],
      },
    ],
    didYouKnow: 'Many famous tech leaders — including the founders of Google, Facebook, and Apple — started learning about computers when they were your age!',
    assignment: [
      {
        question: 'What is the capstone challenge about?',
        options: [
          'Taking a final exam with 100 questions',
          'Creating a short presentation teaching someone one thing you learned',
          'Memorizing all the keyboard shortcuts',
          'Writing a 10-page essay',
        ],
        correctIndex: 1,
        explanation: 'The capstone is a mini-project where you create a 3–5 slide presentation sharing something you learned.',
      },
      {
        question: 'Which tool did you learn for block-based programming?',
        options: ['MS Word', 'Scratch', 'MS Paint', 'PowerPoint'],
        correctIndex: 1,
        explanation: 'Scratch is the block-based programming language you used to create animations and simple programs.',
      },
      {
        question: 'What course comes after AI Explorer for older students?',
        options: [
          'Little Coders',
          'Young Innovators AI (Grades 6–8)',
          'AI Explorer Advanced',
          'There is no next course',
        ],
        correctIndex: 1,
        explanation: 'The Young Innovators AI program for Grades 6–8 is the next step, covering Python, web development, and deeper AI topics.',
      },
    ],
  },
]

export default aiExplorerSessions
