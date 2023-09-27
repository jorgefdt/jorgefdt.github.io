const siteConfig = {
  projectWidth: 400,
};
const projects = [
  {
    "name": "Balance Lab (2022-2023)",
    "description": [
      "Simulation and test bench designed to try different algorithms and strategies to balance physical bodies and mechanisms, including inverted pendulums, and eventually bipedal walking robots.",
      "This lab provides tools to add disturbances, stability metrics, charts, etc. It runs on browsers, including mobile devices.",
      "This is part of a long term project aiming to produce dynamically balanced bipedal robots.",
      "Built using <span class=\"name\">matter-js</span>, <span class=\"name\">chart.js</span>, <span class=\"name\">Bulma</span> on <span class=\"name\">iOS</span>.",
    ],
    "media": [
      {
        "type": "image",
        "url": "./projects/balance-lab/page-pendulum-tall.jpg",
        "whRatio": 0.58,
      },
      {
        "type": "image",
        "url": "./projects/balance-lab/page-ramp-tall.jpg"
      },
      {
        "type": "image",
        "url": "./projects/balance-lab/page-leg-tall.jpg"
      },
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/fjnPDdvWm_s?playlist=fjnPDdvWm_s&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.57,
      },
    ]
  },
  {
    "name": "Laser Scanner v1 (July 2023)",
    "description": [
      "Who does not like quickly moving lasers? :)",
      "This project is inspired in classical galvo-based laser scanners used to drive laser shows. Instead of galvanometers, I'm using cheap, slow, and reliable stepper motors.",
      "I'm also using IR reflectance sensors to help the homing process, and finally this is all printed using my <span class=\"name\">Prusa MK3S</span> 3d-printer and designed with <span class=\"name\">Shapr3D</span>.",
    ],
    "media": [
      {
        "type": "image",
        "url": "./projects/laser-scanner/front.png",
        "whRatio": 1.3,
      },
      {
        "type": "image",
        "url": "./projects/laser-scanner/front-w-lasers.png",
      },
      {
        "type": "image",
        "url": "./projects/laser-scanner/mounted-proto.jpg",
      },
    ]
  },  
  {
    "name": "Energency Box with metrics (August 2023)",
    "description": [
      "After some years without 3D printing I wanted a small project to warm up.",
      "This box functions as a direct plu-n-play with existing power lines in my lab, ready for fast power",
      "cut on emergencies, a configurable fuse, and load metrics.",
      "Built using my <span class=\"name\">Prusa MK3S</span> 3d-printer and <span class=\"name\">Shapr3D</span>, as 3D modeling tool.",
    ],
    "media": [
      {
        "type": "image",
        "url": "./projects/e-box/IMG_6690.jpeg",
        "whRatio": 1.4,
      },
      {
        "type": "image",
        "url": "./projects/e-box/IMG_6614.jpeg",
      },
    ]
  },
  {
    "name": "Inverted Pendulum and balancers (2021-2023)",
    "description": [
      "Different inverted pendulums implementations, self-balancing robot, and simulations on <span class=\"name\">Webots</span> robotic simulation framework.",
      "This is part of a long term project aiming to produce dynamically balanced bipedal robots.",
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/mde0Y6brTmM?playlist=mde0Y6brTmM&autoplay=1&mute=1&loop=1&controls=0"
      },
      {
        "type": "image",
        "url": "./projects/inverted-pendulum/IMG_1220.JPG",
        "whRatio": 1.3,
      },
      {
        "type": "image",
        "url": "./projects/inverted-pendulum/IMG_1711.png"
      },
      {
        "type": "image",
        "url": "./projects/inverted-pendulum/IMG_6692.jpg",
        "whRatio": 0.7,
      },
    ]
  },
  {
    "name": "Perlin Noise Fields (2022)",
    "description": "Random fields simulations based on Perlin noise. 3D graphics on <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/5hC8sITqggg?playlist=5hC8sITqggg&autoplay=1&mute=1&loop=1&controls=0"
      },
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/JRhTse4jD-M?playlist=JRhTse4jD-M&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.50,
      },
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/aEiKhg_Zjys?playlist=aEiKhg_Zjys&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.50,
      },
    ]
  },
  {
    "name": "Double-Scara Robot (2022)",
    "description": [
      "Pentagon/double scara robot analysis/sims and design.",
      "Built with <span class=\"name\">Java</span> + <span class=\"name\">Processing</span> on <span class=\"name\">iOS</span>.",
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/5lmzWd7J-Dw?playlist=5lmzWd7J-Dw&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 1.33,
      },
      {
        "type": "image",
        "url": "./projects/double-scara-robot/IMG_1392.JPG"
      },
      {
        "type": "image",
        "url": "./projects/double-scara-robot/2scara-singularities.PNG",
        "whRatio": 1.33,
      },
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/R_AIzCTYBNs?playlist=R_AIzCTYBNs&autoplay=1&mute=1&loop=1&controls=0",
        "overlay": "This is not my project, but an inspiration.",
      },
    ]
  },
  {
    "name": "Sensors/hand tracking/stereoscopic vision experiments",
    "description": "Sensor devices experimentation and alpha testing (<span class=\"name\">LEAP</span>, <span class=\"name\">MIO</span>, <span class=\"name\">OpenCV</span> AI Kit).",
    "media": [
      {
        "type": "image",
        "url": "projects/sensors-and-tracking/sensor-devices-screen.png"
      }
    ]
  },
  {
    "name": "Tooling",
    "description": "My To-do textual notation (<span class=\"name\">Markdown</span>) rendered to <span class=\"name\">Trello</span>-like UI. <span class=\"name\">Java</span> server + plain <span class=\"name\">HTML</span>/<span class=\"name\">CSS</span>/<span class=\"name\">JavaScript</span>.",
    "media": [
      {
        "type": "image",
        "url": "projects/tooling/tooling.png"
      }
    ]
  },
  {
    "name": "Cubes-City (2022)",
    "description": "Interesting optimization algorithm visualization. <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/oKMlH6lvHQg?playlist=oKMlH6lvHQg&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.6,
      }
    ]
  },
  {
    "name": "HAL-9001 (2020)",
    "description": [
        "<span class=\"name\">2001 Space Odyssey</span> 3D printed HAL-9000 replica with a voice assistant (TBD - meant to be <span class=\"name\">Mycroft AI</span>).",
        "Original size, from the movie blueprints; eBay lens.",
      ],
      "media": [
      {
        "type": "image",
        "url": "projects/hal-9001/019C79FF-B31B-453C-BADB-888ABB228BBF.JPG"
      },
      {
        "type": "image",
        "url": "projects/hal-9001/EBD6FE43-F1D7-4A0F-83C6-DAB646AD9A0F-1782-0000016D73B1BB3F.JPEG"
      },
      {
        "type": "image",
        "url": "projects/hal-9001/IMG_0023.png",
        "whRatio": 1.33,
      },
      {
        "type": "image",
        "url": "projects/hal-9001/IMG_0565.jpg"
      },
      {
        "type": "image",
        "url": "projects/hal-9001/IMG_0598.png"
      },
      {
        "type": "image",
        "url": "projects/hal-9001/IMG_1278.png"
      },
    ]
  },
  {
    "name": "3D scanner (2019)",
    "description": [
      "Iterations on my design and manufacturing of a room 3D scanner.",
      "1. Ultrasound/sonar: <tt>[Arduino --(serial) --> computer</tt> (very inprecise).",
      "2. Tri-laser/line-laser + camera: <tt>[RPi + OpenCV]</tt> (very unstable)",
      "3. ToF sensor (VL53L1CX - tiny infrared laser): <tt>Arduino --(serial)--> computer.</tt>. Ok but low very resolution.",
      "4. Computer running <span class=\"name\">Java</span> + <span class=\"name\">Processing</span>.",
    ],
    "media": [
      {
        "type": "image",
        "url": "projects/3d-scanners/IMG_0904.jpg",
      },
      {
        "type": "image",
        "url": "projects/3d-scanners/IMG_1085.JPG",
      },
      {
        "type": "image",
        "url": "projects/3d-scanners/IMG_1396.JPG",
      },
      {
        "type": "image",
        "url": "projects/3d-scanners/IMG_2441.png",
        "whRatio": 0.89,
      },
      {
        "type": "image",
        "url": "projects/3d-scanners/IMG_9161.png",
        "whRatio": 0.89,
      },
    ]
  },
  // {
  //   "name": "HCI",
  //   "description": "Experiments in economic (processing wise) emotional expression using visuals and sounds. Sound and face gestures libraries.",
  //   "media": [
  //     {}
  //   ]
  // },
  {
    "name": "Human Eyeball (2020)",
    "description": "Prototype exploring human-like movements. <span class=\"name\">Java</span> + <span class=\"name\">Processing</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/4he5AFvR_qk?playlist=4he5AFvR_qk&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.50,
      },
    ]
  },
  {
    "name": "Walkers (-ongoing)",
    "description": [
      "Iterations toward bipedal locomotion robots. Inverted pendulum, self-balancing robot, quadruped designs, simulations on <span class=\"name\">Webots</span> robotic simulation framework.",
      "<i>I am almost done - I just need a team of brilliant scientists and engineers, some billion dollars and a several (unbounded) of decades of full dedication.</i> 😐",
    ],
    "media": [
      {
        "type": "image",
        "url": "projects/walkers/IMG_1122.JPG",
        "whRatio": 1.0,
      },
      {
        "type": "image",
        "url": "projects/walkers/IMG_1394.JPG",
      },
      {
        "type": "image",
        "url": "projects/walkers/IMG_1395.JPG",
      },
      {
        "type": "image",
        "url": "projects/walkers/IMG_9941.jpg",
      },
    ]
  },
  {
    "name": "IMU (2020)",
    "description": "IMU (Inertial Measuring Unit) Experiments on mobile device. <span class=\"name\">Java</span> + <span class=\"name\">Processing</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/dWmqm_FYc1Q?playlist=dWmqm_FYc1Q&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.50,
      },
    ]
  },
  {
    "name": "Physics engine 2D",
    "description": "My own 2D physics engine implementation and demo using <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/LiMf_OiN0kY?playlist=LiMf_OiN0kY&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.50,
      },
    ]
  },
  {
    "name": "Boids + predators simu (2021)",
    "description": "Classical <a href=\"https://en.m.wikipedia.org/wiki/Boids\">Boids</a> simulation of emergent behaviour, extended with predators and short range void visual perception. <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/zLiw4niFeO4?playlist=zLiw4niFeO4&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.52,
      },
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/jlzkCr1AXH0?playlist=jlzkCr1AXH0&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.52,
      },
    ]
  },
  {
    "name": "FFT sound analysis visualization (2019)",
    "description": "Sound processing, FFT, frequency filtering, and visualization. <span class=\"name\">Java</span> + <span class=\"name\">Processing</span> framework.",
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/t9GDNNGlqLo?playlist=t9GDNNGlqLo&autoplay=1&mute=1&loop=1&controls=0",
      },
    ]
  },
  {
    "name": "Pool physics 2d & test bench (2022)",
    "description": [
      "Pool game dynamics, visualization, and virtual experimentation test bench (e.g., <i>'How thin should I hit a ball to displace it in an angle of 85 degrees?'</i>).",
      "This is what an engineer does when s/he sucks at playing pool in real life."
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/0PBtFqUibhg?playlist=0PBtFqUibhg&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.58,
      },
    ]
  },
  // {
  //   "name": "Image processing primitives",
  //   "description": "Simple real-time image processing primitives.",
  //   "media": [
  //     {}
  //   ]
  // },
  {
    "name": "Wind dynamics simu (2023)",
    "description": [
      "Image decomposition and wind simulation. <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
      "Includes primitives to define flow fields and whirlwinds."
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/VnXYapCbXZ0?playlist=VnXYapCbXZ0&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.58,
      },
    ]
  },
  {
    "name": "2D Collisions optimization (2021)",
    "description": [
      "2D spatial collisions algorithms optimizations. <span class=\"name\">p5.js</span> on <span class=\"name\">iOS</span>.",
      "Experiments..., experiments..., experiments!",
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/ct6aNfJD3pY?playlist=ct6aNfJD3pY&autoplay=1&mute=1&loop=1&controls=0"
      },
    ]
  },
  {
    "name": "Warp (2021)",
    "description": [
      "<i>A long time ago in a galaxy far, far away....</i>",
    ],
    "media": [
      {
        "type": "videoIframe",
        "url": "https://www.youtube.com/embed/dh6up4FICH4?playlist=dh6up4FICH4&autoplay=1&mute=1&loop=1&controls=0",
        "whRatio": 0.58,
      },
    ]
  }
];
