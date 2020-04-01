import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Validation from "./components/form/validation";

function App() {
  const onChange = (name, value) => {
    console.log(value, name);
  };
  const onValidationStatusChange = isValid => {
    console.log(isValid);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Validation
          rules={{
            maxLength: {
              parameter: 3,
              errorMessage: <p>max length error</p>
            }
          }}
          getValue={onChange}
          changeValidationStatus={onValidationStatusChange}
        >
          <input name="malek" />
        </Validation>
      </header>
    </div>
  );
}

export default App;
