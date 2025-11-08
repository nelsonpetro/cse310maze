# Overview

This software is a comprehensive maze generation and pathfinding application built entirely in TypeScript to demonstrate advanced language features including Object-Oriented Programming (OOP), recursion, enums, interfaces, generics, and type safety. The application creates perfect mazes using recursive backtracking algorithms and solves them using both Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms.

The purpose of writing this software was to explore and showcase TypeScript's powerful type system, advanced OOP concepts, and functional programming features while implementing complex algorithms. This project demonstrates how TypeScript enhances JavaScript with static typing, better IDE support, and improved code maintainability for large-scale applications. It serves as a practical example of using TypeScript for algorithmic problem-solving and data structure manipulation.

[Software Demo Video](https://youtu.be/OtRdcxACoRc)

# Development Environment

The development environment consisted of Visual Studio Code as the primary IDE, leveraging its excellent TypeScript IntelliSense support, integrated debugging, and Git integration. The project was built using Node.js (v18+) runtime environment with npm as the package manager. TypeScript compiler (tsc) was configured with strict type checking enabled, including advanced compiler options like `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and ES2022 module system.

The primary programming language used is **TypeScript 5.9.3**, which compiles to modern JavaScript (ESNext target). The project uses ES modules with `.js` file extensions for compiled output and employs advanced TypeScript features including:

- **Strict type system** with interfaces, enums, and mapped types
- **Generic functions** and type-safe collections
- **Object-oriented design** with classes, private properties, and inheritance patterns
- **Advanced compiler options** for maximum type safety and modern JavaScript features
- **Node.js built-in modules** (readline for async user input)
- **Zero external dependencies** - pure TypeScript/JavaScript implementation

The build system uses the TypeScript compiler with custom tsconfig.json configuration targeting modern JavaScript environments.

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/) - Comprehensive guide for TypeScript syntax, compiler options, and advanced features
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Essential reference for JavaScript fundamentals and Node.js APIs
- [Maze Generation Algorithms - Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm) - Detailed explanation of recursive backtracking and other maze generation techniques
- [Pathfinding Algorithms Tutorial](https://www.redblobgames.com/pathfinding/a-star/introduction.html) - Interactive guide to DFS, BFS, and advanced pathfinding algorithms
- [TypeScript Handbook - Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) - Deep dive into mapped types, conditional types, and generic constraints
- [Node.js Readline Documentation](https://nodejs.org/api/readline.html) - Reference for implementing async user input interfaces

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- **Web Interface Implementation** - Create a browser-based HTML5 Canvas visualization with interactive maze generation and real-time pathfinding animation
- **Advanced Pathfinding Algorithms** - Implement A\* (A-star), Dijkstra's algorithm, and Jump Point Search for performance comparison and optimal pathfinding
- **Alternative Maze Generation** - Add Kruskal's algorithm, Prim's algorithm, and Wilson's algorithm to compare different maze generation approaches
- **Performance Optimization** - Implement WebWorkers for large maze generation, add caching mechanisms, and optimize memory usage for massive grids
- **Enhanced Visualizations** - Add colored path highlighting, step-by-step algorithm animation, and export functionality for maze images
- **Unit Testing Suite** - Comprehensive Jest test coverage for all algorithms, edge cases, and TypeScript type validation
- **Configuration System** - JSON-based configuration files for algorithm parameters, maze styles, and rendering options
