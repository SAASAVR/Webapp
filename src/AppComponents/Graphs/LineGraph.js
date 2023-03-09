import React from "react"

import { LineChart } from "recharts"
import { ResponsiveContainer } from "recharts"
import { XAxis } from "recharts"
import { YAxis } from "recharts"
import { Tooltip } from "recharts"
import { Line } from "recharts"

import './LineGraph.css'

class LineGraph extends React.Component {

    render() {
        return (
            <ResponsiveContainer height={400}>
                <LineChart data={this.props.data}
                    margin={{ top: 5, right: 50, bottom: 5 }}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="val" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default LineGraph