import React from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

function PieChartContainer({item, innerRadius, outerRadius}) {
  return (
    <ResponsiveContainer width="100%" height={145}>
      <PieChart width={145} height={145}>
        <Pie
          data={item}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {item.map((i) => (
            <Cell key={i?.id} fill={i?.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartContainer;
