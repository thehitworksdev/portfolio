import { useNavigate } from "react-router-dom";
import AboutPage from "../components/WhyChooseUs/WhyChooseUs";

export default function About() {
  const navigate = useNavigate();

  return <AboutPage navigate={navigate} />;
}