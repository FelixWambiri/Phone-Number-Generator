import React from "react";

// Constants
import { PROMPTLABEL, WELCOME_MESSAGE } from "../constants";

// Third party libraries
import Terminal from "react-console-emulator";

// image
import terminalImage from "../images/space.jpg";

class AppTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.terminal = React.createRef();
  }
  globalProps = {
    background: `linear-gradient(rgba(102,153,102,0.2), rgba(255, 255, 255, 0.3)),url(${terminalImage})`,
    height: "100%",
    width: "100%",
    textAlign: "left"
  };

  render() {
    const { generatePhoneNumbers, deleteGeneratedNumbers } = this.props;
    // Terminal Commands
    const commands = {
      gen: {
        description: "Generate a list of phone numbers",
        usage: "gen number",
        fn: generatePhoneNumbers.bind({ terminal: this.terminal })
      },
      del: {
        description: "Delete a list of phone numbers",
        usage: "del",
        fn: deleteGeneratedNumbers.bind({ terminal: this.terminal })
      }
    };

    return (
      <Terminal
        ref={this.terminal}
        // autoFocus
        dangerMode
        disableOnProcess
        commands={commands}
        welcomeMessage={WELCOME_MESSAGE}
        promptLabel={PROMPTLABEL}
        style={{ ...this.globalProps }}
        className={"terminal"}
      />
    );
  }
}

export default AppTerminal;
