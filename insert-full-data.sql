-- Delete existing data and insert complete profile
DELETE FROM profile_settings;

INSERT INTO profile_settings (
  name, title, subtitle, bio, location, profile_image,
  story, mission, vision, career_goals, research_interests, engineering_philosophy
) VALUES (
  'Muhammad Bin Javaid',
  'Robotics & Intelligent Systems',
  ARRAY['Embedded Systems', 'Industrial Automation', 'AI', 'IoT', 'Research & Development', 'PCB Design'],
  'Passionate Robotics & Intelligent Systems specializing in embedded systems, industrial automation, and AI-driven solutions. Dedicated to pushing the boundaries of technology through innovation and research.',
  'Saudi Arabia',
  '',
  'I am Muhammad Bin Javaid, a dedicated Robotics and Intelligent Systems engineer with a profound passion for creating innovative solutions that seamlessly bridge the gap between hardware and software. My engineering journey has been driven by an insatiable curiosity and a relentless desire to solve real-world problems using cutting-edge technology.

Throughout my academic and professional career, I have developed deep expertise across multiple domains including embedded systems, industrial automation, artificial intelligence, computer vision, and IoT. I thrive on the challenge of integrating complex systems - from designing custom PCBs and programming microcontrollers to implementing machine learning algorithms and developing autonomous systems.

I believe in the power of continuous learning and staying at the forefront of technological advancement. Whether it''s mastering the latest developments in ROS2, diving deep into MATLAB simulations, or exploring cutting-edge AI frameworks, I am committed to expanding my technical horizons. My goal is to work with leading organizations like Tesla, Boston Dynamics, Saudi Aramco, NVIDIA, and NEOM, where I can contribute to groundbreaking projects that shape the future of automation, robotics, and intelligent systems.',
  'To develop intelligent systems that improve industrial processes, enhance human capabilities, and contribute to the advancement of robotics and automation technology. I am committed to creating solutions that are not only technologically sophisticated but also practical, sustainable, and impactful for society and industry.',
  'To become a leading figure in robotics and intelligent systems, working with world-class organizations to create transformative technologies that shape the future of automation, AI, and industrial innovation. I envision a future where intelligent systems seamlessly integrate into our daily lives, making industries safer, more efficient, and more sustainable.',
  'My career goals are centered around joining prestigious organizations where I can contribute to groundbreaking projects in robotics, embedded systems, and industrial automation. I aspire to work on cutting-edge technologies that push the boundaries of what''s possible - from developing autonomous robotic systems to designing smart industrial solutions. My target organizations include Tesla, Boston Dynamics, Saudi Aramco, NVIDIA, NEOM, ABB, Siemens, Honeywell, SpaceX, and Apple, where innovation meets real-world impact.',
  ARRAY[
    'Embedded Systems & IoT Architecture',
    'Industrial Automation & Control Systems',
    'Artificial Intelligence & Machine Learning',
    'Computer Vision & Image Processing',
    'PCB Design & Hardware Development',
    'Robotics & Autonomous Systems',
    'Smart Wearable Technologies',
    'Industrial IoT Solutions',
    'ROS2 & Robot Operating Systems',
    'MATLAB Simulation & Modeling'
  ],
  'I believe in designing systems that are not only technologically advanced but also practical, reliable, and maintainable. Every project should solve a real problem and create meaningful impact. Good engineering is about finding the elegant balance between complexity and simplicity, between innovation and practicality. I approach every challenge with a systematic methodology - understanding the problem deeply, researching thoroughly, prototyping rapidly, and iterating continuously until the solution is robust and production-ready.'
);
