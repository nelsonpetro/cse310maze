import { Maze } from "./classes/Maze.js";
/**
 * Analyzes maze connectivity and path uniqueness
 * Tests whether there's always exactly one path between any two points
 */
function analyzeMazeConnectivity() {
    console.log("Maze Path Analysis");
    console.log("==================");
    // Test with different maze sizes
    const testSizes = [
        [5, 5],
        [10, 6],
        [8, 8]
    ];
    for (const [width, height] of testSizes) {
        console.log(`\nTesting ${width}x${height} maze:`);
        const maze = new Maze(width, height);
        maze.generateRecursiveBacktracking();
        // Test multiple random point pairs
        const testPairs = [
            [{ x: 0, y: 0 }, { x: width - 1, y: height - 1 }],
            [{ x: 0, y: height - 1 }, { x: width - 1, y: 0 }],
            [{ x: Math.floor(width / 2), y: 0 }, { x: Math.floor(width / 2), y: height - 1 }],
            [{ x: 0, y: Math.floor(height / 2) }, { x: width - 1, y: Math.floor(height / 2) }]
        ];
        for (let i = 0; i < testPairs.length; i++) {
            const [start, end] = testPairs[i];
            const dfsPath = maze.solveDFS(start, end);
            const bfsPath = maze.solveBFS(start, end);
            if (dfsPath && bfsPath) {
                const pathsMatch = comparePaths(dfsPath, bfsPath);
                console.log(`  Test ${i + 1}: (${start.x},${start.y}) → (${end.x},${end.y})`);
                console.log(`    DFS path length: ${dfsPath.length}`);
                console.log(`    BFS path length: ${bfsPath.length}`);
                console.log(`    Paths identical: ${pathsMatch}`);
                if (!pathsMatch && dfsPath.length !== bfsPath.length) {
                    console.log("    ⚠️  Different path lengths - multiple paths may exist!");
                }
            }
            else {
                console.log(`  Test ${i + 1}: No path found between (${start.x},${start.y}) and (${end.x},${end.y})`);
            }
        }
        // Display the maze for visual inspection
        console.log(`\nMaze structure:`);
        console.log(maze.toString());
        // Show connectivity statistics
        const stats = maze.getStatistics();
        console.log(`Connectivity ratio: ${(stats.connectivity * 100).toFixed(1)}%`);
    }
    console.log(`\n📚 Theory Explanation:`);
    console.log(`A maze generated using recursive backtracking creates a "perfect maze" or "simply connected maze".`);
    console.log(`This means:`);
    console.log(`  • There is exactly ONE path between any two accessible points`);
    console.log(`  • There are no loops or cycles in the maze`);
    console.log(`  • All cells are reachable from any starting point`);
    console.log(`  • DFS and BFS will find the SAME path (though DFS may not be shortest in steps)`);
}
/**
 * Compares two paths to see if they visit the same cells in the same order
 */
function comparePaths(path1, path2) {
    if (path1.length !== path2.length)
        return false;
    for (let i = 0; i < path1.length; i++) {
        const pos1 = path1[i];
        const pos2 = path2[i];
        if (pos1.x !== pos2.x || pos1.y !== pos2.y) {
            return false;
        }
    }
    return true;
}
// Run the analysis
analyzeMazeConnectivity();
//# sourceMappingURL=pathAnalysis.js.map