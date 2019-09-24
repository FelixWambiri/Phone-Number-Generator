import React from "react";

// Third Party libraries
import { ic_file_download } from "react-icons-kit/md/ic_file_download";
import { ic_arrow_downward } from "react-icons-kit/md/ic_arrow_downward";
import { ic_arrow_upward } from "react-icons-kit/md/ic_arrow_upward";
import { ic_vertical_align_bottom } from "react-icons-kit/md/ic_vertical_align_bottom";
import { ic_vertical_align_top } from "react-icons-kit/md/ic_vertical_align_top";
import Workbook from "react-excel-workbook";

// Components
import AppTerminal from "./components/Terminal";
import Button from "./common/Button";
import NumberList from "./components/NumberList";

// Helper functions
import { generateRandom, sortArrays, findMax, findMin } from "./utils";

// Styling
import "./App.css";
class App extends React.Component {
  state = {
    phoneNumbers: [],
    maxNumber: "",
    minNumber: ""
  };

  getLocalStorageItem = name => localStorage.getItem(name);
  setLocalStorageItem = (key, value) =>
    localStorage.setItem(`${key}`, JSON.stringify(value));

  componentDidMount() {
    const phoneNumbers = this.getLocalStorageItem("phoneNumbers")
      ? JSON.parse(this.getLocalStorageItem("phoneNumbers"))
      : [];

    const keysToGet = ["maxNumber", "minNumber"];
    const localValues = keysToGet.map(key => {
      if (this.getLocalStorageItem(key)) {
        return JSON.parse(this.getLocalStorageItem(key));
      } else {
        return "";
      }
    });

    const [maxNumber, minNumber] = localValues;
    if (phoneNumbers || maxNumber || minNumber) {
      this.setState({
        phoneNumbers,
        maxNumber,
        minNumber
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { phoneNumbers, maxNumber, minNumber } = this.state;

    if (phoneNumbers !== prevState.phoneNumbers) {
      this.setLocalStorageItem("phoneNumbers", phoneNumbers);
    }
    if (maxNumber !== prevState.maxNumber) {
      this.setLocalStorageItem("maxNumber", maxNumber);
    }
    if (minNumber !== prevState.minNumber) {
      this.setLocalStorageItem("minNumber", minNumber);
    }
  }

  generateRandomPhoneNumbers = value => {
    try {
      const phoneNumbers = generateRandom(value);
      this.setState({
        phoneNumbers
      });
      return `Generating Phone Numbers...`;
    } catch (error) {
      console.log("The error is ", error);
    }
  };

  sortPhoneNumbers = (array, order) => {
    const phoneNumbers = sortArrays(array, order);
    this.setState({
      phoneNumbers
    });
  };

  getMaxNumber = arr => {
    const maxNumber = findMax(arr);
    this.setState({
      maxNumber
    });
  };

  getMinNumber = arr => {
    const minNumber = findMin(arr);
    this.setState({
      minNumber
    });
  };

  deleteGeneratedNumbers = () => {
    let keysToRemove = ["phoneNumbers", "maxNumber", "minNumber"];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    this.setState({
      phoneNumbers: [],
      maxNumber: "",
      minNumber: ""
    });
  };

  render() {
    const { phoneNumbers, maxNumber, minNumber } = this.state;
    const data = phoneNumbers.map(num => ({ phone: num }));
    return (
      <div className="App">
        <header>
          <div className="right-header-content">
            <Workbook
              filename="phone-numbers.xlsx"
              element={
                <Button
                  title="Download Numbers Generated"
                  placement="top"
                  iconClassName="icon-btn-container"
                  size={"80%"}
                  icon={ic_file_download}
                />
              }
            >
              <Workbook.Sheet data={data} name="Phone Numbers">
                <Workbook.Column label="Phone Numbers" value="phone" />
              </Workbook.Sheet>
            </Workbook>

            <Button
              title="Ascending Order"
              placement="top"
              iconClassName="icon-btn-container"
              size={"80%"}
              icon={ic_arrow_upward}
              onClick={() => this.sortPhoneNumbers(phoneNumbers, "ascending")}
            />

            <Button
              title="Descending Order"
              placement="top"
              iconClassName="icon-btn-container"
              size={"80%"}
              icon={ic_arrow_downward}
              onClick={() => this.sortPhoneNumbers(phoneNumbers, "descending")}
            />
          </div>

          <div className="center-header-content">
            <Button
              title="Maximum Number"
              placement="top"
              iconClassName="icon-btn-container"
              size={"80%"}
              icon={ic_vertical_align_top}
              onClick={() => this.getMaxNumber(phoneNumbers)}
            />
            <Button
              title="Minimum Number"
              placement="top"
              iconClassName="icon-btn-container"
              size={"80%"}
              icon={ic_vertical_align_bottom}
              onClick={() => this.getMinNumber(phoneNumbers)}
            />
          </div>
        </header>
        <section className="left-section">
          <AppTerminal
            generatePhoneNumbers={this.generateRandomPhoneNumbers}
            deleteGeneratedNumbers={this.deleteGeneratedNumbers}
          />
        </section>
        <section className="middle-section">
          {maxNumber && (
            <div className="card-container">
              <p>Biggest Number</p>
              <br />
              <p>0{maxNumber}</p>
            </div>
          )}
          {minNumber && (
            <div className="card-container">
              <p>Smallest Number</p>
              <br />
              <p>0{minNumber}</p>
            </div>
          )}
        </section>
        <section className="right-section">
          <ul>
            {phoneNumbers.length > 0 &&
              phoneNumbers.map((num, index) => {
                return <NumberList phoneNumber={num} key={index} />;
              })}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
