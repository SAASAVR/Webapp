import React from "react"

import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from "recharts"

import './LineGraph.css'

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.scale = {
            scale: [-60, 60]
        }
    }

    render() {       

        return (
            <ResponsiveContainer height={400}>
                <LineChart data={this.props.data}
                    margin={{ top: 5, right: 50, bottom: 5 }}
                    style={{backgroundColor:""}}>
                    <XAxis tickFormatter={(value) => value.toFixed(2)} dataKey="time" stroke='#919191'/>
                    <YAxis allowDataOverflow='false' domain={this.scale["scale"]} stroke='#919191'/>
                    <Tooltip 
                        wrapperStyle={{color: '#4e4d57' }}
                        contentStyle={{backgroundColor: '#bcbcbc'}}
                    />
                    <Line type="monotone" dataKey="amp" stroke="#8884d8" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default LineGraph