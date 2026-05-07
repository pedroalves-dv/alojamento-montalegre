interface Props {
  name: string;
  description: string;
  inHouseLabel: string;
}

export default function RestaurantCallout({ name, description, inHouseLabel }: Props) {
  return (
    <div>
      <p className="font-stack font-medium text-[0.78rem] uppercase tracking-wider text-amber mb-2">
        {inHouseLabel}
      </p>
      <h2 className="font-serif text-4xl text-granite mb-6">{name}</h2>
      <p className="text-granite/70 leading-relaxed text-base">{description}</p>
    </div>
  );
}
