import React from "react"

import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts"

import './LineGraph.css'

class FreqDist extends React.Component {

    render() {
        return(
            <ResponsiveContainer height={300} width='50%'>
                <BarChart data={this.props.data}>
                    <XAxis dataKey="freq" />
                    <YAxis />
                    <Tooltip 
                        wrapperStyle={{color: '#4e4d57' }}
                        contentStyle={{backgroundColor: '#bcbcbc'}}
                    />
                    <Bar dataKey="val" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default FreqDist