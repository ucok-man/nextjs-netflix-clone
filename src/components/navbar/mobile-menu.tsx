type Props = {
  visible: boolean;
};

export default function MobileMenu({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 -left-4 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          Home
        </div>
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          Series
        </div>
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          Films
        </div>
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          New & Popular
        </div>
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          My List
        </div>
        <div className="px-3 text-sm text-center text-white hover:underline underline-offset-4">
          Browse by Languages
        </div>
      </div>
    </div>
  );
}
