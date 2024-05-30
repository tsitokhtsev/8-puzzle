[EN](#8-puzzle) [KA](#რვიანის-ამოცანა)

# 8-Puzzle

This project is a solution for the 8-puzzle problem using Vue 3 and TypeScript. The goal is to place the tiles in order by making sliding moves that use the empty space.

## Solution

The solution uses two algorithms to solve the puzzle: Breadth-First Search (BFS, uninformed) and A* Search Algorithm (informed). The BFS algorithm is a simple strategy in which a node is expanded along breadth of the tree. The A* algorithm is a more complex strategy that uses a heuristic - Manhattan distance.

The algorithms are implemented in the [`bfs.ts`](src/algorithms/bfs.ts) and [`aStar.ts`](src/algorithms/aStar.ts) files respectively. The puzzle board and the controls to solve the puzzle are implemented in the [`App.vue`](src/App.vue) component, along with the initial state.

## Requirements

- Node.js
- npm

## How to Use

Visit the [website](https://tsitokhtsev.github.io/8-puzzle/) or refer to the [project setup](#project-setup) to set up locally and:

1. Click the corresponding button to start BFS or A* algorithms.
2. Observe the execution process.
3. Yellow highlights the current node (state) and green highlights the solution.
4. The child nodes (states) are connected to the parents.
5. The initial state can be adjusted in the [`App.vue`](src/App.vue) component.

## Project Setup

1. Install the dependencies:
```sh
npm install
```
2. Run the application:
```sh
npm run dev
```
3. Follow the link from the terminal.

# რვიანის ამოცანა

ეს პროექტი არის რვიანის ამოცანის გადაწყვეტა Vue 3-ისა და TypeScript-ის გამოყენებით. მიზანი არის ფილების მოწესრიგება მათი ცარიელ ადგილზე გადაადგილებით.

## ამოხსნა

იმპლემენტაციაში გამოყენებულია ორი ალგორითმი ამოცანის გადასაჭრელად: განივი ძებნა (BFS) და A* ძიების ალგორითმი. BFS არის მარტივი სტრატეგია, რომელშიც კვანძების გახსნა ხდება ხის სიგანის გასწვრივ. A* ალგორითმი უფრო რთული სტრატეგიაა, რომელიც იყენებს ევრისტიკას - მანჰეტენის მანძილი.

ალგორითმების იმპლემენტაცია განთავსებულია [`bfs.ts`](src/algorithms/bfs.ts) და [`aStar.ts`](src/algorithms/aStar.ts) ფაილებში შესაბამისად. ამოცანის დაფა და მართვის მექანიზმი იმპლემენტირებულია [`App.vue`](src/App.vue) კომპონენტში, საწყის მდგომარეობასთან ერთად.

## მოთხოვნები

- Node.js
- npm

## გამოყენება

ეწვიეთ [ვებსაიტს](https://tsitokhtsev.github.io/8-puzzle/) ან მიმართეთ [პროექტის დაყენების](#პროექტის-დაყენება) ინსტრუქციას ლოკალურად დასაყენებლად და:

1. დააჭირეთ შესაბამის ღილაკს BFS ან A* ალგორითმის გასაშვებად.
2. დააკვირდით შესრულების პროცესს.
3. ყვითელი ფერით მონიშნულია მიმდინარე კვანძი (მდგომარეობა), ხოლო მწვანე ფერით - ამონახსნი.
4. შვილობილი კვანძები (მდგომარეობები) მშობლებთან დაკავშირებულია.
5. საწყისი მდგომარეობის შეცვლა შესაძლებელია [`App.vue`](src/App.vue) კომპონენტიდან.

## პროექტის დაყენება

1. დააინსტალირეთ პაკეტები:
```sh
npm install
```
2. გაუშვით აპლიკაცია:
```sh
npm run dev
```
3. მიჰყევით ბმულს ტერმინალიდან.
