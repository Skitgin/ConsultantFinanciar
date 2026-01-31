import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { DataPoint } from './DataPoint';
import { motion } from 'motion/react';
import { useMediaQuery, useTheme } from '@mui/material';


type Prop = {
  data: DataPoint[],
  isExpanded: boolean,
}




export default function IndexLineChart({ data, isExpanded }: Prop) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <motion.div
      animate={{
        width: isMobile ? "95vw" : (isExpanded ? 800 : 500),
        height: isExpanded ? 500 : "auto",
        zIndex: isExpanded ? 100 : 1,
      }}
      transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
      style={{
        position: isExpanded ? "absolute" : "relative",
        left: isExpanded ? "50%" : "auto",
        x: isExpanded ? "-50%" : 0,
        width:  isMobile ? "95vw" : (isExpanded ? 800 : 500),
        height: isExpanded ? 500 : 300,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
      <LineChart key={isExpanded ? 'expanded' : 'collapsed'} style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto', marginTop: 2 }} responsive data={data}>
        <CartesianGrid stroke="#000" strokeDasharray="7 7" />
        <XAxis dataKey="name" />
        <YAxis width={0} />
        <Tooltip itemSorter={(item) => (item.value as number) * -1} />
        <Line type="monotone" dataKey="investitie" stroke="#008cdd" strokeWidth={2} />
        <Line type="monotone" dataKey="return" stroke="#ff9100" strokeWidth={2} />
      </LineChart></motion.div>

  );
}