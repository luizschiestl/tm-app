import logoTopMed from "../../assets/topmed_logo.png";
import logoNextPlus from "../../assets/nextplus-logo.png";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-between mt-8">
      <img src={logoTopMed} alt="Logo TopMed" className="h-4" />
      <img src={logoNextPlus} alt="Logo NextPlus" className="h-6" />
    </footer>
  );
}
