import { useState } from "react";
import { Hero } from "@/components/Hero";
import { BusinessCardForm, BusinessCardData } from "@/components/BusinessCardForm";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AITemplateGallery } from "@/components/AITemplateGallery";
import { DynamicCard } from "@/components/templates/DynamicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessCardData>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });

  const [selectedDesign, setSelectedDesign] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <BusinessCardForm data={businessData} onChange={setBusinessData} />
          </div>
          
          <div>
            {selectedDesign ? (
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border animate-scale-in">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Selected Design Preview</h2>
                <div className="bg-gradient-to-br from-muted to-background p-8 rounded-lg">
                  <div className="max-w-md mx-auto">
                    <DynamicCard data={businessData} designConfig={selectedDesign} />
                  </div>
                </div>
              </div>
            ) : (
              <TemplateSelector data={businessData} />
            )}
          </div>
        </div>

        <div className="animate-fade-in [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="ai" className="gap-2">
                AI Templates (100+)
              </TabsTrigger>
              <TabsTrigger value="classic">Classic Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="space-y-6">
              <AITemplateGallery 
                data={businessData} 
                onSelectTemplate={setSelectedDesign}
                selectedDesignId={selectedDesign?.id}
              />
            </TabsContent>
            
            <TabsContent value="classic" className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border">
                <TemplateSelector data={businessData} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Business Card Creator. Create professional cards with AI-powered designs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
