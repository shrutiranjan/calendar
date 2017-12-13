
import React from 'react'
import styled from 'styled-components'

const DAYS_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const MONTHS_NAME = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

const DateCell = (props) => {
    const {cellDate, selected, greyedOut, isActive, onSelect} = props
    //console.log(cellDate)
    const setDate = () => {
        onSelect(cellDate)
    }
    return (
        <DateDiv selected={selected} greyedOut={greyedOut} isActive={isActive} onClick={setDate}>
            {cellDate.getDate()}
        </DateDiv>
    )
}
export default class DatePicker extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            activeDate: this.props.defaultDate || new Date(),
            selectedDate: this.props.defaultDate || new Date(),
            viewMonth: null,
            viewYear: null
        }
    }
    componentWillMount() {
        this.setState({viewMonth: this.state.selectedDate.getMonth(), viewYear: this.state.selectedDate.getFullYear()})
    }        
    goPrev = () => {
        if(this.state.viewMonth === 0) {
            this.setState({viewMonth: 11, viewYear: this.state.viewYear - 1})
        } else {
            this.setState({viewMonth: this.state.viewMonth - 1})
        }
    }

    goNext = () => {
        if(this.state.viewMonth === 11) {
            this.setState({viewMonth: 0, viewYear: this.state.viewYear + 1})
        } else {
            this.setState({viewMonth: this.state.viewMonth + 1})
        }
    }

    selectDate = (dt) => {
        this.setState({selectedDate: dt})
    }

    onCancelClick = () => {
        //console.log('cancel clicked')
        if(this.props.onCancel) {
            this.props.onCancel()
        }
    }
    
    onSaveClick = () => {
        //console.log('save clicked on date', this.state.selectedDate)
        if(this.props.onSave) {
            this.props.onSave(this.state.selectedDate)
        }
    }

    render = () => {
        const {selectedDate, activeDate, viewMonth, viewYear} = this.state
        selectedDate.setHours(0,0,0,0)
        activeDate.setHours(0,0,0,0)       
        let firstDate = new Date(viewYear, viewMonth, 1)        
        //firstDate.setHours(0,0,0,0)
        //console.log(viewYear, viewMonth)
        let lastDate = new Date(viewYear, viewMonth+1, 0)
        firstDate.setHours(0,0,0,0)
        let dayOfFirstIndex = -firstDate.getDay()
        
        return (
            <Table>
                <thead>
                <tr>
                    <th><button onClick={this.goPrev}>&lt;</button></th>
                    <th colSpan="5"><span id="selected_month">{MONTHS_NAME[viewMonth]}</span> <span id="selected_year">{viewYear}</span></th>
                    <th><button onClick={this.goNext}>&gt;</button></th>
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
                                    let cellDate = new Date(viewYear, viewMonth, 1)
                                    cellDate.setDate(firstDate.getDate() + dayOfFirstIndex)
                                    cellDate.setHours(0,0,0,0)
                                    dayOfFirstIndex+=1
                                    //console.log(selectedDate.valueOf(),  cellDate.valueOf(), "======"+cellDate.getDate())
                                    return (<td key={colIndex}><DateCell onSelect={this.selectDate} cellDate={cellDate} isActive={activeDate.getTime() === cellDate.getTime()} selected={selectedDate.getTime() === cellDate.getTime()} greyedOut={firstDate.getTime() > cellDate.getTime() || lastDate.getTime() < cellDate.getTime()} /></td>)
                                    
                                })
                            }
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                    <tr>
                    <th colSpan="5"></th>
                    <td><button id="cancelbtn" onClick={this.onCancelClick}>Cancel</button></td>
                    <td><button id="savebtn" onClick={this.onSaveClick}>Save</button></td>
                    </tr>
                </tfoot>
            </Table>
        )
    }
}

const Table = styled.table `
    margin: 0 auto;
`
export const DateDiv = styled.div`
    padding: 20px;
    background-color: ${props => (props.greyedOut ? '#AAA' : 'none')};
    background-color: ${props => (props.selected ? '#FFC0CB' : 'none')};
    border: ${props => (props.isActive ? '2px solid #FF0000' : '1px solid #999')}; ;
    font-weight: ${props => (props.selected ? 'bold' : 'normal')};
    cursor: pointer;
`