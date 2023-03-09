import React from "react"

import { LineChart } from "recharts"
import { CartesianGrid } from "recharts"
import { XAxis } from "recharts"
import { YAxis } from "recharts"
import { Tooltip } from "recharts"
import { Line } from "recharts"

import './LineGraph.css'

class LineGraph extends React.Component {

    render() {
        return (
            <LineChart width={730} height={250} data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="val" stroke="#8884d8" />
            </LineChart>
        )
    }
}

export default LineGraph