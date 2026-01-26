import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { DataPoint } from './DataPoint';

// #region Sample data
type Prop = {
data:DataPoint[]
}
  

// #endregion

export default function IndexLineChart({data}:Prop) {
  return (
    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={data}>
      <CartesianGrid stroke="#000" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Line type="monotone" dataKey="investitie" stroke="#0400ff" strokeWidth={2} />
      <Line type="monotone" dataKey="return" stroke="#ff0000"  strokeWidth={2}/>
    </LineChart>
  );
}