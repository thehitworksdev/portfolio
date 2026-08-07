
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";

export default function Home() {
  const navigate = useNavigate();
  return <Hero navigate={navigate} />;
}