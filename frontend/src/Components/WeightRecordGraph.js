import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer } from 'recharts';

const WeightRecordGraph = ({data}) => {
    const data1 = data.map(obj => { var rObj = {}; rObj["date"] = new Date(obj.date).toLocaleDateString("en-US");  rObj["weight"] = obj.weight; return rObj}).reverse()
    return (
            <ResponsiveContainer width="100%" height={400}>
            <LineChart  data={data1} margin={{ top: 5, right: 50, bottom: 50, left: 0 }}>
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date"  angle={45} textAnchor="start" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip style={{fontSize: 12}} />
            </LineChart>
          </ResponsiveContainer>
    );
  };
  export default WeightRecordGraph;
  