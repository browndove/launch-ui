import {
  ActivityIcon,
  BellRingIcon,
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  PlugIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
  id?: string;
}

export default function Items({
  title = "Built for care teams. Designed for critical moments.",
  items = [
    {
      title: "Secure messaging",
      description:
        "Encrypted, traceable communication built for clinical workflows—not consumer chat.",
      icon: <LockKeyholeIcon className="size-5 stroke-1" />,
    },
    {
      title: "Real-time alerts",
      description:
        "Push critical updates to the right people the moment they matter.",
      icon: <BellRingIcon className="size-5 stroke-1" />,
    },
    {
      title: "Instant escalations",
      description:
        "Escalate with one tap when seconds count—no hunting through threads.",
      icon: <ZapIcon className="size-5 stroke-1" />,
    },
    {
      title: "Privacy by design",
      description:
        "Architecture and practices aligned with how healthcare actually handles PHI.",
      icon: <ShieldCheckIcon className="size-5 stroke-1" />,
    },
    {
      title: "Works where you are",
      description:
        "Responsive on phones, tablets, and desktops—from rounds to the desk.",
      icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
    },
    {
      title: "Ops at a glance",
      description:
        "See patient-relevant signal without drowning in noise or clutter.",
      icon: <ActivityIcon className="size-5 stroke-1" />,
    },
    {
      title: "Team coordination",
      description:
        "Keep nurses, physicians, and support aligned on the same thread.",
      icon: <UsersIcon className="size-5 stroke-1" />,
    },
    {
      title: "Plugs into your stack",
      description:
        "Connect to EHRs, paging, and hospital systems instead of another silo.",
      icon: <PlugIcon className="size-5 stroke-1" />,
    },
  ],
  className,
  id = "capabilities",
}: ItemsProps) {
  return (
    <Section id={id} className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, index) => (
              <Item key={index}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
