import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-white animate-glow" />
          <span className="text-sm text-white font-medium">Professional Business Cards in Minutes</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
          Create Your Perfect
          <br />
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Business Card
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          Choose from 100+ AI-generated templates, customize with your details, and get a professional business card with QR code instantly.
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float [animation-delay:1s]"></div>
      </div>
    </section>
  );
};
