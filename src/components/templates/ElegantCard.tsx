import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

interface ElegantCardProps {
  data: BusinessCardData;
}

export const ElegantCard = ({ data }: ElegantCardProps) => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.title}
ORG:${data.company}
EMAIL:${data.email}
TEL:${data.phone}
URL:${data.website}
ADR:${data.address}
END:VCARD`;

  return (
    <div className="w-full aspect-[1.75/1] bg-gray-900 rounded-lg p-8 flex flex-col justify-between relative overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
      
      <div className="relative z-10 pl-6">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{data.name || "Your Name"}</h3>
        <div className="h-px w-16 bg-primary mb-2"></div>
        <p className="text-sm text-gray-300 mb-1">{data.title || "Job Title"}</p>
        <p className="text-xs text-gray-400">{data.company || "Company Name"}</p>
      </div>
      
      <div className="flex justify-between items-end relative z-10 pl-6">
        <div className="space-y-1 text-xs text-gray-300">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
        
        {data.name && data.email && (
          <div className="bg-white p-2 rounded">
            <QRCodeSVG value={vCardData} size={60} />
          </div>
        )}
      </div>
    </div>
  );
};
