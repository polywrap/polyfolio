import React from 'react';
import './charts.module.scss';
import {AreaChart, Area, ResponsiveContainer} from 'recharts';
import {mocData} from './mocData';

function Charts() {
  return (
    <div style={{width: '100%', height: '200px'}}>
      <ResponsiveContainer>
        <AreaChart data={mocData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27C69F" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#27C69F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="uv"
            stroke="#27C69F"
            strokeOpacity={0.6}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Charts;
