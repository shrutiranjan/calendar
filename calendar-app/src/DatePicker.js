
import React from 'react'
import styled from 'styled-components'

const DAYS_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const MONTHS_NAME = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

const DateCell = (props) => {
    const {cellDate, selected, greyedOut, isActive} = props
    //console.log(cellDate)
    return (
        <DateDiv selected={selected} greyedOut={greyedOut} isActive={isActive}>
            {cellDate.getDate()}
        </DateDiv>
    )
}
export default class DatePicker extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            activeDate: new Date(),
            selectedDate: new Date() 
        }
    }
   
    render = () => {
        const {selectedDate, activeDate} = this.state
        selectedDate.setHours(0,0,0,0)
        activeDate.setHours(0,0,0,0)
        const selectDay = selectedDate.getDate()
        const selectMonth  = selectedDate.getMonth()
        const selectYear = selectedDate.getFullYear()
        const firstDate = new Date(selectYear, selectMonth, 1)
        firstDate.setHours(0,0,0,0)
        const lastDate = new Date(selectYear, selectMonth+1, 0)
        firstDate.setHours(0,0,0,0)
        let dayOfFirstIndex = -firstDate.getDay()
        
        return (
            <table>
                <thead>
                <tr>
                    <th><button>&lt;</button></th>
                    <th colSpan="5"><span id="selected_month">{MONTHS_NAME[selectMonth]}</span> <span id="selected_year">{selectYear}</span></th>
                    <th><button>&gt;</button></th>
                </tr>
                <tr>
                {DAYS_NAME.map(day => {
                    return <th key={day}>{day}</th>
                })}
                </tr>
                </thead>
                <tbody>
                {Array.from({length: 6}).map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {Array.from({length: 7}).map((col, colIndex) => {
                                    let cellDate = new Date()
                                    cellDate.setDate(firstDate.getDate() + dayOfFirstIndex)
                                    cellDate.setHours(0,0,0,0)
                                    dayOfFirstIndex+=1
                                    //console.log(selectedDate.valueOf(),  cellDate.valueOf(), "======"+cellDate.getDate())
                                    return (<td key={colIndex}><DateCell cellDate={cellDate} isActive={activeDate.getTime() === cellDate.getTime()} selected={selectedDate.getTime() === cellDate.getTime()} greyedOut={firstDate.getTime() > cellDate.getTime() || lastDate.getTime() < cellDate.getTime()} /></td>)
                                    
                                })
                            }
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}


export const DateDiv = styled.div`
    padding: 20px;
    background-color: ${props => (props.greyedOut ? '#AAA' : 'none')};
    background-color: ${props => (props.selected ? '#00FFFF' : 'none')};
    border: ${props => (props.isActive ? '1px solid #00FFFF' : '1px solid #333')}; ;
    font-weight: ${props => (props.selected ? 'bold' : 'normal')};

`