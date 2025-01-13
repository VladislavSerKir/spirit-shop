import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface IAreaChartProps {
  title: string;
  color?: string;
  xLabel: string;
  yLabel: string;
}

export const AreaChart = ({
  title,
  color = "#8884d8",
  xLabel,
  yLabel,
}: IAreaChartProps) => {
  const data = [
    { name: "01.06.2025", revenue: 300, pv: 2400, amt: 2400 },
    { name: "02.06.2025", revenue: 500, pv: 2400, amt: 2400 },
    { name: "03.06.2025", revenue: 200, pv: 2400, amt: 2400 },
    { name: "04.06.2025", revenue: 700, pv: 2400, amt: 2400 },
    { name: "05.06.2025", revenue: 700, pv: 2400, amt: 2400 },
    { name: "06.06.2025", revenue: 800, pv: 2400, amt: 2400 },
    { name: "07.06.2025", revenue: 200, pv: 2400, amt: 2400 },
    { name: "08.06.2025", revenue: 700, pv: 2400, amt: 2400 },
    { name: "09.06.2025", revenue: 700, pv: 2400, amt: 2400 },
    { name: "10.06.2025", revenue: 800, pv: 2400, amt: 2400 },
  ];

  return (
    <div style={{ overflow: "visible", width: "700px", height: "480px" }}>
      <h3 className="footer__title">{title}</h3>
      <LineChart
        width={700}
        height={400}
        data={data}
        style={{ overflow: "visible" }}
      >
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={color}
          fill={color}
          strokeWidth={3}
          legendType="cross"
          activeDot
        />
        <CartesianGrid stroke="#ccc" color="red" strokeDasharray="5 5" />
        <XAxis
          label={{ value: xLabel, position: "bottom", offset: -15 }}
          dataKey="name"
          orientation="bottom"
          angle={-45}
          textAnchor="end"
          height={100}
          xHeight={10}
          strokeWidth={2}
        />
        <YAxis
          strokeWidth={2}
          label={{ value: yLabel, position: "bottom", offset: -30 }}
        />
        <Tooltip />
      </LineChart>
    </div>
  );
};
