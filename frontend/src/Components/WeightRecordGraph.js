import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer, Label } from 'recharts';

const WeightRecordGraph = ({data}) => {
    const data1 = data.map(obj => { var rObj = {}; rObj["date"] = new Date(obj.date).toLocaleDateString("en-US");  rObj["weight"] = obj.weight; return rObj}).reverse()
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data1} margin={{ top: 5, right: 0, bottom: 50, left: 10 }}>
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" angle={45} textAnchor="start" tick={{ fontSize: 12 }}>
                    <Label value="Date"  offset={0} position= 'bottom' textAnchor= 'start' fontSize='20' />
                </XAxis>
                <YAxis tick={{ fontSize: 12 }}>
                    <Label value="Weight" angle={-90} position= 'insideLeft' textAnchor= 'middle' fontSize='20' />
                </YAxis>
                <Tooltip labelStyle={{ fontSize: 16 }} contentStyle={{ fontSize: 16 }} />
            </LineChart>
        </ResponsiveContainer>
    );
  };
  export default WeightRecordGraph;
  