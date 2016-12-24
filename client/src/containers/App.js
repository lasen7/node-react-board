import React, { Component } from 'react';
import { BrowserRouter as Router, Match, Miss } from 'react-router';
import { Home, Auth, NotFound } from 'containers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>App</h2>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/auth" component={Auth} />
          <Miss component={NotFound} />
        </div>
      </Router>
    );
  }
}

export default App;

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/topics">Topics</Link></li>
//         </ul>
//         <hr />
//         <Match exactly pattern="/" component={Home} />
//         <Match pattern="/about" component={About} />
//         <Match pattern="/topics" component={Topics} />
//         <Miss component={NotFound} />
//       </div>
//     </Router>
//   );
// };

// export default App;