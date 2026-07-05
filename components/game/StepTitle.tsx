type Props = {
  title: string;
};

export function StepTitle({ title }: Props) {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-white/10" />

      <h1 className="text-center text-3xl font-black uppercase tracking-[0.25em] text-white md:text-4xl">
        {title}
      </h1>

      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}