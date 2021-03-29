import React from "react";

import ReactDOM from "react-dom";

console.log("react");
class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(<div>JSX</div>, document.getElementById("app"));
