import { useNavigate } from "react-router-dom";
import PortfolioPage from "../components/Portfolio/Portfolio";

export default function Portfolio() {
  const navigate = useNavigate();
  return <PortfolioPage navigate={navigate} />;
}