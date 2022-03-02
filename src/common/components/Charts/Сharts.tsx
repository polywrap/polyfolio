import React from 'react';
import {AreaChart, Area, ResponsiveContainer} from 'recharts';
import {mocData} from './mocData';

function Charts({opacity, opacityGradient, type, height}) {
  return (
    <div style={{width: '100%', height: height}}>
      <ResponsiveContainer>
        <AreaChart data={mocData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27C69F" />
              <stop offset="100%" stopColor="#27C69F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type={type}
            dataKey="uv"
            stroke="#27C69F"
            strokeOpacity={opacityGradient}
            fillOpacity={opacity}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Charts;
