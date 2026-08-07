import { useNavigate } from "react-router-dom";
import ServicesPage from "../components/Services/Services";

export default function Services() {
  const navigate = useNavigate();
  return <ServicesPage navigate={navigate} />;
}