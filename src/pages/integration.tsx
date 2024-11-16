import { H1, P, Seo } from "@/components/global";
import React from "react";

const Integration: React.FC = () => {

    return (
        <>
            <Seo title="Integration" />
            <section className="w-full h-screen pt-[1rem] px-[2rem]">
                <div className="flex flex-col gap-[4px]">
                    <H1>Integrate apps</H1>
                    <P className="mt-1">
                        Get your store ready for success through these apps
                    </P>
                </div>

                <div className="w-[1192px] h-[511px] flex flex-col gap-[32px]">
                    
                </div>
            </section>

        </>
    )

}

export default Integration;