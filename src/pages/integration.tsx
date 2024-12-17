import { H1, P, Seo } from "@/components/global";
import React from "react";
import { IntegrationList } from '@/components/dashboard/IntegrationItem';

const Integration: React.FC = () => {
    return (
        <>
            <Seo title="Integration" />
            <section className="w-full h-screen pt-[1rem]">
                <div className="flex flex-col gap-[4px]">
                    <H1 className="hidden md:flex">Integrate apps</H1>
                    <P className="mt-1">    
                        Get your store ready for success through these apps
                    </P>
                </div>

                <div className="lg:w-full h-[511px] flex flex-col gap-[32px] mt-14">
                    <IntegrationList />
                </div>
            </section>
        </>
    )
}
export default Integration;