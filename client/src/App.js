import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { useEffect } from "react";
import { loadcredentials, clearerr } from "./Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import ProtectedRoute from "../src/Route/ProtectedRoute";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const toast = useToast();
  useEffect(() => {
    dispatch(loadcredentials());
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
  }, [dispatch, error]);
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <ProtectedRoute exact path="/chat" component={Chatpage} />
    </div>
  );
}

export default App;
