https://www.hackerrank.com/challenges/count-luck

TL;DR
Challenge consists of two parts:
1. We need to find shortest (and the only) path between A and B in the forest
2. We need to calculate number of times when there are more than one way from certain cell exist.
(you still have to read original text to understand the challenge, dont you?)

First part can be done by numerous ways (DFS, backtracking, your favorite graph search algorithm). I have chosen Dijkstra one.
Second part is trivial, just iterate over found path and increment sometimes.