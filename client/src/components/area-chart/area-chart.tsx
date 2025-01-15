import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTypedSelector } from "../../types";
import Spinner from "../../pages/spinner/spinner";
import { IChartData } from "../../types/store/serviceStoreType";

interface IAreaChartProps {
  title: string;
  color?: string;
  xLabel: string;
  yLabel: string;
  data: IChartData[];
  mapType: string;
}

export const AreaChart = ({
  title,
  color = "#8884d8",
  xLabel,
  yLabel,
  data,
  mapType,
}: IAreaChartProps) => {
  const chartsDataRequest = useTypedSelector(
    (state) => state.service.chartsDataRequest
  );
  const [active, setActive] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight + 20}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <div style={{ width: "700px", height: active ? "480px" : "20px" }}>
      <h3 className="area-chart__title" onClick={toggleAccordion}>
        {title}
      </h3>
      {chartsDataRequest ? (
        <Spinner />
      ) : (
        <div
          className={`area-chart__item${active ? " accordeon-open" : ""} area-chart__content`}
          ref={divRef}
        >
          <LineChart
            width={700}
            height={400}
            data={data}
            style={{ overflow: "visible" }}
          >
            <Line
              type="monotone"
              dataKey={mapType}
              stroke={color}
              fill={color}
              strokeWidth={3}
              legendType="cross"
              activeDot
            />
            <CartesianGrid stroke="#ccc" color="red" strokeDasharray="5 5" />
            <XAxis
              label={{ value: xLabel, position: "bottom", offset: -15 }}
              dataKey="endDate"
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
      )}
    </div>
  );
};
