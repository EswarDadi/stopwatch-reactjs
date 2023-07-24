import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {istimerRunning: false, timerinminutes: 0, timerinseconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onStartTimer = () => {
    const {timerinseconds} = this.state
    const isTimerCompleted = timerinseconds === 60
    if (isTimerCompleted) {
      this.setState(prevState => {
        console.log(`prevState timer in minutes ${prevState.timerinminutes}`)
        return {
          timerinminutes: prevState.timerinminutes + 1,
        }
      })
      this.setState({timerinseconds: 0})
    } else {
      this.setState(prevState => {
        console.log(`prevState minutes is ${prevState.timerinseconds}`)
        return {
          timerinseconds: prevState.timerinseconds + 1,
        }
      })
    }
  }

  onClickStart = () => {
    const {timerinseconds} = this.state
    const isTimeCompleted = timerinseconds === 60
    if (isTimeCompleted) {
      this.setState({timerinseconds: 0})
    } else {
      this.intervalId = setInterval(this.onStartTimer, 1000)
    }
    this.setState(prevState => ({
      istimerRunning: !prevState.istimerRunning,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({timerinseconds: 0})
    this.setState({timerinminutes: 0})
  }

  onClickStop = () => {
    const {istimerRunning} = this.state
    if (istimerRunning) {
      this.clearTimerInterval()
    }
    this.setState(prevState => ({
      istimerRunning: !prevState.istimerRunning,
    }))
  }

  elapsedTimeFormat = () => {
    const {timerinminutes, timerinseconds} = this.state
    const stringifiedMinutes =
      timerinminutes > 9 ? timerinminutes : `0${timerinminutes}`
    const stringifiedSeconds =
      timerinseconds > 9 ? timerinseconds : `0${timerinseconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    return (
      <div className="bg-container">
        <h1>Stopwatch</h1>
        <div className="timer-card-container">
          <div className="timer-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="image"
            />
            <p className="timer-description">Timer</p>
          </div>
          <h1 className="elapsed-timer">{this.elapsedTimeFormat()}</h1>
          <div className="buttons-container">
            <button
              type="button"
              onClick={this.onClickStart}
              className="start-button"
            >
              Start
            </button>
            <button
              type="button"
              onClick={this.onClickStop}
              className="stop-button"
            >
              Stop
            </button>
            <button
              type="button"
              onClick={this.onResetTimer}
              className="reset-button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
