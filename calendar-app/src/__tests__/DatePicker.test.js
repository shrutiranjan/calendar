import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

Enzyme.configure({ adapter: new Adapter() })

import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
//import App from './App'
import DatePicker, {MONTHS_NAME, DateDiv} from '../DatePicker'

const fail = done => done.fail()

describe(`By default, when no props are passed`, () => {

  let wrapper
  let todayDate
  beforeEach(() => { 
    wrapper = mount(<DatePicker />)
    todayDate = new Date()
  })

  it('should map the date to the correct day of the week', () => {
    const firstDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
    const firstDayIndex = firstDate.getDay()
    const firstRow = wrapper.find('tbody').find('tr').at(0)
    expect(
      firstRow.find('td').at(firstDayIndex).text()
    ).toEqual("1")
  })

  it(`today's date is both selected & is active`, () => {
    const allTd = wrapper.find('tbody').find('td')
    expect(
      allTd.find('td').find({selected: true}).at(0).text()
    ).toEqual(todayDate.getDate().toString())
    expect(
      allTd.find('td').find({isActive: true}).at(0).text()
    ).toEqual(todayDate.getDate().toString())
  })
  
  describe(`should show the current`, () => {
    it(`month's name`, () => {
      expect(
        wrapper.find('#selected_month').text()
      ).toEqual(MONTHS_NAME[todayDate.getMonth()])
    })
    it(`year's number`, () => {
      expect(
        wrapper.find('#selected_year').text()
      ).toEqual(todayDate.getFullYear().toString())
    })
  })
  it('should apply different classes for dates displayed from prev & next month', () => {
    const firstDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
    const firstDayIndex = firstDate.getDay()
    if(firstDayIndex > 0) {
      const firstRow = wrapper.find('tbody').find('tr').at(0)
      expect(
        firstRow.find('td').at(0).children().props().greyedOut
      ).toEqual(true)
    }
    const lastRow = wrapper.find('tbody').find('tr').at(5)
    expect(
      lastRow.find('td').at(6).children().props().greyedOut
    ).toEqual(true)
  })
  it('should fill the missing cells in the month in the grid with dates from previous & next months', () => {
    const firstDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
    const firstDayIndex = firstDate.getDay()
    if(firstDayIndex > 0) {
      const firstRow = wrapper.find('tbody').find('tr').at(0)
      expect(
        parseInt(firstRow.find('td').at(0).text())
      ).toBeGreaterThan(1)
    }
    const lastRow = wrapper.find('tbody').find('tr').at(5)
    expect(
      parseInt(lastRow.find('td').at(0).text())
    ).toBeGreaterThan(1)    
  })
  it(`should apply the selected style on a newly selected date & isActive style should still be on the original date`, () => {
    let allTd = wrapper.find('tbody').find('td')
    let elementToClick = allTd.find(DateDiv).find({selected: false}).children().at(8)
    elementToClick.simulate('click')
    allTd = wrapper.find('tbody').find('td')
    expect(
      allTd.find({selected: true}).children().at(0).text()
    ).toEqual(elementToClick.text())
    expect(
      allTd.find('td').find({isActive: true}).at(0).text()
    ).toEqual(todayDate.getDate().toString())
  })
  // describe(`doesn't throw an error when`, () => {
  //   it(`saved is clicked`, fail)
  //   it(`cancel is clicked`, fail)
  // })

})

describe(`When some props are passed`, () => {
  let wrapper
  let defaultDate
  let saveMockFn
  let cancelMockFn
  beforeEach(() => { 
    defaultDate = new Date(2017, 10, 15)
    saveMockFn = jest.fn()
    cancelMockFn = jest.fn()
    wrapper = mount(<DatePicker defaultDate={defaultDate} onSave={saveMockFn} onCancel={cancelMockFn} />)
  })
  it(`shows the passed date as the selected & active date`, () => {
    const DateDivs = wrapper.find(DateDiv)
    expect(
      DateDivs.find({selected: true}).at(0).text()
    ).toEqual(defaultDate.getDate().toString())
    expect(
      DateDivs.find({isActive: true}).at(0).text()
    ).toEqual(defaultDate.getDate().toString())
  })
  describe(`calls 'onSave' prop when save is clicked with`, () => {
    it(`the default date when there was no interaction(by default)`, () => {
      wrapper.find('#savebtn').simulate('click')
      expect(saveMockFn).toHaveBeenCalledWith(defaultDate)
    })
    it(`selected date when a different date is selected`, () => {
      let elementToClick = wrapper.find(DateDiv).find({selected: false}).children().at(8)
      elementToClick.simulate('click')
      const clickedDate = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), parseInt(elementToClick.text()))
      wrapper.find('#savebtn').simulate('click')
      expect(saveMockFn).toHaveBeenCalledWith(clickedDate)
    })
  })
  it(`calls 'onCancel' prop when cancel is clicked`, () => {
    wrapper.find('#cancelbtn').simulate('click')
    expect(cancelMockFn).toHaveBeenCalled()
  })
})

describe('From the grid, it can select a date from', () => {
  let wrapper
  let todayDate
  beforeEach(() => { 
    wrapper = mount(<DatePicker />)
    todayDate = new Date()
  })
  it('the previous month', () => {
    const firstDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
    const firstDayIndex = firstDate.getDay()
    if(firstDayIndex > 0) {
      const firstCell = wrapper.find('tbody').find('tr').at(0).find(DateDiv).at(0)
      firstCell.simulate('click')
      const selectedDate = new Date(todayDate.getFullYear(), todayDate.getMonth()-1, parseInt(firstCell.text()))
      expect(wrapper.state().selectedDate.getTime()).toEqual(selectedDate.getTime())
    }
  })
  it('the next month', () => {
    const lastCell = wrapper.find('tbody').find('tr').at(5).find(DateDiv).at(6)
    lastCell.simulate('click')
    const selectedDate = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, parseInt(lastCell.text()))
    expect(wrapper.state().selectedDate.getTime()).toEqual(selectedDate.getTime())
  })
})

describe.skip(`On changing month`, () => {
  describe(`can navigate to`, () => {
    it(`previous month`, fail)
    it(`next month`, fail)
  })

  it(`the new dates are rendered on the grid`, fail)
  it(`the month name should change`, fail)
  it(`the year number should change`, fail)

  describe(`the year should change once we move to a month`, () => {
    it(`before Jan`, fail)
    it(`after Dec`, fail)
  })

  it(`should remember the date(s) that was selected & is active previously`, fail)
})
