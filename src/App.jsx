import { Route, Routes } from "react-router-dom"
import Mainlayout from "./layout/app"
import SignUp from "./components/signUp"
import SignIn from "./components/signIn"



const App = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route index path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App