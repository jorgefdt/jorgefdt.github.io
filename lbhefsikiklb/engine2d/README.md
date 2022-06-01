# Engine2d

## Elements

interface Simulable
  step()
  draw() // TODO remove drawAgentOnly()

// Separate movement from dynamics?
interface Moveable : Simulable
  pos
  vel
  vLimits

// No collisions, no shape (more than a circle)
interface Dynamic : Moveable
  mass
  acc
  f
  TODO remove rad
  // add color, to implement draw()?

interface Shaped : Moveable
  geometry
  bounds
  contains()
  color

// ---

class Agent : Dynamic
  step()

class Spring : Simulable
  p1
  p2
  elasticK
  dampeningK
  

class Particle : Dynamic
  bounceFromBodies()
  
class RigidBody : Dynamic, Shaped

class ElasticBody : Dynamic, Shaped



## Implemented features

## Todo

- spring damping is affecting other speed than the one colinear with the spring. 
- springs are misbehaving
- elasticbody breaks whith small reticulate

- add good collision detection
- particle energy should not increase by only interacting with passive env.
- add particle mass

- issue: unnatural buildup energy in the object due to the rounding errors that begins to violently shake and eventually blow the objects apart

## Some Physics Engines Features

Phisics Engine components:
  - Collision detection/response
  - Dynamic similator
  
features:
- Gravity
- Collision Detection
  - Mesh/collision geometry: bounding box/sphere, convex hull
  - Broad phase (bounding boxes) vs Narrow Phase (mesh).
  - Discrete vs continuous
- Rigid bodies dynamics
- Soft bodies dynamics
  - Particles
  - Liquids
  - Clothes

- environment with specific drag, friction, etc. 
  Defined in one geometrical area. eg, water; air.
  
- world:
  - contains objects and environments.
  - dynamic objects and kinematic objects

- engine:
  - drives all.
  - checks boundaries.
  - 
---
