# The Boids

## Implemented features

- Arena: with walls, bouncing and repelling forces. 
- Agents: have position, speed, and applied forces. 
- Boids: Agents with flocking behaviour. 
  - cohesion
  - short range repulsion with same
  - alignment
  - avoid predators
  - dead Boids
- Predators: hunt Boids and rest. 
  - short range repulsion with same
- Bodies: non-agents that agents avoid, like obstacles. 

## Elements

Thing
  Body
  Agent
    Boid
    Predator
    

## Todo

- age and indicator (color?)
- energy and indicator (size?)
- food 
- use array primitives: 
    filter, map, reduce, every, some, includes, find
- wall should not have a force field... this should be decided bu the boid. 

## Perf

Each frame, many special searches are performed. 
Approximately:
n = nBoids * 4 + nPredators * 2

For a sim with 400 Boids and 3 predators, it is around 1600/frame, 
so around 100K/sec. 

Optimizing the spatial searches is fundamental. 


## PID usage example

source: https://github.com/philmod/node-pid-controller

´´´JavaScript
let pid = new Pid({p:1, i:0; d:0});
pid.setTarget(100);

let goalReached = false
while (!goalReached) {
  let output = measureSpeed();
  let suggestedForce  = pid.update(output);
  applyForce(suggestedForce);
  
  goalReached = (input === 0);
}
´´´

---

