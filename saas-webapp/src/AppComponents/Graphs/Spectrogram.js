import React from "react"
import { HeatMapGrid } from 'react-grid-heatmap'

import './Spectrogram.css'

class Spectrogram extends React.Component {

    render() {
        return (
            <div style={{width: '50%', marginLeft: '1em', padding: '0em', height: '100%'}}>
                <HeatMapGrid
                    data={this.props.data}
                    cellHeight='5.5px'
                    xLabelsPos="bottom"
                    xLabelWidth={0}
                    cellStyle={(_x, _y, ratio) => ({
                        background: `rgb(12, 160, 44, ${ratio})`,
                        border: 'none',
                        fontSize: '.8rem',
                        color: `rgb(0, 0, 0, ${ratio})`
                      })}
                    ></HeatMapGrid>
            </div>
        )
    }
}

export default Spectrogram;