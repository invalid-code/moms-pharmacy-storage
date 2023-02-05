import Counter from "./components/Counter";
import Storage from "./components/Storage";
import { Router, Routes, Route, A } from "@solidjs/router";

function App() {
  return (
    <Router>
      <nav>
        <A href="/counter">Counter</A>
        <A href="/storage">Storage</A>
      </nav>
      <Routes>
        <Route path="/counter" component={Counter}></Route>
        <Route path="/storage" component={Storage}></Route>
      </Routes>
    </Router>
  );
}

export default App;
