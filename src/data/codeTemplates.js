// Starter code templates and metadata for the Code Portal IDE

export const SUPPORTED_LANGUAGES = [
  {
    id: 'python',
    name: 'Python (3.10)',
    monaco: 'python',
    extension: 'py',
    icon: '🐍',
    defaultFileName: 'main.py',
    defaultStdin: 'Deepantra\n2026',
    defaultCode: `# Python 3.10 Interactive Sandbox
import sys

def main():
    print("🚀 Welcome to Deepantra Code Portal!")
    name = input("Enter your name: ")
    year = input("Enter current year: ")
    print(f"Hello, {name}! Learning Python in {year} is amazing.")
    
    # Calculate Fibonacci Sequence
    print("\\nFibonacci numbers up to 10 terms:")
    a, b = 0, 1
    for _ in range(10):
        print(a, end=" ")
        a, b = b, a + b
    print()

if __name__ == "__main__":
    main()
`,
  },
  {
    id: 'java',
    name: 'Java (OpenJDK)',
    monaco: 'java',
    extension: 'java',
    icon: '☕',
    defaultFileName: 'Main.java',
    defaultStdin: '5\n12 45 78 23 99',
    defaultCode: `// Java OpenJDK 13+
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("☕ Java Code Portal Runner");
        
        System.out.print("Enter number of elements: ");
        if (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            int[] arr = new int[n];
            
            System.out.println("Reading " + n + " integers...");
            for (int i = 0; i < n; i++) {
                arr[i] = scanner.nextInt();
            }
            
            Arrays.sort(arr);
            System.out.println("Sorted array: " + Arrays.toString(arr));
            System.out.println("Maximum element: " + arr[n - 1]);
        } else {
            System.out.println("No input provided via stdin.");
        }
    }
}
`,
  },
  {
    id: 'cpp',
    name: 'C++ (GCC 9.2)',
    monaco: 'cpp',
    extension: 'cpp',
    icon: '⚡',
    defaultFileName: 'main.cpp',
    defaultStdin: '8',
    defaultCode: `// C++ Modern Program
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

// Compute factorial recursively
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "⚡ C++ High-Performance Execution" << endl;
    
    int n;
    cout << "Enter a number: ";
    if (cin >> n) {
        cout << "\\nFactorial of " << n << " is: " << factorial(n) << endl;
        
        vector<int> squares;
        for (int i = 1; i <= n; ++i) {
            squares.push_back(i * i);
        }
        
        cout << "Squares up to " << n << ": ";
        for (int sq : squares) cout << sq << " ";
        cout << endl;
    } else {
        cout << "Default test run (n=5): " << factorial(5) << endl;
    }
    
    return 0;
}
`,
  },
  {
    id: 'sql',
    name: 'SQL (SQLite)',
    monaco: 'sql',
    extension: 'sql',
    icon: '🗄️',
    defaultFileName: 'database.sql',
    defaultStdin: '',
    defaultCode: `-- SQL Database Sandbox
-- 1. Create a students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    grade INTEGER,
    track TEXT,
    xp INTEGER
);

-- 2. Insert sample student data
INSERT INTO students (name, grade, track, xp) VALUES 
    ('Aarav Sharma', 7, 'AI & Robotics', 450),
    ('Diya Patel', 8, 'Python & ML', 620),
    ('Kabir Verma', 6, 'Game Dev', 310),
    ('Ananya Iyer', 9, 'Full-Stack Coding', 780),
    ('Rohan Das', 7, 'Computational Logic', 510);

-- 3. Run queries to view formatted tables
SELECT 
    id AS Student_ID, 
    name AS Student_Name, 
    grade AS Grade, 
    track AS Learning_Track, 
    xp AS Total_XP
FROM students
WHERE xp >= 400
ORDER BY xp DESC;
`,
  },
];

export const CODE_SNIPPET_TEMPLATES = {
  python: [
    {
      title: 'Hello & Input',
      code: `name = input("Your name: ")\nprint(f"Welcome to Python, {name}!")`,
      stdin: 'Student',
    },
    {
      title: 'Two Sum Problem',
      code: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint("Indices:", two_sum([2, 7, 11, 15], 9))`,
      stdin: '',
    },
    {
      title: 'Matrix Multiplication',
      code: `A = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nC = [[sum(a * b for a, b in zip(row, col)) for col in zip(*B)] for row in A]\nfor r in C:\n    print(r)`,
      stdin: '',
    },
  ],
  java: [
    {
      title: 'Scanner Input & Output',
      code: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Hello, " + sc.next());\n    }\n}`,
      stdin: 'FutureMinds',
    },
    {
      title: 'Palindrome Checker',
      code: `public class Main {\n    public static boolean isPalindrome(String s) {\n        int i = 0, j = s.length() - 1;\n        while (i < j) {\n            if (s.charAt(i++) != s.charAt(j--)) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println("'racecar' is palindrome? " + isPalindrome("racecar"));\n        System.out.println("'hello' is palindrome? " + isPalindrome("hello"));\n    }\n}`,
      stdin: '',
    },
  ],
  cpp: [
    {
      title: 'Fast I/O & Vectors',
      code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n; cin >> n;\n    cout << "Value read: " << n << "\\n";\n    return 0;\n}`,
      stdin: '42',
    },
    {
      title: 'Binary Search',
      code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(const vector<int>& arr, int target) {\n    int l = 0, r = arr.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {1, 3, 5, 7, 9, 11, 13};\n    int idx = binarySearch(nums, 7);\n    cout << "Found 7 at index: " << idx << endl;\n    return 0;\n}`,
      stdin: '',
    },
  ],
  sql: [
    {
      title: 'Students & Grades Table',
      code: `CREATE TABLE marks (student TEXT, subject TEXT, score INT);\nINSERT INTO marks VALUES ('Aarav', 'AI', 95), ('Diya', 'Python', 99), ('Kabir', 'Math', 92);\nSELECT * FROM marks;`,
      stdin: '',
    },
    {
      title: 'Aggregate & GROUP BY',
      code: `CREATE TABLE sales (department TEXT, amount INT);\nINSERT INTO sales VALUES ('Tech', 5000), ('Design', 3000), ('Tech', 7000), ('Design', 4000);\nSELECT department, COUNT(*) AS count, SUM(amount) AS total, AVG(amount) AS average FROM sales GROUP BY department;`,
      stdin: '',
    },
  ],
};
