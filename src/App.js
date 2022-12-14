import "./App.css";
import SymBtn from "./button";
import React from "react";

const symbolIcon = [
  "AC",
  "+-",
  "%",
  "÷",
  7,
  8,
  9,
  "×",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  0,
  ".",
  "=",
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curNum: "0",
      calNum: [],
      calcu: "",
      clearNum: false,
    };
    this.addCurNum = this.addCurNum.bind(this);
    this.addCalNum = this.addCalNum.bind(this);
    this.arithmeticCliker = this.arithmeticCliker.bind(this);
    this.numClicker = this.numClicker.bind(this);
    this.resetClicker = this.resetClicker.bind(this);
    this.invertClicker = this.invertClicker.bind(this);
    this.percentageClicker = this.percentageClicker.bind(this);
    this.dotClicker = this.dotClicker.bind(this);
    this.equalClicker = this.equalClicker.bind(this);
    this.equalHandleClciker = this.equalHandleClciker.bind(this);
  }

  componentDidUpdate() {
    if (this.state.curNum === "NaN") {
      alert("you just got NaN");
      this.setState((prev) => ({
        ...prev,
        curNum: "0",
      }));
    } else if (this.state.curNum === "Infinity") {
      this.setState((prev) => ({
        ...prev,
        curNum: "0",
      }));
      alert("you just got Infinity");
    }
  }

  arithmeticCliker({ target }) {
    if (this.state.calcu && this.state.curNum && this.state.calNum) {
      this.equalHandleClciker({ target });
    } else {
      this.setState((prev) => ({
        ...prev,
        calcu: target.innerHTML,
        curNum: "0",
        calNum: this.state.curNum,
      }));
    }
  }

  numClicker({ target }) {
    if (
      Number(this.state.curNum) === 0 &&
      this.state.curNum.indexOf(".") === -1
    ) {
      if (this.state.curNum.indexOf("-") === 0) {
        this.setState((prev) => ({
          ...prev,
          clearNum: false,
          curNum: "-" + target.innerHTML,
        }));
      } else {
        this.setState((prev) => ({
          ...prev,
          clearNum: false,
          curNum: target.innerHTML,
        }));
      }
    } else {
      if (this.state.clearNum === false) {
        this.setState((prev) => ({
          ...prev,
          curNum: prev.curNum + target.innerHTML,
        }));
      } else {
        this.setState((prev) => ({
          ...prev,
          clearNum: false,
          curNum: target.innerHTML,
        }));
      }
    }
  }

  resetClicker() {
    this.setState(() => ({
      calcu: "",
      calNum: [],
      curNum: "0",
      clearNum: false,
    }));
  }

  invertClicker() {
    if (this.state.curNum.indexOf("-") === 0) {
      const sliceCur = this.state.curNum.slice(1);
      this.setState((prev) => ({
        ...prev,
        curNum: sliceCur,
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        curNum: "-" + prev.curNum,
      }));
    }
  }

  dotClicker() {
    if (this.state.curNum.indexOf(".") === -1 && !this.state.clearNum) {
      if (this.state.curNum.length === 0) {
        this.setState((prev) => ({
          ...prev,
          curNum: "0." + prev.curNum,
        }));
      } else if (!this.state.clearNum) {
        this.setState((prev) => ({
          ...prev,
          curNum: prev.curNum + ".",
        }));
      }
    }
  }

  percentageClicker() {
    const divide = (this.addCurNum() / 100).toString();
    this.setState((prev) => ({
      ...prev,
      curNum: divide,
    }));
  }

  equalClicker() {
    if (this.state.calcu === "+") {
      const newAdd = parseFloat(
        (this.addCurNum() + this.addCalNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newAdd,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "-") {
      const newSub = parseFloat(
        (this.addCalNum() - this.addCurNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newSub,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "×") {
      const newMulti = parseFloat(
        (this.addCurNum() * this.addCalNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newMulti,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "÷") {
      const newDiv = parseFloat(
        (this.addCalNum() / this.addCurNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newDiv,
        clearNum: true,
      }));
    }
  }

  equalHandleClciker({ target }) {
    if (this.state.calcu === "+") {
      const newAdd = parseFloat(
        (this.addCurNum() + this.addCalNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newAdd,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "-") {
      const newSub = parseFloat(
        (this.addCalNum() - this.addCurNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newSub,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "×") {
      const newMulti = parseFloat(
        (this.addCurNum() * this.addCalNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newMulti,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "÷") {
      const newDiv = parseFloat(
        (this.addCalNum() / this.addCurNum()).toFixed(10)
      ).toString();
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newDiv,
        curNum: [],
        clearNum: true,
      }));
    }
  }

  addCurNum() {
    const newArr = this.state.curNum;
    console.log(newArr);
    return Number(newArr);
  }

  addCalNum() {
    const newArr = this.state.calNum;
    return Number(newArr);
  }

  render() {
    return (
      <div>
        <h1>Gidimon</h1>
        <div className="big">
          <div className='secondBig'>
            <div className="value">Ready Value: {this.state.calNum}</div>
            <div className="value">Arithmetic Operator:{this.state.calcu}</div>
            <div className="value">
              Current Value:
              {this.state.curNum}
            </div>
          </div>
          <div className="container">
            {symbolIcon.map((val, ind) => {
              return (
                <SymBtn
                  className={val}
                  value={val}
                  key={ind}
                  onClick={
                    val === "AC"
                      ? this.resetClicker
                      : val === "+-"
                        ? this.invertClicker
                        : val === "%"
                          ? this.percentageClicker
                          : val === "="
                            ? this.equalClicker
                            : val === "÷" || val === "×" || val === "-" || val === "+"
                              ? this.arithmeticCliker
                              : val === "."
                                ? this.dotClicker
                                : this.numClicker
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;