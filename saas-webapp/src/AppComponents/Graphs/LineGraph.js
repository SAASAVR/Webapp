import React from "react"

import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Brush, Line } from "recharts"

import './LineGraph.css'

class LineGraph extends React.Component {

    render() {
        return (
            <ResponsiveContainer height={400}>
                <LineChart data={this.props.data}
                    margin={{ top: 5, right: 50, bottom: 5 }}
                    style={{backgroundColor:""}}>
                    <XAxis dataKey="time" stroke='#919191'/>
                    <YAxis stroke='#919191'/>
                    <Tooltip 
                        wrapperStyle={{color: '#4e4d57' }}
                        contentStyle={{backgroundColor: '#bcbcbc'}}
                    />
                     <Brush dataKey='name' height={15} stroke="#8884d8"/>
                    <Line type="monotone" dataKey="amp" stroke="#8884d8" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default LineGraph