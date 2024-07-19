import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mechanical Keyboards", 2020: 59, 2021: 210, 2022: 150, 2023: 192 },
  { name: "Gaming Mice", 2020: 71, 2021: 156, 2022: 215, 2023: 123 },
  { name: "Macro Keypads", 2020: 91, 2021: 210, 2022: 150, 2023: 192 },
  { name: "High-resolution Monitors", 2020: 65, 2021: 156, 2022: 191, 2023: 215 },
  { name: "External GPUs", 2020: 110, 2021: 95, 2022: 150, 2023: 195 },
  { name: "VR Headsets", 2020: 86, 2021: 115, 2022: 150, 2023: 110 },
  { name: "Docking Stations", 2020: 75, 2021: 125, 2022: 110, 2023: 180 },
  { name: "Thunderbolt 3/4 Hubs", 2020: 62, 2021: 150, 2022: 143, 2023: 176 },
  { name: "NAS Devices", 2020: 69, 2021: 142, 2022: 150, 2023: 210 },
];

const Analytics = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h1 className="text-2xl text-center m-5">
        Sales analytics for last four years
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="2023"
            stroke="#4a1486"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="2022" stroke="#f57f17" />
          <Line type="monotone" dataKey="2021" stroke="#1b5e20" />
          <Line type="monotone" dataKey="2020" stroke="#8c2d04" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
