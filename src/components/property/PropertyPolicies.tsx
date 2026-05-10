import { Fragment } from "react";

type Row = { label: string; value: string };

type Props = {
  checkinTime: string;
  checkoutTime: string;
  minStay: number;
  minStayPeakSeason: number | null;
  noPartiesNote: string | null;
  licenseNumber: string | null;
  languagesSpoken: string[] | null;
  heading: string;
  checkinLabel: string;
  checkoutLabel: string;
  minStayLabel: string;
  minStayPeakLabel: string | null;
  noPartiesLabel: string;
  notPermitted: string;
  licenseLabel: string;
  languagesLabel: string;
};

export default function PropertyPolicies({
  checkinTime,
  checkoutTime,
  minStay,
  minStayPeakSeason,
  noPartiesNote,
  licenseNumber,
  languagesSpoken,
  heading,
  checkinLabel,
  checkoutLabel,
  minStayLabel,
  minStayPeakLabel,
  noPartiesLabel,
  notPermitted,
  licenseLabel,
  languagesLabel,
}: Props) {
  const rows: Row[] = [
    { label: checkinLabel, value: checkinTime },
    { label: checkoutLabel, value: checkoutTime },
    {
      label: minStayLabel,
      value:
        minStayPeakSeason && minStayPeakLabel
          ? `${minStay}  ·  ${minStayPeakLabel}`
          : String(minStay),
    },
  ];

  if (noPartiesNote) rows.push({ label: noPartiesLabel, value: notPermitted });
  if (languagesSpoken) rows.push({ label: languagesLabel, value: languagesSpoken.join(", ") });
  if (licenseNumber) rows.push({ label: licenseLabel, value: licenseNumber });

  return (
    <section className="py-14 border-t border-gray-100">
      <h2 className="font-serif text-4xl text-granite mb-8">{heading}</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 max-w-lg">
        {rows.map(({ label, value }) => (
          <Fragment key={label}>
            <dt className="text-sm text-granite/50 whitespace-nowrap">{label}</dt>
            <dd className="text-sm text-granite/80">{value}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
