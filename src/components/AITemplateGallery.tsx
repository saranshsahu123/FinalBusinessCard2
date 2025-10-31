import { useState, useEffect } from "react";
import { BusinessCardData } from "./BusinessCardForm";
import { DynamicCard } from "./templates/DynamicCard";
import { Button } from "./ui/button";
import { Loader2, Sparkles, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AITemplateGalleryProps {
  data: BusinessCardData;
  onSelectTemplate: (designConfig: any) => void;
  selectedDesignId?: string;
}

export const AITemplateGallery = ({ data, onSelectTemplate, selectedDesignId }: AITemplateGalleryProps) => {
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateDesigns = async (count: number = 100) => {
    setIsLoading(true);
    try {
      // Temporary mock data with diverse designs
      const styleOptions = {
        bgStyles: ["gradient", "solid", "pattern", "image"],
        colorSchemes: [
          { bg: ["#f0f9ff", "#e0f2fe"], text: "#0f172a", accent: "#0ea5e9" },  // Blue
          { bg: ["#fdf4ff", "#fae8ff"], text: "#701a75", accent: "#c026d3" },  // Purple
          { bg: ["#f7fee7", "#ecfccb"], text: "#365314", accent: "#84cc16" },  // Green
          { bg: ["#fff7ed", "#ffedd5"], text: "#7c2d12", accent: "#f97316" },  // Orange
          { bg: ["#fef2f2", "#fee2e2"], text: "#7f1d1d", accent: "#ef4444" },  // Red
          { bg: ["#1e1b4b", "#312e81"], text: "#e0e7ff", accent: "#818cf8" },  // Dark Blue
        ],
        layouts: ["centered", "left-aligned", "split", "minimal", "bold", "modern"],
        decorations: ["circles", "lines", "dots", "waves", "geometric", "none"],
        fontWeights: ["light", "normal", "bold", "black"],
        borderStyles: ["none", "rounded", "sharp", "fancy", "shadow"]
      };

      const mockDesigns = Array(count).fill(null).map((_, index) => {
        const colorScheme = styleOptions.colorSchemes[index % styleOptions.colorSchemes.length];
        return {
          id: `design-${index}`,
          name: `Design ${index + 1}`,
          bgStyle: styleOptions.bgStyles[index % styleOptions.bgStyles.length],
          bgColors: colorScheme.bg,
          textColor: colorScheme.text,
          accentColor: colorScheme.accent,
          layout: styleOptions.layouts[index % styleOptions.layouts.length],
          decoration: styleOptions.decorations[index % styleOptions.decorations.length],
          fontWeight: styleOptions.fontWeights[index % styleOptions.fontWeights.length],
          borderStyle: styleOptions.borderStyles[index % styleOptions.borderStyles.length]
        };
      });
      
      setDesigns(mockDesigns);
      toast({
        title: "Success!",
        description: `Generated ${mockDesigns.length} sample designs`,
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate designs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateDesigns(100);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI-Generated Templates
        </h2>
        <Button
          onClick={() => generateDesigns(100)}
          disabled={isLoading}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Regenerate
            </>
          )}
        </Button>
      </div>

      {isLoading && designs.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-[1.75/1] bg-muted rounded-lg animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, index) => (
            <button
              key={design.id}
              onClick={() => onSelectTemplate(design)}
              className={`relative rounded-lg overflow-hidden transition-all border-2 group hover:scale-105 animate-fade-in ${
                selectedDesignId === design.id
                  ? "border-primary shadow-[var(--shadow-hover)] scale-105"
                  : "border-border hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "backwards",
              }}
            >
              {selectedDesignId === design.id && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 animate-scale-in">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="transform scale-[0.45] origin-top-left pointer-events-none">
                <DynamicCard data={data} designConfig={design} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-medium text-xs truncate">{design.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
