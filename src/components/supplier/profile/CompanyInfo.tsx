import { Building2, MapPin, Phone, Globe, FileText, CreditCard } from "lucide-react";

interface CompanyInfoProps {
  company: {
    company_name: string;
    npwp: string;
    address: string;
    province: string;
    country: string;
    phone: string;
    logo_url?: string;
  };
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  const infoItems = [
    { icon: Building2, label: "Company Name", value: company.company_name },
    { icon: CreditCard, label: "NPWP", value: company.npwp },
    { icon: MapPin, label: "Address", value: company.address },
    { icon: Globe, label: "Province", value: company.province },
    { icon: Globe, label: "Country", value: company.country },
    { icon: Phone, label: "Phone", value: company.phone },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Company Information
      </h2>
      
      {company.logo_url && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Company Logo</p>
          <img 
            src={company.logo_url} 
            alt={company.company_name}
            className="h-20 w-auto object-contain"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <item.icon className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-gray-900 font-medium mt-0.5 break-words">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}