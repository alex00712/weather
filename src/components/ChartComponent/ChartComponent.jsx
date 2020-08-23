import React from "react";
import {CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer} from "recharts";
import format from 'node.date-time'

class ChartComponent extends React.Component {

    state = {data: []}

    componentWillMount(){
        this._configState(this.props)
    }

    componentWillReceiveProps(props){
        this._configState(props)
    }

    _configState = props => {
        let data = new Array(10)
        props.data.forEach((el, i) => {
            data[i] = {
                    name: new Date(el.dt*1000).format('HH:mm'),
                    temp: Math.floor(el.main.temp-273),
                    icon: el.weather[0].icon
                }
        })
        this.setState({data})
    }

    render() {
        return (
            <ResponsiveContainer height = '100%'  >
                <AreaChart 
                    // width={window.innerWidth*4/5}
                    // height={window.innerHeight/3}
                    data={this.state.data}
                >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
                        <stop offset="20%" stopColor="yellow" stopOpacity={0.8}/>
                        <stop offset="60%" stopColor="blue" stopOpacity={0.8}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area  type="monotone" dataKey='temp' stroke="#8884d8" fill="url(#colorUv)" />
                </AreaChart >
             </ResponsiveContainer>
        );
    }
}
export default ChartComponent;
