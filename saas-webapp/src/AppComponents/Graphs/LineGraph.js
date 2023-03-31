import React from "react"

import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Brush, Line } from "recharts"

import './LineGraph.css'

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        if ((this.state.data.length === 0 && this.props.data.length > 0) || 
            (this.props.data.length > 0 
                && this.props.data[this.props.data.length-1]['time'] > this.state.data[this.state.data.length-1]['time'])) {
            this.setState({
                data: this.props.data
            });
        }        

        return (
            <ResponsiveContainer height={400}>
                <LineChart data={this.state.data}
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