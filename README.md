# verlettest
This is a simple physics engine that uses verlet integration to simulate particles that are constrained inside of a circle. Because verlet integration doesn't involve any randomness, and the particles are always starting with the same position and velocity, this simulation is deterministic. By tracking each particle's ID and coloring them based on their position (I used sine waves to create a gradient here) I can reset the simulation with each particle colored and have them all end up in the same positions with their proper colors.
This project uses HTML Canvas, CSS and JS. It is built off of my other project called "Chrononautical".
