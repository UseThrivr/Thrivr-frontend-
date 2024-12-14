import { LucideProps, Plus } from "lucide-react";

const WalletCard = (props: {
  image?: string;
  chevron?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col items-start p-4 rounded-lg border border-neutral-border bg-neutral-alt gap-8 min-w-[190px]">
      {props.image ? (
        <div className="flex gap-2 items-center cursor-pointer">
          <img
            src={props.image}
            alt="currency"
            className="size-8 rounded-full"
          />
          {props.chevron && <props.chevron />}
        </div>
      ) : (
        <div className="text-white bg-action-default size-8 rounded-full items-center justify-center flex cursor-pointer">
          <Plus />
        </div>
      )}
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-semibold text-2xl text-text-primary">{props.title}</h2>
        <p className="font-normal text-base text-text-secondary">{props.content}</p>
      </div>
    </div>
  );
};

export default WalletCard;
