export type ExperienceItem = {
  company: string;
  role: string;
  periodLong: string;
  locationLong: string;
  details: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Architech Labs",
    role: "Tech Support Engineer & Frontend Developer",
    periodLong: "Dec 2025 – May 2026",
    locationLong: "Gurgaon, Haryana, India",
    details: [
      "Developed responsive user interfaces using React, JavaScript, TypeScript, and CSS.",
      "Explored IoT technologies, including ESP32, Raspberry Pi, sensors, and MQTT communication.",
      "Troubleshot technical issues, debugged software, and supported application testing.",
    ],
    tech: [
      "IoT",
      "ESP32",
      "RaspberryPi",
      "MQTT",
      "Sensors",
      "React",
      "TypeScript",
      "JavaScript",
      "CSS",
    ],
  },
];
