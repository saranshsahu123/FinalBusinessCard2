import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

interface BoldCardProps {
  data: BusinessCardData;
}

export const BoldCard = ({ data }: BoldCardProps) => {
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
    <div className="w-full aspect-[1.75/1] bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="h-1/3 bg-gradient-to-r from-primary to-accent p-6 flex items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{data.name || "Your Name"}</h3>
          <p className="text-sm text-white/90">{data.title || "Job Title"}</p>
        </div>
      </div>
      
      <div className="h-2/3 p-6 flex flex-col justify-between">
        <div>
          <p className="text-lg font-semibold text-primary mb-4">{data.company || "Company Name"}</p>
          <div className="space-y-1.5 text-sm text-gray-700">
            {data.email && <div className="font-medium">{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.website && <div className="text-primary">{data.website}</div>}
          </div>
        </div>
        
        {data.name && data.email && (
          <div className="flex justify-end">
            <div className="border-2 border-primary rounded p-1.5">
              <QRCodeSVG value={vCardData} size={50} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
