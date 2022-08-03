import "./App.css";
import SymBtn from "./button";
import React from "react";
import ReactDOM from "react-dom";

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
      curNum: [],
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

  arithmeticCliker({ target }) {
    if (this.state.calcu && this.state.curNum && this.state.calNum) {
      this.equalHandleClciker({ target });
    } else {
      this.setState((prev) => ({
        ...prev,
        calcu: target.innerHTML,
        curNum: [],
        calNum: this.state.curNum,
      }));
    }
  }

  numClicker({ target }) {
    if (this.state.clearNum === false) {
      this.setState((prev) => ({
        ...prev,
        curNum: [...prev.curNum, target.innerHTML],
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        clearNum: false,
        curNum: [target.innerHTML],
      }));
    }
  }

  resetClicker() {
    this.setState(() => ({
      calcu: "",
      calNum: [],
      curNum: [],
      clearNum: false,
    }));
  }

  invertClicker() {
    if (this.state.curNum.includes("-")) {
      const sliceCur = this.state.curNum.slice(1);
      this.setState((prev) => ({
        ...prev,
        curNum: sliceCur,
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        curNum: ["-", ...prev.curNum],
      }));
    }
  }

  percentageClicker() {
    const divide = (this.addCurNum() / 100).toString().split("");
    this.setState((prev) => ({
      ...prev,
      curNum: divide,
    }));
  }

  dotClicker() {
    if (!this.state.curNum.includes(".")) {
      if (this.state.curNum.length === 0) {
        this.setState((prev) => ({
          ...prev,
          curNum: ["0", ".", ...prev.curNum],
        }));
      } else {
        this.setState((prev) => ({
          ...prev,
          curNum: [...prev.curNum, "."],
        }));
      }
    }
  }

  equalClicker() {
    if (this.state.calcu === "+") {
      const newAdd = (this.addCurNum() + this.addCalNum()).toString().split("");
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newAdd,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "-") {
      const newSub = (this.addCalNum() - this.addCurNum()).toString().split("");
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newSub,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "×") {
      const newMulti = (this.addCurNum() * this.addCalNum())
        .toString()
        .split("");
      this.setState(() => ({
        calcu: "",
        calNum: [],
        curNum: newMulti,
        clearNum: true,
      }));
    }
    if (this.state.calcu === "÷") {
      const newDiv = (this.addCalNum() / this.addCurNum()).toString().split("");
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
      const newAdd = (this.addCurNum() + this.addCalNum()).toString().split("");
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newAdd,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "-") {
      const newSub = (this.addCalNum() - this.addCurNum()).toString().split("");
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newSub,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "×") {
      const newMulti = (this.addCurNum() * this.addCalNum())
        .toString()
        .split("");
      this.setState(() => ({
        calcu: target.innerHTML,
        calNum: newMulti,
        curNum: [],
        clearNum: true,
      }));
    }
    if (this.state.calcu === "÷") {
      const newDiv = (this.addCalNum() / this.addCurNum()).toString().split("");
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
    return Number(newArr.join(""));
  }

  addCalNum() {
    const newArr = this.state.calNum;
    return Number(newArr.join(""));
  }

  render() {
    return (
      <div className="big">
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          testing
        </button>
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
    );
  }
}

export default App;