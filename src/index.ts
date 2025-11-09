import { Maze } from "./classes/Maze.js";
import type { Position } from "./types/Position.js";
import * as readline from "readline";

async function runSimpleMaze(): Promise<void> {
  console.log("Maze Algorithm - Simple Version");
  console.log("======================================");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const width = await askQuestion(rl, "Enter maze width (3-20): ");
    const height = await askQuestion(rl, "Enter maze height (3-20): ");

    const mazeWidth = Math.max(3, Math.min(20, parseInt(width) || 5));
    const mazeHeight = Math.max(3, Math.min(20, parseInt(height) || 5));

    console.log(`\nCreating ${mazeWidth}x${mazeHeight} maze...`);
    const maze = new Maze(mazeWidth, mazeHeight);
    maze.generateRecursiveBacktracking();

    console.log("\nGenerated Maze:");
    console.log(maze.toString());

    const start: Position = { x: 0, y: 0 };
    const end: Position = { x: mazeWidth - 1, y: mazeHeight - 1 };

    console.log(
      `\nSolving from (${start.x}, ${start.y}) to (${end.x}, ${end.y})...\n`
    );
    console.log("1. DFS (Depth-First Search) Solution:");
    console.log("=====================================");
    const dfsStartTime = Date.now();
    const dfsPath = maze.solveDFS(start, end);
    const dfsTime = Date.now() - dfsStartTime;

    if (dfsPath) {
      console.log(`Path found! Length: ${dfsPath.length} steps`);
      console.log(`Time: ${dfsTime}ms`);
      console.log("\nMaze with DFS solution:");
      console.log(maze.toStringWithSolution(dfsPath, start, end));
    } else {
      console.log("No solution found with DFS");
    }

    maze.resetVisited();

    console.log("\n2. BFS (Breadth-First Search) Solution:");
    console.log("=======================================");
    const bfsStartTime = Date.now();
    const bfsPath = maze.solveBFS(start, end);
    const bfsTime = Date.now() - bfsStartTime;

    if (bfsPath) {
      console.log(`Path found! Length: ${bfsPath.length} steps`);
      console.log(`Time: ${bfsTime}ms`);
      console.log("\nMaze with BFS solution:");
      console.log(maze.toStringWithSolution(bfsPath, start, end));
    } else {
      console.log("No solution found with BFS");
    }

    if (dfsPath && bfsPath) {
      console.log("\n3. Algorithm Comparison:");
      console.log("=======================");
      console.log(`DFS: ${dfsPath.length} steps in ${dfsTime}ms`);
      console.log(`BFS: ${bfsPath.length} steps in ${bfsTime}ms`);

      if (bfsPath.length <= dfsPath.length) {
        console.log("BFS found a shorter or equal path (optimal)");
      } else {
        console.log("DFS found a shorter path (unusual for BFS)");
      }

      console.log("\nPath Comparison (● = DFS, ○ = BFS, ◆ = Both):");
      console.log(maze.toStringWithComparedPaths(dfsPath, bfsPath, start, end));
    }

    console.log("\n4. Maze Statistics:");
    console.log("==================");
    console.log(maze.getStatistics());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
}

function askQuestion(
  rl: readline.Interface,
  question: string
): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

if (import.meta.url.includes("index.js")) {
  runSimpleMaze();
}

export { runSimpleMaze };
