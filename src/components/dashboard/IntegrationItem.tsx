import React from 'react';
import paystackLogo from '@/assets/Paystack.png';
import facebookLogo from '@/assets/facebook.png';
import whatsappLogo from '@/assets/whatsapp.png';
import hubspotLogo from '@/assets/hubspot.png';

interface IntegrationApp {
    name: string;
    description: string;
    logo: string;
    buttonText: 'Connect' | 'Login';
}

const integrationData: IntegrationApp[] = [
    {
        name: 'Paystack',
        description: 'Make payments easier than ever by integrating Paystack',
        logo: paystackLogo,
        buttonText: 'Connect'
    },
    {
        name: 'Facebook',
        description: 'Expand your reach by connecting with millions of potential customers on Facebook.',
        logo: facebookLogo,
        buttonText: 'Login'
    },
    {
        name: 'WhatsApp Business',
        description: 'Receive order updates on WhatsApp, so you can respond faster',
        logo: whatsappLogo,
        buttonText: 'Connect'
    },
    {
        name: 'HubSpot',
        description: 'Keep all customer details in one place to personalize every interaction and boost sales',
        logo: hubspotLogo,
        buttonText: 'Connect'
    }
];

const IntegrationItem: React.FC<{ app: IntegrationApp }> = ({ app }) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 lg:h-[140px]">
            <div className="flex gap-4">
                <img src={app.logo} alt={app.name} className="w-12 h-12 object-cover" />
                <div className="flex flex-col w-[376px]">
                    <h3 className="text-sm lg:text-lg font-semibold">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.description}</p>
                </div>
            </div>
            <button 
                className={`lg:w-[350px] mt-5 lg:mt-0 border border-[#CDCED3] px-6 py-2 rounded hover:bg-action-default hover:text-white transition-colors duration-300 ${
                    app.buttonText === 'Connect' 
                        ? 'bg-[#FDFBFF] text-action-default text-sm font-medium' 
                        : 'bg-[#FDFBFF] text-action-default text-sm font-medium'
                }`}
            >
                {app.buttonText}
            </button>
        </div>
    );
};

export const IntegrationList: React.FC = () => {
    return (
        <div className=" rounded-[8px] border mt-8 px-3">
            {integrationData.map((app, index) => (
                <React.Fragment key={app.name}>
                    <IntegrationItem app={app} />
                    {index < integrationData.length - 1 && (
                        <hr className="border-[#CDCED3]" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default IntegrationItem;
