import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { Footer } from "./components/footer/footer";
import "./index.css";
import { Landing } from "./components/landing/landingLayout";
import { Transaction } from "./components/transaction/transactionLayout";
import { Header } from "./components/header/header";
import { Block } from "./components/block/blockLayout";
import { Address } from "./components/address/addressLayout";
import { BlockList } from "./components/block/blockList";
import { TransactionList } from "./components/transaction/transactionList";
function App() {
  return (
    <div className="bg-bgDark1 w-screen relative overflow-x-hidden ">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tx/:hash" element={<Transaction />} />
        <Route path="/block/:hash" element={<Block />} />
        <Route path="/address/:hash" element={<Address />} />
        <Route path="/blocks" element={<BlockList />} />
        <Route path="/transactions" element={<TransactionList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
