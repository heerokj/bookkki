import React from "react";

type SectionBlockProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SectionBlock({
  title,
  description,
  children,
}: SectionBlockProps) {
  return (
    <section className="my-9">
      <div className="home-inner">
        <h3 className="section-title text-2xl font-bold">{title}</h3>
        <p className="section-description text-gray-400">{description}</p>
        <div className="content-shelf mt-4">{children}</div>
      </div>
    </section>
  );
}
